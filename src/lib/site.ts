// Dados centrais do site. Itens marcados com [A CONFIRMAR] aguardam o cliente.

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "A Macunaíma", href: "/a-macunaima" },
  { label: "Produtos", href: "/produtos" },
  { label: "Origem", href: "/origem" },
  { label: "Qualidade", href: "/processo-e-qualidade" },
  { label: "Exportação", href: "/exportacao" },
  { label: "Linha Sorbet", href: "/linha-sorbet" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Institucional",
    links: [
      { label: "Início", href: "/" },
      { label: "A Macunaíma", href: "/a-macunaima" },
      { label: "Nossa origem", href: "/origem" },
      { label: "Estrutura", href: "/estrutura" },
      { label: "Processo e qualidade", href: "/processo-e-qualidade" },
      { label: "Exportação", href: "/exportacao" },
    ],
  },
  {
    title: "Produtos",
    links: [
      { label: "Açaí 8% · 1,02 kg", href: "/produtos/acai-8-1kg" },
      { label: "Açaí 12% · 1,02 kg", href: "/produtos/acai-12-1kg" },
      { label: "Açaí 12% · 100 g", href: "/produtos/acai-12-100g" },
      { label: "Açaí 14% · 1,02 kg", href: "/produtos/acai-14-1kg" },
      { label: "Linha Sorbet", href: "/linha-sorbet" },
    ],
  },
  {
    title: "Comercial",
    links: [
      { label: "Quero comprar", href: "/contato" },
      { label: "Fale com a Macunaíma", href: "/contato" },
    ],
  },
];

// TODO: substituir pelos perfis oficiais
export const socials = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "YouTube", href: "#", icon: "youtube" },
] as const;

export const contact = {
  phone: "[A CONFIRMAR]",
  email: "[A CONFIRMAR]",
  address: "Pará, Brasil · endereço [A CONFIRMAR]",
};

export const seals = [
  { src: "/selos/fssc-22000.png", alt: "Certificação FSSC 22000", w: 1131, h: 208 },
  { src: "/selos/organico-brasil.png", alt: "Produto Orgânico Brasil", w: 310, h: 146 },
  { src: "/selos/usda-organic.png", alt: "USDA Organic", w: 500, h: 500 },
  { src: "/selos/organico-ue.png", alt: "Agricultura biológica da União Europeia", w: 500, h: 333 },
  { src: "/selos/non-gmo.png", alt: "Non GMO Project Verified", w: 666, h: 489 },
  { src: "/selos/bdk-kosher.png", alt: "BDK Kosher Parve", w: 604, h: 278 },
  { src: "/selos/jas-ecocert.png", alt: "JAS Ecocert", w: 523, h: 308 },
  { src: "/selos/canada-organic.png", alt: "Canada Organic Biologique", w: 805, h: 808 },
  { src: "/selos/organico-mexico.png", alt: "Orgánico México", w: 720, h: 721 },
];

export const products = [
  {
    slug: "acai-8-1kg",
    concentration: "8%",
    weight: "1,02 kg",
    text: "Polpa de açaí indicada para consumo direto ou para utilização na fabricação de outros produtos.",
    photo: "/produtos/acai-8-1kg.jpg",
    alt: "Embalagem de Açaí Macunaíma 8%, 1,02 kg",
  },
  {
    slug: "acai-12-1kg",
    concentration: "12%",
    weight: "1,02 kg",
    text: "Polpa de açaí em concentração de 12%, em embalagem de 1,02 kg.",
    photo: "/produtos/acai-12-1kg.jpg",
    alt: "Embalagem de Açaí Macunaíma 12%, 1,02 kg",
  },
  {
    slug: "acai-12-100g",
    concentration: "12%",
    weight: "100 g",
    text: "Polpa de açaí em concentração de 12%, em embalagem de 100 g.",
    photo: "/produtos/acai-12-100g.jpg",
    alt: "Embalagem de Açaí Macunaíma 12%, 100 g",
  },
  {
    slug: "acai-14-1kg",
    concentration: "14%",
    weight: "1,02 kg",
    text: "Polpa de açaí em concentração de 14%, em embalagem de 1,02 kg.",
    photo: "/produtos/acai-14-1kg.jpg",
    alt: "Embalagem de Açaí Macunaíma 14%, 1,02 kg",
  },
];
