import React from "react";



export default function RadioGroup({ label, name, options = [], value, onChange, error }) {
  return (
    <div className="my-4">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-red-600 mt-1 text-sm">{error.message}</p>
      )}
    </div>
  );
}