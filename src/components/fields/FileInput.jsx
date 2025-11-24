"use client";
import React from "react";

export default function FileInput({ label, name, value, onChange, error }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  return (
    <div className="my-4">
      <label className="block text-sm font-medium mb-2">{label}</label>

      {/* Hidden input */}
      <input
        id={name}
        type="file"
        onChange={handleChange}
        className="hidden"
      />

      {/* Custom styled button */}
      <label
        htmlFor={name}
        className="
          inline-block px-4 py-2 rounded bg-blue-600 text-white 
          cursor-pointer hover:bg-blue-700 transition
        "
      >
        {value ? "Choose another file" : "Choose File"}
      </label>

      {/* Show selected file name */}
      {value && value.name && (
        <p className="mt-2 text-sm text-gray-700">
          Selected: <strong>{value.name}</strong>
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}