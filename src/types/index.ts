// Common TypeScript Interfaces & Types for AutoTech Store

export type CarBrand = {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
};

export type CarModel = {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  year_from: number;
  year_to?: number | null;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  display_order: number;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  category_id: string;
  price: number;
  sale_price?: number | null;
  status: 'active' | 'draft' | 'archived';
  images: string[];
  video_url?: string | null;
  description?: string;
  specifications: Record<string, string>;
  warranty_months: number;
  is_universal: boolean;
  is_featured: boolean;
  visible: boolean;
  created_at: string;
};

export type ShopSettings = {
  shop_name: string;
  phone: string;
  zalo: string;
  messenger_url?: string;
  facebook_url?: string;
  address: string;
  google_maps_url?: string;
  logo_url?: string;
  banner_url?: string;
  seo_title?: string;
  seo_description?: string;
};
