import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('adminCategories');
    return savedCategories ? JSON.parse(savedCategories) : [
      { 
        id: 1, 
        name: {
          fr: 'Art abstrait',
          en: 'Abstract Art',
          hu: 'Absztrakt művészet'
        },
        description: {
          fr: 'Œuvres abstraites explorant les formes et couleurs',
          en: 'Abstract works exploring shapes and colors',
          hu: 'Absztrakt művek, amelyek formákat és színeket fedeznek fel'
        }
      },
      { 
        id: 2, 
        name: {
          fr: 'Paysages',
          en: 'Landscapes',
          hu: 'Tájképek'
        },
        description: {
          fr: 'Paysages naturels et urbains',
          en: 'Natural and urban landscapes',
          hu: 'Természeti és városi tájképek'
        }
      },
      { 
        id: 3, 
        name: {
          fr: 'Portraits',
          en: 'Portraits',
          hu: 'Portrék'
        },
        description: {
          fr: 'Portraits expressifs et réalistes',
          en: 'Expressive and realistic portraits',
          hu: 'Kifejező és realisztikus portrék'
        }
      }
    ];
  });

  const [paintings, setPaintings] = useState(() => {
    const savedPaintings = localStorage.getItem('adminPaintings');
    return savedPaintings ? JSON.parse(savedPaintings) : [
      {
        id: 1,
        title: {
          fr: 'J\'adore les fraises',
          en: 'I love strawberries',
          hu: 'Imádom az epret'
        },
        description: {
          fr: 'Une œuvre délicate célébrant la beauté simple des fraises rouges.',
          en: 'A delicate work celebrating the simple beauty of red strawberries.',
          hu: 'Finom mű, amely a vörös eper egyszerű szépségét ünnepli.'
        },
        dimensions: '50x70 cm',
        price: '350€',
        poem: {
          fr: 'Douces fraises rouges, délices de l\'été.',
          en: 'Sweet red strawberries, summer delights.',
          hu: 'Édes vörös eper, nyári gyönyörűség.'
        },
        categoryId: 1,
        image: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&w=500'
      },
      {
        id: 2,
        title: {
          fr: 'Sérénité marine',
          en: 'Marine Serenity',
          hu: 'Tengeri nyugalom'
        },
        description: {
          fr: 'Un paysage marin apaisant aux tons bleus profonds.',
          en: 'A soothing seascape in deep blue tones.',
          hu: 'Egy megnyugtató tengeri táj mély kék tónusokban.'
        },
        dimensions: '40x60 cm',
        price: '280€',
        poem: {
          fr: 'L\'océan murmure ses secrets éternels.',
          en: 'The ocean whispers its eternal secrets.',
          hu: 'Az óceán suttogja örök titkait.'
        },
        categoryId: 2,
        image: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=500'
      },
      {
        id: 3,
        title: {
          fr: 'Regard profond',
          en: 'Deep Gaze',
          hu: 'Mély tekintet'
        },
        description: {
          fr: 'Portrait expressif capturant l\'âme du modèle.',
          en: 'Expressive portrait capturing the soul of the model.',
          hu: 'Kifejező portré, amely megragadja a modell lelkét.'
        },
        dimensions: '30x40 cm',
        price: '220€',
        poem: {
          fr: 'Dans les yeux se cache l\'histoire d\'une vie.',
          en: 'In the eyes hides the story of a life.',
          hu: 'A szemekben egy élet története rejtőzik.'
        },
        categoryId: 3,
        image: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=500'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('adminAuth', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('adminCategories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('adminPaintings', JSON.stringify(paintings));
  }, [paintings]);

  const login = (username, password) => {
    // Simple authentication - in production, use proper authentication
    if (username === 'pamelagerard06' && password === 'grrdpmla06000') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Category CRUD operations
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now()
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...updatedCategory } : cat));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    // Also remove paintings from this category
    setPaintings(prev => prev.filter(painting => painting.categoryId !== id));
  };

  // Painting CRUD operations
  const addPainting = (painting) => {
    const newPainting = {
      ...painting,
      id: Date.now()
    };
    setPaintings(prev => [...prev, newPainting]);
    return newPainting;
  };

  const updatePainting = (id, updatedPainting) => {
    setPaintings(prev => prev.map(painting => painting.id === id ? { ...painting, ...updatedPainting } : painting));
  };

  const deletePainting = (id) => {
    setPaintings(prev => prev.filter(painting => painting.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      categories,
      paintings,
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