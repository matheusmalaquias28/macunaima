import type { Metadata } from "next";
import NotFoundContent from "@/components/sections/NotFoundContent";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
