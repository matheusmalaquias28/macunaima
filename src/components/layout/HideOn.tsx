"use client";

import { usePathname } from "next/navigation";

// Páginas sem o "casco" do site (cabeçalho, rodapé, barra de pedido, preloader)
const bare = ["/links"];

export default function HideOn({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return bare.includes(pathname) ? null : children;
}
