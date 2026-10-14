// Dados centrais do site. Itens marcados com [A CONFIRMAR] aguardam o cliente.

export type NavLink = { label: string; href: string };

// Seções da home (âncoras) enquanto as páginas internas não existem; Produtos e Sorbet vão para /produtos
export const mainNav: NavLink[] = [
  { label: "A Macunaíma", href: "/#a-macunaima" },
  { label: "Produtos", href: "/produtos" },
  { label: "Origem", href: "/#origem" },
  { label: "Qualidade", href: "/#qualidade" },
  { label: "Exportação", href: "/#exportacao" },
  { label: "Linha Sorbet", href: "/produtos#linha-sorbet" },
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
  phones: ["(91) 9 8545-5750", "(91) 9 8814-5471"],
  email: "[A CONFIRMAR]",
  address: "Pará, Brasil · endereço [A CONFIRMAR]",
};

// Slides da hero (carrossel). Tudo é editável: fundo, textos e botões.
// Fundo: YouTube (id), vídeo local (src em public/video), imagem (src) ou a logo sobre o roxo.
// O primeiro slide é o título principal da página (h1).
export type HeroBackground =
  | { type: "youtube"; id: string }
  | { type: "video"; src: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "logo" };

export type HeroSlide = {
  background: HeroBackground;
  eyebrow?: string;
  title: string;
  subtitle?: string[]; // uma linha por item
  text?: string;
  ctas?: { label: string; href: string; variant?: "folha" | "outline-light" }[];
  tag?: string; // rótulo da barra inferior
};

export const heroSlides: HeroSlide[] = [
  {
    background: { type: "youtube", id: "ctjxznmqRV0" },
    eyebrow: "Pará, Brasil",
    title: "Açaí da Amazônia.",
    subtitle: ["Produzido no Pará", "para o mundo."],
    text: "Da origem do fruto à produção industrial, a Macunaíma transforma o açaí do Pará em produtos para empresas que precisam de qualidade, escala e consistência.",
    ctas: [
      { label: "Conheça nossos produtos", href: "/produtos" },
      { label: "Quero comprar", href: "/contato", variant: "outline-light" },
    ],
    tag: "Indústria de polpa de açaí",
  },
  // Conteúdo provisório, só para demonstrar o carrossel
  {
    background: { type: "logo" },
    eyebrow: "Grupo Macunaíma",
    title: "Qualidade em escala.",
    subtitle: ["Do açaizal", "à sua operação."],
    text: "Estrutura industrial, certificações internacionais e uma cadeia de fornecimento próxima da origem para atender o seu negócio com regularidade.",
    ctas: [
      { label: "Fale com a Macunaíma", href: "/contato" },
      { label: "Conheça a origem", href: "/#origem", variant: "outline-light" },
    ],
    tag: "Grupo Macunaíma",
  },
];

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

export const sorbetLine = {
  text: "Além da linha de açaí, a Macunaíma possui uma linha de Sorbet desenvolvida com frutas selecionadas e alta concentração de polpa.",
  packaging: "5 litros",
};

// bg/ink: cores do sabor; a/b: tons do placeholder enquanto não houver foto
export const sorbets: { name: string; bg: string; ink: string; a: string; b: string; src?: string }[] = [
  { name: "Coco", bg: "#EFE6D8", ink: "#22011a", a: "#ffffff", b: "#d9c7ae", src: "/sorbet/coco.jpg" },
  { name: "Manga", bg: "#F5A524", ink: "#22011a", a: "#ffd27a", b: "#d9780b", src: "/sorbet/manga.jpg" },
  { name: "Maracujá", bg: "#F0D33C", ink: "#22011a", a: "#fff09a", b: "#c9a40f", src: "/sorbet/maracuja.jpg" },
  { name: "Pitaya", bg: "#C8175D", ink: "#ffffff", a: "#f0508f", b: "#7d0a37", src: "/sorbet/pitaya.jpg" },
  { name: "Blue Magic", bg: "#2C5BD8", ink: "#ffffff", a: "#6f97ff", b: "#16338a", src: "/sorbet/blue-magic.jpg" },
];
