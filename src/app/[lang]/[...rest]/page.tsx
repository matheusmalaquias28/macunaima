import { notFound } from "next/navigation";

// Qualquer rota inexistente cai aqui e mostra o 404 dentro do layout do idioma
export default function CatchAll() {
  notFound();
}
