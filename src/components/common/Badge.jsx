export default function Badge({ children, tone = 'success', className = '' }) {
  const tones = {
    success: 'bg-success/10 text-success-dark',
    error: 'bg-error/10 text-error',
    warning: 'bg-warning/10 text-warning',
    gray: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`inline-flex items-center rounded px-2 py-1 text-tiny font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
