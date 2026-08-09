// Dummy product data, shaped exactly as the future backend response will be.
// productService.js is the only file that should need to change when the
// real API is connected — components consume this shape either way.

const raw = [
  { name: 'Green Apple', category: 'Fresh Fruit', price: 14.99, oldPrice: 20.99, stock: 45, featured: true, rating: 4.6, reviewCount: 89 },
  { name: 'Fresh Indian Orange', category: 'Fresh Fruit', price: 12.0, oldPrice: null, stock: 60, featured: true, rating: 4.8, reviewCount: 120 },
  { name: 'Chinese Cabbage', category: 'Vegetables', price: 48.0, oldPrice: 133.0, stock: 5413, featured: true, rating: 4.0, reviewCount: 4 },
  { name: 'Green Capsicum', category: 'Vegetables', price: 14.0, oldPrice: null, stock: 32, featured: false, rating: 4.2, reviewCount: 17 },
  { name: 'Red Capsicum', category: 'Vegetables', price: 14.0, oldPrice: null, stock: 28, featured: false, rating: 4.3, reviewCount: 22 },
  { name: 'Organic Banana', category: 'Fresh Fruit', price: 9.5, oldPrice: 12.0, stock: 80, featured: false, rating: 4.5, reviewCount: 61 },
  { name: 'Sweet Potato', category: 'Vegetables', price: 6.25, oldPrice: null, stock: 54, featured: false, rating: 4.1, reviewCount: 8 },
  { name: 'Organic Broccoli', category: 'Vegetables', price: 11.4, oldPrice: 15.0, stock: 40, featured: true, rating: 4.7, reviewCount: 33 },
  { name: 'Whole Wheat Bread', category: 'Bread & Bakery', price: 5.99, oldPrice: null, stock: 22, featured: false, rating: 4.4, reviewCount: 15 },
  { name: 'Cold Pressed Olive Oil', category: 'Cooking', price: 24.99, oldPrice: 29.99, stock: 18, featured: true, rating: 4.9, reviewCount: 210 },
  { name: 'Organic Honey', category: 'Cooking', price: 16.5, oldPrice: null, stock: 26, featured: false, rating: 4.8, reviewCount: 98 },
  { name: 'Roasted Almonds', category: 'Snacks', price: 13.25, oldPrice: 16.0, stock: 37, featured: false, rating: 4.3, reviewCount: 27 },
  { name: 'Kale Chips', category: 'Snacks', price: 7.75, oldPrice: null, stock: 19, featured: false, rating: 4.0, reviewCount: 6 },
  { name: 'Cold Brew Coffee', category: 'Beverages', price: 8.99, oldPrice: null, stock: 44, featured: true, rating: 4.6, reviewCount: 71 },
  { name: 'Organic Green Tea', category: 'Beverages', price: 6.5, oldPrice: 9.0, stock: 65, featured: false, rating: 4.5, reviewCount: 40 },
  { name: 'Aloe Vera Gel', category: 'Beauty & Health', price: 11.0, oldPrice: null, stock: 30, featured: false, rating: 4.2, reviewCount: 12 },
  { name: 'Organic Coconut Oil', category: 'Beauty & Health', price: 15.75, oldPrice: 18.5, stock: 21, featured: false, rating: 4.7, reviewCount: 55 },
  { name: 'Free-Range Eggs', category: 'Dairy & Eggs', price: 6.0, oldPrice: null, stock: 50, featured: true, rating: 4.6, reviewCount: 88 },
  { name: 'Organic Whole Milk', category: 'Dairy & Eggs', price: 4.25, oldPrice: null, stock: 42, featured: false, rating: 4.3, reviewCount: 34 },
  { name: 'Basmati Rice 5kg', category: 'Grains & Rice', price: 19.99, oldPrice: 24.99, stock: 33, featured: true, rating: 4.8, reviewCount: 143 },
  { name: 'Rolled Oats', category: 'Grains & Rice', price: 5.5, oldPrice: null, stock: 58, featured: false, rating: 4.4, reviewCount: 29 },
  { name: 'Frozen Mixed Berries', category: 'Frozen Foods', price: 9.25, oldPrice: 11.0, stock: 27, featured: false, rating: 4.5, reviewCount: 19 },
  { name: 'Bamboo Toothbrush Set', category: 'Household', price: 8.0, oldPrice: null, stock: 36, featured: false, rating: 4.6, reviewCount: 24 },
  { name: 'Reusable Produce Bags', category: 'Household', price: 12.99, oldPrice: null, stock: 20, featured: false, rating: 4.7, reviewCount: 16 },
];

const categoryIdMap = {
  'Fresh Fruit': 'cat-001',
  Vegetables: 'cat-002',
  Cooking: 'cat-003',
  Snacks: 'cat-004',
  Beverages: 'cat-005',
  'Beauty & Health': 'cat-006',
  'Bread & Bakery': 'cat-007',
  'Meat & Fish': 'cat-008',
  'Dairy & Eggs': 'cat-009',
  'Frozen Foods': 'cat-010',
  'Grains & Rice': 'cat-011',
  Household: 'cat-012',
};

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const products = raw.map((p, i) => {
  const id = `product-${String(i + 1).padStart(3, '0')}`;
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  return {
    id,
    name: p.name,
    slug: slugify(p.name),
    description: `Fresh, high-quality ${p.name.toLowerCase()} sourced from trusted organic farms. Sold by weight, delivered fast.`,
    images: [
      `/images/products/${slugify(p.name)}-1.jpg`,
      `/images/products/${slugify(p.name)}-2.jpg`,
    ],
    price: p.price,
    oldPrice: p.oldPrice,
    discount,
    category: p.category,
    categoryId: categoryIdMap[p.category] ?? 'cat-002',
    brand: 'EcoBazar',
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
    sku: `ECO-${slugify(p.name).slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
    status: 'active',
    featured: p.featured,
    createdAt: new Date(2026, 0, (i % 28) + 1).toISOString(),
  };
});
