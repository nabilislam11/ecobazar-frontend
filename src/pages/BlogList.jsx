import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as blogService from '../services/blogService';
import Loader from '../components/common/Loader';

export default function BlogList() {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => { blogService.getBlogs().then(setBlogs); }, []);
  if (!blogs) return <Loader />;

  return (
    <div className="container-page py-14">
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">Blog</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b) => (
          <Link key={b.id} to={`/blog/${b.slug}`} className="group overflow-hidden rounded-lg border border-gray-100">
            <div className="aspect-[16/10] bg-gray-50" />
            <div className="p-5">
              <p className="mb-2 text-tiny font-medium text-success">{b.category}</p>
              <p className="line-clamp-2 text-small font-medium text-gray-900 group-hover:text-success">{b.title}</p>
              <p className="mt-3 line-clamp-2 text-tiny text-gray-400">{b.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
