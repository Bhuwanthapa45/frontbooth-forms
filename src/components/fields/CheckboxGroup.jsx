import React from "react";



export default function CheckboxGroup({ label, options = [], value = [], onChange, error }) {
  
  const toggleValue = (option) => {
    if (!Array.isArray(value)) {
      onChange([option]);
      return;
    }

    if (value.includes(option)) {
      // remove value
      onChange(value.filter((v) => v !== option));
    } else {
      // add value
      onChange([...value, option]);
    }
  };

  return (
    <div className="my-4">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <div className="flex gap-4 flex-wrap">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={opt}
              checked={Array.isArray(value) && value.includes(opt)}
              onChange={() => toggleValue(opt)}
              className="h-4 w-4"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>

      {/* Error message */}
      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  );
}