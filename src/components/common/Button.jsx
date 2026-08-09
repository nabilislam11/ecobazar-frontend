// Matches Figma "Button" component: Size (Small/Medium/Large) x Type (Fill/Border/Ghost)
const sizeClasses = {
  sm: 'px-6 py-2.5 text-tiny',
  md: 'px-8 py-3.5 text-small',
  lg: 'px-10 py-4 text-medium',
};

const typeClasses = {
  fill: 'bg-success text-white hover:bg-success-dark',
  border: 'bg-white border-2 border-success text-success hover:border-success-dark hover:text-success-dark',
  ghost: 'bg-success/10 text-success hover:bg-success-dark/20 hover:text-success-dark',
};

export default function Button({
  as: Component = 'button',
  size = 'md',
  variant = 'fill',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${typeClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
