import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    return savedAuth === 'true';
  });

  const [categories, setCategories] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('adminAuth', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCategories();
    fetchPaintings();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedCategories = data.map(cat => ({
        id: cat.id,
        name: {
          fr: cat.name_fr,
          en: cat.name_en,
          hu: cat.name_hu
        },
        description: {
          fr: cat.description_fr,
          en: cat.description_en,
          hu: cat.description_hu
        },
        created_at: cat.created_at
      }));

      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaintings = async () => {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedPaintings = data.map(painting => ({
        id: painting.id,
        title: {
          fr: painting.title_fr,
          en: painting.title_en,
          hu: painting.title_hu
        },
        description: {
          fr: painting.description_fr,
          en: painting.description_en,
          hu: painting.description_hu
        },
        poem: {
          fr: painting.poem_fr,
          en: painting.poem_en,
          hu: painting.poem_hu
        },
        dimensions: painting.dimensions,
        price: painting.price,
        categoryId: painting.category_id,
        image: painting.image_url,
        created_at: painting.created_at,
        updated_at: painting.updated_at
      }));

      setPaintings(formattedPaintings);
    } catch (error) {
      console.error('Error fetching paintings:', error);
    }
  };

  const login = (username, password) => {
    if (username === 'pamelagerard06' && password === 'grrdpmla06000') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addCategory = async (category) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{
          name_fr: category.name.fr,
          name_en: category.name.en,
          name_hu: category.name.hu,
          description_fr: category.description.fr,
          description_en: category.description.en,
          description_hu: category.description.hu
        }])
        .select()
        .single();

      if (error) throw error;

      const newCategory = {
        id: data.id,
        name: {
          fr: data.name_fr,
          en: data.name_en,
          hu: data.name_hu
        },
        description: {
          fr: data.description_fr,
          en: data.description_en,
          hu: data.description_hu
        },
        created_at: data.created_at
      };

      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({
          name_fr: updatedCategory.name.fr,
          name_en: updatedCategory.name.en,
          name_hu: updatedCategory.name.hu,
          description_fr: updatedCategory.description.fr,
          description_en: updatedCategory.description.en,
          description_hu: updatedCategory.description.hu
        })
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.map(cat =>
        cat.id === id ? { ...cat, ...updatedCategory } : cat
      ));
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.filter(cat => cat.id !== id));
      setPaintings(prev => prev.filter(painting => painting.categoryId !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('paintings')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('paintings')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const addPainting = async (painting) => {
    try {
      let imageUrl = painting.image;

      if (painting.imageFile) {
        imageUrl = await uploadImage(painting.imageFile);
      }

      const { data, error } = await supabase
        .from('paintings')
        .insert([{
          category_id: painting.categoryId,
          image_url: imageUrl,
          title_fr: painting.title.fr,
          title_en: painting.title.en,
          title_hu: painting.title.hu,
          description_fr: painting.description.fr,
          description_en: painting.description.en,
          description_hu: painting.description.hu,
          poem_fr: painting.poem?.fr || '',
          poem_en: painting.poem?.en || '',
          poem_hu: painting.poem?.hu || '',
          dimensions: painting.dimensions,
          price: painting.price
        }])
        .select()
        .single();

      if (error) throw error;

      const newPainting = {
        id: data.id,
        title: {
          fr: data.title_fr,
          en: data.title_en,
          hu: data.title_hu
        },
        description: {
          fr: data.description_fr,
          en: data.description_en,
          hu: data.description_hu
        },
        poem: {
          fr: data.poem_fr,
          en: data.poem_en,
          hu: data.poem_hu
        },
        dimensions: data.dimensions,
        price: data.price,
        categoryId: data.category_id,
        image: data.image_url,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      setPaintings(prev => [...prev, newPainting]);
      return newPainting;
    } catch (error) {
      console.error('Error adding painting:', error);
      throw error;
    }
  };

  const updatePainting = async (id, updatedPainting) => {
    try {
      let imageUrl = updatedPainting.image;

      if (updatedPainting.imageFile) {
        imageUrl = await uploadImage(updatedPainting.imageFile);
      }

      const { error } = await supabase
        .from('paintings')
        .update({
          category_id: updatedPainting.categoryId,
          image_url: imageUrl,
          title_fr: updatedPainting.title.fr,
          title_en: updatedPainting.title.en,
          title_hu: updatedPainting.title.hu,
          description_fr: updatedPainting.description.fr,
          description_en: updatedPainting.description.en,
          description_hu: updatedPainting.description.hu,
          poem_fr: updatedPainting.poem?.fr || '',
          poem_en: updatedPainting.poem?.en || '',
          poem_hu: updatedPainting.poem?.hu || '',
          dimensions: updatedPainting.dimensions,
          price: updatedPainting.price,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setPaintings(prev => prev.map(painting =>
        painting.id === id ? { ...painting, ...updatedPainting, image: imageUrl } : painting
      ));
    } catch (error) {
      console.error('Error updating painting:', error);
      throw error;
    }
  };

  const deletePainting = async (id) => {
    try {
      const { error } = await supabase
        .from('paintings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPaintings(prev => prev.filter(painting => painting.id !== id));
    } catch (error) {
      console.error('Error deleting painting:', error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      categories,
      paintings,
      loading,
      login,
      logout,
      addCategory,
      updateCategory,
      deleteCategory,
      addPainting,
      updatePainting,
      deletePainting
    }}>
      {children}
    </AdminContext.Provider>
  );
};
