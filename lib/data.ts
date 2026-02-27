import productsData from '../data/products.json';
import { Product, ProductData } from './types';

export const data: ProductData = productsData as ProductData;

export const products: Product[] = data.products;

export const priceSamples = data.price_samples;

// Extract category from product name
export function getCategory(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('reach in')) return 'Reach-In';
  if (lower.includes('merchandiser') || lower.includes('merchandising')) return 'Merchandiser';
  if (lower.includes('prep table') || lower.includes('sandwich')) return 'Prep Table';
  if (lower.includes('bakery case')) return 'Bakery Case';
  if (lower.includes('bar cooler') || lower.includes('back bar')) return 'Bar Cooler';
  if (lower.includes('undercounter')) return 'Undercounter';
  if (lower.includes('chef base')) return 'Chef Base';
  if (lower.includes('glass door')) return 'Glass Door';
  if (lower.includes('display')) return 'Display Case';
  if (lower.includes('upright')) return 'Upright';
  if (lower.includes('worktop')) return 'Worktop';
  if (lower.includes('buffet') || lower.includes('salad bar')) return 'Buffet/Salad Bar';
  return 'Other';
}

// Get all unique categories
export function getCategories(): string[] {
  const categories = new Set<string>();
  products.forEach(p => categories.add(getCategory(p.name)));
  return Array.from(categories).sort();
}

// Parse price string to number
export function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[$,]/g, ''));
}

// Get price statistics
export function getPriceStats() {
  const prices = priceSamples.map(parsePrice).filter(p => !isNaN(p));
  if (prices.length === 0) return null;
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    avg: prices.reduce((a, b) => a + b, 0) / prices.length,
    count: prices.length,
    median: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)]
  };
}

// Get category distribution for charts
export function getCategoryDistribution(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  products.forEach(p => {
    const cat = getCategory(p.name);
    counts.set(cat, (counts.get(cat) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// Search products
export function searchProducts(query: string, category?: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(lowerQuery);
    const matchesCategory = !category || category === 'All' || getCategory(p.name) === category;
    return matchesQuery && matchesCategory;
  });
}
