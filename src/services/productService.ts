import { Product } from '../types/product';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated products storage
let products: Product[] = [];

export const productService = {
  async getProducts(): Promise<Product[]> {
    await delay(800);
    return [...products];
  },

  async addProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    await delay(1000);
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.push(newProduct);
    return newProduct;
  },
};