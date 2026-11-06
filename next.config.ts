import type { NextConfig } from "next";

// URLs do site antigo (WordPress) que o Google já indexou → página equivalente no site novo.
// Redirecionamento permanente preserva o ranqueamento e evita 404 para quem chega por links antigos.
const legacyRedirects: [string, string][] = [
  ["/a-macunaima", "/"],
  ["/nossas-certificacoes", "/#certificacoes"],
  ["/nossos-produtos", "/produtos"],
  ["/loja", "/produtos"],
  ["/loja/:slug*", "/produtos"],
  ["/categoria-produto/:slug*", "/produtos"],
  ["/carrinho", "/contato"],
  ["/finalizar-compra", "/contato"],
  ["/minha-conta", "/contato"],
  ["/fale-conosco", "/contato"],
  ["/acai-em-recife", "/onde-nos-encontrar#recife"],
  ["/acai-em-fortaleza", "/onde-nos-encontrar#fortaleza"],
  ["/acai-em-natal", "/onde-nos-encontrar"],
  ["/feed", "/"],
  ["/comments/feed", "/"],
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
