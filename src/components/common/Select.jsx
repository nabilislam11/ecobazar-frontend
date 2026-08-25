import React, { forwardRef } from "react";

const Select = forwardRef(
  (
    {
      label,
      error,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-900">
            {label}
          </label>
        )}

        <select
          ref={ref}
          {...props}
          className={`w-full rounded border px-4 py-3 text-sm outline-none transition
            ${error
              ? "border-red-500"
              : "border-gray-200 focus:border-green-500"
            }
            ${className}`}
        >
          {children}
        </select>

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;