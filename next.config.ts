import type { NextConfig } from "next";

// URLs do site antigo (WordPress) que o Google já indexou → página equivalente no site novo.
// Redirecionamento permanente preserva o ranqueamento e evita 404 para quem chega por links antigos.
const legacyRedirects: [string, string][] = [
  ["/a-macunaima", "/quem-somos"],
  ["/nossas-certificacoes", "/#certificacoes"],
  ["/nossos-produtos", "/produtos/acai"],
  ["/loja", "/produtos/acai"],
  ["/loja/:slug*", "/produtos/acai"],
  ["/categoria-produto/:slug*", "/produtos/acai"],
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
    return [
      ...legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
      // "Produtos" abre a Linha Açaí (o menu tem Açaí, Sorvete e Receitas)
      { source: "/produtos", destination: "/produtos/acai", permanent: false },
      { source: "/en/produtos", destination: "/en/produtos/acai", permanent: false },
      // Receitas agora ficam dentro da página do Açaí
      { source: "/produtos/receitas", destination: "/produtos/acai#receitas", permanent: true },
      { source: "/en/produtos/receitas", destination: "/en/produtos/acai#receitas", permanent: true },
    ];
  },
};

export default nextConfig;
