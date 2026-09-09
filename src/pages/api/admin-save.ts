import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ status: 'admin-save-ready' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { action, data } = body;
    const projectRoot = process.cwd();

    if (action === 'save_products') {
      const filePath = path.join(projectRoot, 'src', 'lib', 'mock-products.ts');
      const content = `export interface MockProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  salePrice?: number;
  image: string;
  specs: string[];
  warrantyMonths: number;
  isUniversal: boolean;
  isFeatured: boolean;
  compatibleBrands: string[];
  compatibleModels: string[];
  description: string;
}

export const MOCK_PRODUCTS: MockProduct[] = ${JSON.stringify(data, null, 2)};
`;
      fs.writeFileSync(filePath, content, 'utf8');
      return new Response(JSON.stringify({ success: true, count: data.length }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'save_posts') {
      const filePath = path.join(projectRoot, 'src', 'lib', 'mock-posts.ts');
      const content = `export interface MockPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  image: string;
  videoUrl?: string;
  relatedProductIds?: string[];
  relatedCar?: string;
  relatedProductSlug?: string;
}

export const MOCK_POSTS: MockPost[] = ${JSON.stringify(data, null, 2)};
`;
      fs.writeFileSync(filePath, content, 'utf8');
      return new Response(JSON.stringify({ success: true, count: data.length }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'save_categories') {
      const filePath = path.join(projectRoot, 'src', 'lib', 'constants.ts');
      let currentContent = fs.readFileSync(filePath, 'utf8');
      const newCatStr = `export const CATEGORIES_LIST = ${JSON.stringify(data, null, 2)};`;
      currentContent = currentContent.replace(/export const CATEGORIES_LIST = \[[\s\S]*?\];/, newCatStr);
      fs.writeFileSync(filePath, currentContent, 'utf8');
      return new Response(JSON.stringify({ success: true, count: data.length }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'save_settings') {
      const filePath = path.join(projectRoot, 'src', 'lib', 'constants.ts');
      let currentContent = fs.readFileSync(filePath, 'utf8');
      const newSettingsStr = `export const DEFAULT_SHOP_SETTINGS = ${JSON.stringify(data, null, 2)};`;
      currentContent = currentContent.replace(/export const DEFAULT_SHOP_SETTINGS = \{[\s\S]*?\};/, newSettingsStr);
      fs.writeFileSync(filePath, currentContent, 'utf8');
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
