import type {
  AuthApiResponse,
  ForgotPasswordInput,
  SignInInput,
  SignUpInput,
} from "@/types/auth.types";

/**
 * Backend integration placeholders.
 *
 * Set NEXT_PUBLIC_API_BASE_URL to your backend base URL and adjust endpoint
 * paths to match your API. These functions intentionally do not run until
 * called by the UI; the current auth form remains in preview/demo mode.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

async function post<TBody, TResult>(path: string, body: TBody): Promise<TResult> {
  if (!API_BASE_URL) {
    throw new Error("Authentication API is not configured yet.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => ({}))) as TResult & AuthApiResponse;

  if (!response.ok) {
    throw new Error(data.message || "The request could not be completed.");
  }

  return data;
}

export function signIn(input: SignInInput) {
  return post<SignInInput, AuthApiResponse>("/auth/sign-in", input);
}

export function signUp(input: SignUpInput) {
  return post<SignUpInput, AuthApiResponse>("/auth/sign-up", input);
}

export function requestPasswordReset(input: ForgotPasswordInput) {
  return post<ForgotPasswordInput, AuthApiResponse>("/auth/forgot-password", input);
}
