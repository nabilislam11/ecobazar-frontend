const raw = [
  'Curabitur porttitor orci eget neque accumsan venenatis',
  'Donec mattis arcu faucibus suscipit viverra',
  'Quisque posuere tempus rutrum. Integer velit ex',
];

export const blogs = raw.map((title, i) => ({
  id: `blog-${i + 1}`,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  featuredImage: `/images/blog/blog-${i + 1}.jpg`,
  category: 'Food',
  excerpt: `${title}. Nunc fermentum tellus eget urna faucibus, eget congue elit dictum.`,
  content: `${title}. Nunc fermentum tellus eget urna faucibus, eget congue elit dictum. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.`,
  author: 'Admin',
  status: 'published',
  publishDate: new Date(2026, 3, 25 - i).toISOString(),
  commentCount: 65 - i * 10,
}));
