import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";

type Props = {
  children: React.ReactNode;
};

export default function MoviesLayout({ children }: Props) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}
