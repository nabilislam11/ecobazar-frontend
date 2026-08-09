import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="mb-2 block text-small text-gray-900">
            {label}
          </span>
        )}

        <input
          ref={ref}
          className={`w-full rounded border px-4 py-3 text-small text-gray-900 placeholder:text-gray-400 focus:border-success ${error ? 'border-error' : 'border-gray-100'
            } ${className}`}
          {...props}
        />

        {error && (
          <span className="mt-1 block text-tiny text-error">
            {error}
          </span>
        )}
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;