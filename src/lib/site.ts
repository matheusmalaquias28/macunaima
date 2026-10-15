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
  { label: "Onde nos encontrar", href: "/onde-nos-encontrar" },
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
      { label: "Açaí 8% · 1,02 kg", href: "/produtos#acai-8-1kg" },
      { label: "Açaí 12% · 1,02 kg", href: "/produtos#acai-12-1kg" },
      { label: "Açaí 14% · 1,02 kg", href: "/produtos#acai-14-1kg" },
      { label: "Linha Sorbet", href: "/produtos#linha-sorbet" },
    ],
  },
  {
    title: "Comercial",
    links: [
      { label: "Quero comprar", href: "/contato" },
      { label: "Fale com a Macunaíma", href: "/contato" },
      { label: "Onde nos encontrar", href: "/onde-nos-encontrar" },
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
  email: "vendas@acaimacunaima.com.br",
  address: "Travessa Benedito Miguel de Souza, 230 · Vila Nova, Inhangapi - PA",
  maps: "https://maps.app.goo.gl/RJcbERxXFCY5qc4K7",
  // WhatsApp comercial já usado no formulário de pedido
  whatsapp: "5591985455750",
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

// Unidades (página "Onde nos encontrar"), conforme o site atual da Macunaíma
export type Unit = {
  slug: string;
  city: string;
  uf: string;
  kind: "Matriz" | "Distribuidora";
  name: string;
  segment: string;
  address?: string;
  phone: string;
  whatsapp?: string; // só dígitos, com DDI
  maps: string;
  products: string[];
};

export const units: Unit[] = [
  {
    slug: "inhangapi",
    city: "Inhangapi",
    uf: "PA",
    kind: "Matriz",
    name: "Agroindústria Açaí Macunaíma",
    segment: "Atacado",
    phone: "(91) 3809-1101",
    whatsapp: "559188145471",
    maps: "https://maps.app.goo.gl/RJcbERxXFCY5qc4K7",
    products: ["Açaí 8%", "Açaí 12%", "Açaí 14%"],
  },
  {
    slug: "recife",
    city: "Recife",
    uf: "PE",
    kind: "Distribuidora",
    name: "Açaí Distribuidora",
    segment: "Varejo e atacado",
    address: "Av. Getúlio Vargas, 635 · Curado, Recife - PE",
    phone: "(81) 3252-1659",
    whatsapp: "5581988055937",
    maps: "https://www.google.com/maps/search/?api=1&query=Av.+Get%C3%BAlio+Vargas,+635+-+Curado,+Recife+-+PE",
    products: ["Creme de açaí · balde", "Açaí 12%", "Açaí 14%"],
  },
  {
    slug: "fortaleza",
    city: "Fortaleza",
    uf: "CE",
    kind: "Distribuidora",
    name: "Açaí Distribuidora",
    segment: "Varejo e atacado",
    address: "Rua E, 92 · Cajazeiras, Fortaleza - CE · 60864-467",
    phone: "(85) 4102-9052",
    // WhatsApp [A CONFIRMAR]: no site atual o link aponta para um número genérico
    maps: "https://www.google.com/maps/search/?api=1&query=Rua+E+92+Cajazeiras+60864-467+Fortaleza+CE",
    products: ["Creme de açaí · balde", "Açaí 12%", "Açaí 14%"],
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

export type PortfolioItem = {
  slug: string;
  line: "Açaí" | "Sorbet";
  title: string;
  weight: string;
  text: string;
  detail: string;
  photo?: string;
  alt: string;
  label: string;
  specs: { label: string; value: string }[];
  bg?: string;
  ink?: string;
  a?: string;
  b?: string;
};

const sorbetSlug = (name: string) =>
  `sorbet-${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-")}`;

// Portfólio completo do carrossel: polpas de açaí e cada sabor da Linha Sorbet.
export const portfolio: PortfolioItem[] = [
  ...products.map((p) => ({
    slug: p.slug,
    line: "Açaí" as const,
    title: `Açaí ${p.concentration}`,
    weight: p.weight,
    text: p.text,
    detail: `Polpa de açaí em concentração de ${p.concentration}, em embalagem de ${p.weight}. Indicada para consumo direto ou para a fabricação de outros produtos, com o padrão industrial da Macunaíma no Pará.`,
    photo: p.photo,
    alt: p.alt,
    label: p.alt,
    specs: [
      { label: "Linha", value: "Açaí" },
      { label: "Concentração", value: p.concentration },
      { label: "Embalagem", value: p.weight },
      { label: "Origem", value: "Pará, Brasil" },
    ],
  })),
  ...sorbets.map((f) => ({
    slug: sorbetSlug(f.name),
    line: "Sorbet" as const,
    title: `Sorbet ${f.name}`,
    weight: sorbetLine.packaging,
    text: `Sorbet de ${f.name}, com frutas selecionadas e alta concentração de polpa.`,
    detail: `${sorbetLine.text} O sabor ${f.name} é comercializado em embalagem de ${sorbetLine.packaging}.`,
    photo: f.src,
    alt: `Embalagem de ${sorbetLine.packaging} do Sorbet ${f.name} Macunaíma ao lado de uma taça com bolas de sorbet`,
    label: `Pote de Sorbet ${f.name} ${sorbetLine.packaging} com a fruta ao lado`,
    specs: [
      { label: "Linha", value: "Sorbet" },
      { label: "Sabor", value: f.name },
      { label: "Embalagem", value: sorbetLine.packaging },
      { label: "Origem", value: "Pará, Brasil" },
    ],
    bg: f.bg,
    ink: f.ink,
    a: f.a,
    b: f.b,
  })),
];
