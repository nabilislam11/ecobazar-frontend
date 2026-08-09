import Rating from './Rating';

export default function ReviewCard({ review }) {
  return (
    <div className="border-b border-gray-100 py-5">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-small font-medium text-gray-900">{review.customer}</p>
        <span className="text-tiny text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
      </div>
      <Rating value={review.rating} />
      <p className="mt-2 text-small text-gray-700">{review.comment}</p>
    </div>
  );
}
