import { z } from "zod";

const emailSchema = z.string().email("Enter a valid email address.");

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Password must contain at least 8 characters."),
  rememberMe: z.boolean().default(false),
});

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name."),
    email: emailSchema,
    password: z.string().min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(Boolean, "Please accept the terms to continue."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
