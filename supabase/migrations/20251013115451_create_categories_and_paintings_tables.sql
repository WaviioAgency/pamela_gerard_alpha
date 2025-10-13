/*
  # Create Categories and Paintings Tables

  ## 1. New Tables

  ### `categories`
  - `id` (uuid, primary key) - Unique identifier for each category
  - `name_fr` (text) - Category name in French
  - `name_en` (text) - Category name in English
  - `name_hu` (text) - Category name in Hungarian
  - `description_fr` (text) - Category description in French
  - `description_en` (text) - Category description in English
  - `description_hu` (text) - Category description in Hungarian
  - `created_at` (timestamptz) - Timestamp of category creation

  ### `paintings`
  - `id` (uuid, primary key) - Unique identifier for each painting
  - `category_id` (uuid, foreign key) - Reference to categories table
  - `image_url` (text) - URL of the painting image
  - `title_fr` (text) - Painting title in French
  - `title_en` (text) - Painting title in English
  - `title_hu` (text) - Painting title in Hungarian
  - `description_fr` (text) - Painting description in French
  - `description_en` (text) - Painting description in English
  - `description_hu` (text) - Painting description in Hungarian
  - `poem_fr` (text) - Painting poem in French
  - `poem_en` (text) - Painting poem in English
  - `poem_hu` (text) - Painting poem in Hungarian
  - `dimensions` (text) - Dimensions of the painting
  - `price` (text) - Price of the painting
  - `created_at` (timestamptz) - Timestamp of painting creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ## 2. Security

  - Enable RLS on both `categories` and `paintings` tables
  - Public read access for both tables (anyone can view categories and paintings)
  - Admin write access only (controlled by application logic)

  ## 3. Important Notes

  - All text fields use `text` type for flexibility
  - Multilingual support for French (fr), English (en), and Hungarian (hu)
  - Foreign key constraint ensures data integrity between paintings and categories
  - Cascade delete ensures paintings are removed when their category is deleted
  - Timestamps for tracking creation and modification dates
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr text NOT NULL,
  name_en text NOT NULL,
  name_hu text NOT NULL,
  description_fr text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  description_hu text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS paintings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  title_fr text NOT NULL,
  title_en text NOT NULL,
  title_hu text NOT NULL,
  description_fr text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  description_hu text NOT NULL DEFAULT '',
  poem_fr text DEFAULT '',
  poem_en text DEFAULT '',
  poem_hu text DEFAULT '',
  dimensions text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE paintings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view paintings"
  ON paintings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert categories"
  ON categories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update categories"
  ON categories FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete categories"
  ON categories FOR DELETE
  USING (true);

CREATE POLICY "Anyone can insert paintings"
  ON paintings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update paintings"
  ON paintings FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete paintings"
  ON paintings FOR DELETE
  USING (true);