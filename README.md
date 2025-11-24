


Frontbooth Forms — Next.js + React Hook Form + Yup

A modern, production-ready form built using Next.js (App Router), React Hook Form, Yup validation, and Tailwind CSS.
This project demonstrates how to build a fully validated, elegant, scalable, and maintainable form experience with modular field components.

⸻

Features
	•	Next.js App Router (Server + Client Components)
	•	React Hook Form for advanced form handling
	•	Yup for schema-based validation
	•	Modular field components
	•	Text input
	•	Textarea
	•	Select
	•	Radio group
	•	Checkbox group
	•	File upload (custom-styled button + dynamic label)
	•	Date picker
	•	Dynamic validation (conditional schema using Yup .when())
	•	Full error handling & user feedback
	•	Custom Navbar
	•	Fully styled UI using Tailwind CSS
	•	Clean, extensible folder structure
	•	Support for file uploads via controlled components
    .   API Calling simulation using callbacks

⸻

📁 Folder Structure

src/
├─ app/
│  ├─ layout.js        // Root layout (server component)
│  ├─ page.js          // Main form page (server component)
│  └─ globals.css      // Tailwind setup
│
├─ components/
│  ├─ Navbar.jsx       // Modern top navigation bar
│  ├─ Form.jsx         // Main form logic + RHF + Yup resolver
│  └─ fields/          // All reusable field components
│     ├─ TextInput.jsx
│     ├─ Textarea.jsx
│     ├─ Select.jsx
│     ├─ RadioGroup.jsx
│     ├─ CheckboxGroup.jsx
│     └─ FileInput.jsx
│
├─ lib/
│  └─ validators.js    // Yup schema for full form validation

This structure is scalable and encourages clean separation of logic and UI.

⸻

🧩 Tech Stack

Technology	Purpose
Next.js 14+	Framework for routing, rendering & edge-ready deployment
React Hook Form	Fast, minimal form state management
Yup	Schema-based validation, powerful conditional logic
Tailwind CSS	Styling with utility classes
React	UI library


⸻

⚙️ Installation & Setup

# Clone the project
git clone 

# Navigate
cd frontbooth-forms

# Install dependencies
npm install

# Run dev server
npm run dev


⸻

🧠 How React Hook Form Works in This Project

1️⃣ Initialization

In Form.jsx:

const {
  register,
  control,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting },
  reset
} = useForm({
  resolver: yupResolver(formSchema),
  defaultValues: { ... }
});

	•	register → used for native HTML inputs
	•	control + Controller → used for controlled components like radio, checkboxes, file uploads
	•	errors → contains validation errors from Yup
	•	handleSubmit → manages validation + submission


Yup Validation Schema (How It Works)

Located in: lib/validators.js

Key features:
	•	Required fields (fullName, email, role, etc.)
	•	Type checks (age must be a number)
	•	String length & format validations
	•	Conditional validation (phone required only if contactMethod is "phone")
	•	File validation (size + type)
	•	Date validation (startDate required, empty string transformed to null)

Example of conditional phone validation:

phone: yup
  .string()
  .nullable()
  .when("contactMethod", (method, schema) => {
    if (method === "phone") {
      return schema
        .matches(/^\+?[0-9]{7,15}$/, "Enter a valid phone number")
        .required("Phone is required");
    }
    return schema.notRequired();
  }),

This ensures business rules are enforced at the schema level.



 Modular Field Components

Each field lives in /components/fields/ and has a single responsibility.

✔ TextInput

Simple labeled text field.

✔ Textarea

For multi-line input.

✔ Select

Dropdown list with options.

✔ RadioGroup

Used with Controller; returns a single value.

✔ CheckboxGroup

Returns an array of selected skills.

✔ FileInput

Custom button with:
	•	Tailwind styling
	•	Dynamic button text
	•	Hidden native file input
	•	React Hook Form support via Controller

Example behavior:

Before selecting → “Choose File”
After selecting → “Choose another file”


⸻

 Data Flow Between Components

1. User interacts with fields

Native fields → register
Custom fields → Controller

2. React Hook Form updates internal form state

Values are tracked without re-rendering the entire form.

3. Yup validates entire data object

If valid → returns cleaned data
If invalid → returns error messages

4. Errors are passed to each component

Each component displays its own error based on errors.<field>.

5. Submit handler receives fully validated data

File inputs come in as File objects.

⸻

 Form Submission Flow
	1.	User clicks Submit
	2.	React Hook Form invokes Yup validator
	3.	If validation fails:
	•	Errors appear under fields
	4.	If validation succeeds:
	•	Runs onSubmit(data)
	•	You can:
	•	Send data to API route
	•	Upload files using FormData
	•	Reset the form

Example snippet:

async function onSubmit(data) {
  console.log("Form submitted", data);
  alert("Success!");
  reset();
}


⸻
 UI/UX Highlights
	•	Clean, modern layout using Tailwind
	•	Accessible labels & input elements
	•	Custom file upload button with hover effects
	•	Responsive navbar with branding
	•	Smooth validation feedback
	•	Minimal re-rendering thanks to React Hook Form

⸻



⸻
By Bhuwanesh Jung Thapa