"use client";

import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
  type ForgotPasswordFormValues,
  type SignInFormValues,
  type SignUpFormValues,
} from "@/lib/validations/auth.schema";
import { requestPasswordReset, signIn, signUp } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowUpRight, LoaderCircle, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthInput from "./AuthInput";
import PasswordStrength from "./PasswordStrength";
import SocialAuthButton from "./SocialAuthButton";

type AuthMode = "sign-in" | "sign-up" | "forgot-password";
type Notice = { kind: "success" | "error"; text: string } | null;

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const [notice, setNotice] = useState<Notice>(null);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });
  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const isSignIn = mode === "sign-in";
  const isSignUp = mode === "sign-up";
  const titleKey = isSignIn ? "signIn" : isSignUp ? "signUp" : "forgot";
  const title = t(`${titleKey}Title`);
  const eyebrow = t(`${titleKey}Eyebrow`);
  const description = t(`${titleKey}Description`);

  const showServiceNotice = (message: string) => {
    setNotice({ kind: "success", text: message });
  };

  const onSignIn = signInForm.handleSubmit(async (values) => {
    setNotice(null);
    setIsSubmitting(true);
    try {
      const result = await signIn(values);
      showServiceNotice(result.message || t("serviceSuccess.signIn"));
    } catch (error) {
      setNotice({
        kind: "error",
        text: error instanceof Error ? error.message : t("serviceError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  const onSignUp = signUpForm.handleSubmit(
    async ({ name, email, password: submittedPassword }) => {
      setNotice(null);
      setIsSubmitting(true);
      try {
        const result = await signUp({
          name,
          email,
          password: submittedPassword,
        });
        showServiceNotice(result.message || t("serviceSuccess.signUp"));
      } catch (error) {
        setNotice({
          kind: "error",
          text: error instanceof Error ? error.message : t("serviceError"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  );

  const onForgot = forgotForm.handleSubmit(async (values) => {
    setNotice(null);
    setIsSubmitting(true);
    try {
      const result = await requestPasswordReset(values);
      showServiceNotice(result.message || t("serviceSuccess.forgotPassword"));
    } catch (error) {
      setNotice({
        kind: "error",
        text: error instanceof Error ? error.message : t("serviceError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleGoogle = () => {
    setNotice({ kind: "error", text: t("googleNotConfigured") });
  };

  const currentForm = isSignIn
    ? signInForm
    : isSignUp
      ? signUpForm
      : forgotForm;
  const emailError =
    "email" in currentForm.formState.errors
      ? currentForm.formState.errors.email?.message
      : undefined;

  return (
    <section className="w-full">
      <div className="mb-5 flex items-center gap-2 text-[10px] font-extrabold tracking-[0.22em] text-[#F5C518]">
        <span className="h-0.5 w-7 bg-[#F5C518]" />
        {eyebrow}
      </div>

      <div className="mb-7 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-4xl font-black leading-[1.04] tracking-[-0.055em] text-white sm:text-[52px]">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/60">{description}</p>
        </div>
        <Sparkles
          className="mt-1 hidden shrink-0 text-[#F5C518]/70 sm:block"
          size={22}
          aria-hidden="true"
        />
      </div>

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className={`mb-4 rounded-lg border px-3.5 py-3 text-xs leading-5 ${
            notice.kind === "success"
              ? "border-[#F5C518]/30 bg-[#F5C518]/[0.07] text-[#f5d96c]"
              : "border-red-400/30 bg-red-400/[0.07] text-red-200"
          }`}
        >
          {notice.text}
        </div>
      )}

      {isSignIn && (
        <form className="flex flex-col gap-4" noValidate onSubmit={onSignIn}>
          <AuthInput
            id="email"
            label={t("fields.email")}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            dir="ltr"
            registration={signInForm.register("email")}
          />
          {emailError && (
            <p className="-mt-2 text-xs text-red-300">{String(emailError)}</p>
          )}
          <AuthInput
            id="password"
            label={t("fields.password")}
            type="password"
            autoComplete="current-password"
            registration={signInForm.register("password")}
            onValueChange={() => signInForm.clearErrors("password")}
          />
          {signInForm.formState.errors.password?.message && (
            <p className="-mt-2 text-xs text-red-300">{t("errors.password")}</p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                {...signInForm.register("rememberMe")}
                className="h-3.5 w-3.5 accent-[#F5C518]"
              />
              {t("rememberMe")}
            </label>
            <Link
              href="/forgot-password"
              className="font-semibold text-[#F5C518] hover:text-[#ffe477]"
            >
              {t("forgotLink")}
            </Link>
          </div>

          <SubmitButton
            disabled={isSubmitting}
            label={t("actions.signIn")}
            loadingLabel={t("submitting")}
            isSubmitting={isSubmitting}
          />
        </form>
      )}

      {isSignUp && (
        <form className="flex flex-col gap-4" noValidate onSubmit={onSignUp}>
          <AuthInput
            id="name"
            label={t("fields.name")}
            placeholder={t("placeholders.name")}
            autoComplete="name"
            registration={signUpForm.register("name")}
          />
          {signUpForm.formState.errors.name?.message && (
            <p className="-mt-2 text-xs text-red-300">{t("errors.name")}</p>
          )}
          <AuthInput
            id="email"
            label={t("fields.email")}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            dir="ltr"
            registration={signUpForm.register("email")}
          />
          {signUpForm.formState.errors.email?.message && (
            <p className="-mt-2 text-xs text-red-300">{t("errors.email")}</p>
          )}
          <div>
            <AuthInput
              id="password"
              label={t("fields.password")}
              type="password"
              autoComplete="new-password"
              registration={signUpForm.register("password")}
              onValueChange={(value) => {
                setPassword(value);
                signUpForm.setValue("password", value, {
                  shouldValidate: signUpForm.formState.isSubmitted,
                });
              }}
            />
            <PasswordStrength password={password} />
            {signUpForm.formState.errors.password?.message && (
              <p className="mt-1 text-xs text-red-300">
                {t("errors.password")}
              </p>
            )}
          </div>
          <AuthInput
            id="confirmPassword"
            label={t("fields.confirmPassword")}
            type="password"
            autoComplete="new-password"
            registration={signUpForm.register("confirmPassword")}
            onValueChange={(value) =>
              signUpForm.setValue("confirmPassword", value, {
                shouldValidate: signUpForm.formState.isSubmitted,
              })
            }
          />
          {signUpForm.formState.errors.confirmPassword?.message && (
            <p className="-mt-2 text-xs text-red-300">
              {t("errors.passwordMismatch")}
            </p>
          )}

          <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-white/60">
            <input
              type="checkbox"
              {...signUpForm.register("acceptTerms")}
              className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#F5C518]"
            />
            <span>{t("acceptTerms")}</span>
          </label>
          {signUpForm.formState.errors.acceptTerms?.message && (
            <p className="-mt-2 text-xs text-red-300">{t("errors.terms")}</p>
          )}

          <SubmitButton
            disabled={isSubmitting}
            label={t("actions.signUp")}
            loadingLabel={t("submitting")}
            isSubmitting={isSubmitting}
          />
        </form>
      )}

      {!isSignIn && !isSignUp && (
        <form className="flex flex-col gap-4" noValidate onSubmit={onForgot}>
          <AuthInput
            id="email"
            label={t("fields.email")}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            dir="ltr"
            registration={forgotForm.register("email")}
          />
          {forgotForm.formState.errors.email?.message && (
            <p className="-mt-2 text-xs text-red-300">{t("errors.email")}</p>
          )}
          <SubmitButton
            disabled={isSubmitting}
            label={t("actions.forgotPassword")}
            loadingLabel={t("submitting")}
            isSubmitting={isSubmitting}
          />
        </form>
      )}

      {isSignIn && (
        <>
          <div className="my-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.16em] text-white/35">
            <span className="h-px flex-1 bg-white/10" />
            {t("or")}
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <SocialAuthButton onClick={handleGoogle} disabled={isSubmitting} />
        </>
      )}

      <p className="mt-6 text-center text-xs text-white/55">
        {isSignIn ? (
          <>
            {t("noAccount")}{" "}
            <Link
              href="/sign-up"
              className="font-bold text-[#F5C518] hover:text-[#ffe477]"
            >
              {t("links.signUp")}
            </Link>
          </>
        ) : isSignUp ? (
          <>
            {t("hasAccount")}{" "}
            <Link
              href="/sign-in"
              className="font-bold text-[#F5C518] hover:text-[#ffe477]"
            >
              {t("links.signIn")}
            </Link>
          </>
        ) : (
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 font-bold text-[#F5C518] hover:text-[#ffe477]"
          >
            <ArrowLeft size={14} /> {t("links.backToSignIn")}
          </Link>
        )}
      </p>

      <p className="mt-5 text-[10px] leading-5 text-white/35">
        {t("legalNote")}
      </p>
    </section>
  );
}

function SubmitButton({
  label,
  loadingLabel,
  isSubmitting,
  disabled,
}: {
  label: string;
  loadingLabel: string;
  isSubmitting: boolean;
  disabled: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-1 inline-flex min-h-12.5 items-center justify-center gap-2 rounded-[9px] bg-[#F5C518] px-4 text-sm font-black text-[#101010] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5C518] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? (
        <LoaderCircle size={17} className="animate-spin" />
      ) : null}
      {isSubmitting ? loadingLabel : label}
      {!isSubmitting ? <ArrowUpRight size={17} /> : null}
    </button>
  );
}
