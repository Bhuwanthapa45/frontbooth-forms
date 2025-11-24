import * as yup from "yup";

export const formSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters")
    .required("Full name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .min(13, "You must be at least 13")
    .max(120, "Please enter a realistic age")
    .required("Age is required"),

  bio: yup
    .string()
    .max(500, "Bio must be at most 500 characters")
    .nullable(),

  role: yup
    .string()
    .oneOf(["student", "developer", "designer", "other"])
    .required("Role is required"),

  skills: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one skill")
    .required("Select at least one skill"),

  newsletter: yup.boolean(),

  contactMethod: yup
    .string()
    .oneOf(["email", "phone"])
    .required("Please choose a contact method"),

  // FIXED VERSION OF CONDITIONAL VALIDATION
  phone: yup
    .string()
    .nullable()
    .when("contactMethod", (method, schema) => {
      if (method === "phone") {
        return schema
          .matches(/^\+?[0-9]{7,15}$/, "Enter a valid phone number")
          .required("Phone is required when contact method is phone");
      }
      return schema.notRequired();
    }),

  startDate: yup
    .date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable()
    .required("Start date is required"),

  resume: yup
    .mixed()
    .nullable()
    .test("fileSize", "File is too large", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024; // 2MB
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(value.type);
    }),
});

export default formSchema;