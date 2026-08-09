const statuses = ['Order received', 'Processing', 'On the way', 'Delivered', 'Cancelled'];
const paymentStatuses = ['Paid', 'Pending', 'Failed'];

export const orders = Array.from({ length: 12 }).map((_, i) => ({
  id: `ORD-${4100 + i}`,
  customer: ['Dennis Nzioki', 'Annette Black', 'Jane Cooper', 'Devon Lane'][i % 4],
  date: new Date(2026, 6, (i % 28) + 1).toISOString(),
  total: Math.round((40 + i * 17.35) * 100) / 100,
  paymentStatus: paymentStatuses[i % paymentStatuses.length],
  paymentMethod: ['Paypal', 'Cash on Delivery', 'Amazon Pay'][i % 3],
  status: statuses[i % statuses.length],
  items: [
    { productId: 'product-003', name: 'Chinese Cabbage', price: 14.0, quantity: 5, subtotal: 70.0 },
    { productId: 'product-005', name: 'Red Capsicum', price: 14.0, quantity: 1, subtotal: 14.0 },
  ],
  shipping: { name: 'Dainne Russell', address: '4140 Parker Rd. Allentown, New Mexico 31134', email: 'dainne.ressell@gmail.com', phone: '(671) 555-0110' },
  billing: { name: 'Dainne Russell', address: '4140 Parker Rd. Allentown, New Mexico 31134', email: 'dainne.ressell@gmail.com', phone: '(671) 555-0110' },
  subtotal: 84.0,
  discount: '20%',
  shippingCost: 'Free',
}));
