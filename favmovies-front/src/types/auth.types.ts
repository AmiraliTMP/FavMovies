export type SignInInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type AuthApiResponse = {
  message?: string;
  success?: boolean;
};
