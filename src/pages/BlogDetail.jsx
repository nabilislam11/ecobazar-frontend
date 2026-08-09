import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as blogService from '../services/blogService';
import Loader from '../components/common/Loader';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => { setBlog(null); blogService.getBlogBySlug(slug).then(setBlog); }, [slug]);
  if (!blog) return <Loader />;

  return (
    <article className="container-page max-w-3xl py-14">
      <p className="mb-2 text-tiny font-medium text-success">{blog.category}</p>
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">{blog.title}</h1>
      <p className="mb-8 text-tiny text-gray-400">By {blog.author} · {new Date(blog.publishDate).toLocaleDateString()}</p>
      <div className="mb-8 aspect-[16/9] rounded-lg bg-gray-50" />
      <p className="text-small leading-relaxed text-gray-700">{blog.content}</p>
    </article>
  );
}
