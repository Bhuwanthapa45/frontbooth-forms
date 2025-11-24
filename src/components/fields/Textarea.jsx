import React from 'react'
export default function Textarea({ label, id, error, ...rest }) {
  return (
    <div className="my-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <textarea id={id} rows={5} className="border rounded px-3 py-2 w-full" {...rest} />
      {error && <p className="text-red-600 mt-1 text-sm">{error.message}</p>}
    </div>
  )
}