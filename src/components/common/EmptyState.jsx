export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <h3 className="text-medium font-semibold text-gray-900">{title}</h3>
      {description && <p className="max-w-sm text-small text-gray-400">{description}</p>}
      {action}
    </div>
  );
}
