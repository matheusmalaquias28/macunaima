// Dados centrais do site (PT e EN). Itens marcados com [A CONFIRMAR] aguardam o cliente.
import type { T } from "@/lib/i18n";

export type NavLink = { label: T; href: string; children?: NavLink[] };

// Menu principal: Início · Quem Somos · Produtos (Açaí, Sorvete, Receitas) · Onde nos Encontrar
export const productsNav: NavLink[] = [
  { label: { pt: "Açaí", en: "Açaí" }, href: "/produtos/acai" },
  { label: { pt: "Sorvete", en: "Sorbet" }, href: "/produtos/sorvete" },
  { label: { pt: "Receitas", en: "Recipes" }, href: "/produtos/acai#receitas" },
];

export const mainNav: NavLink[] = [
  { label: { pt: "Início", en: "Home" }, href: "/" },
  { label: { pt: "Quem Somos", en: "About us" }, href: "/quem-somos" },
  { label: { pt: "Produtos", en: "Products" }, href: "/produtos/acai", children: productsNav },
  { label: { pt: "Onde nos Encontrar", en: "Where to find us" }, href: "/onde-nos-encontrar" },
];

export const buyLink: NavLink = { label: { pt: "Quero Comprar", en: "Buy wholesale" }, href: "/contato" };

export const footerNav: { title: T; links: NavLink[] }[] = [
  {
    title: { pt: "Institucional", en: "Company" },
    links: [mainNav[0], mainNav[1], mainNav[3]],
  },
  { title: { pt: "Produtos", en: "Products" }, links: productsNav },
  {
    title: { pt: "Comercial", en: "Sales" },
    links: [buyLink],
  },
];

// Perfis oficiais (também vão para o Google como "sameAs" da organização)
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/acaimacunaima/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/acaimacunaima/", icon: "linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61577829443813", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@macunaimaagroindustria4189", icon: "youtube" },
] as const;

export const contact = {
  phones: ["(91) 9 8814-5471", "(91) 8545-7504"],
  // "Prefere ligar?" da página de contato: contato da indústria
  contactPagePhones: ["(91) 9 8814-5471"],
  email: "vendas@acaimacunaima.com.br",
  address: "Travessa Benedito Miguel de Souza, 230 · Vila Nova, Inhangapi - PA",
  maps: "https://maps.app.goo.gl/RJcbERxXFCY5qc4K7",
  // Chat/WhatsApp do site (botão flutuante e formulário de pedido)
  whatsapp: "5591988145471",
  // Chaves do Web3Forms (web3forms.com): uma por e-mail que recebe os pedidos do formulário.
  // O plano grátis manda para um e-mail por chave, então cada destinatário tem a sua.
  // Chave vazia = esse e-mail ainda não recebe.
  formKeys: [
    { email: "vendas2@acaimacunaima.com.br", key: "f83356a2-618f-41cc-98f8-018564325d6d" },
    { email: "rogerio.almeida@acaimacunaima.com.br", key: "758af218-e86d-4734-a545-3bb0a25564f8" },
  ],
};

// Link do WhatsApp com a mensagem padrão do site. Aceita o número com máscara, ex. "(91) 3809-1101".
export const whatsappMessage: T = {
  pt: "Olá, vim através do site e gostaria de mais informações para compra no atacado.",
  en: "Hello, I found you through the website and would like information about wholesale purchases.",
};
export function whatsappLink(phone: string, message = whatsappMessage.pt) {
  const d = phone.replace(/\D/g, "");
  return `https://wa.me/${d.startsWith("55") && d.length > 11 ? d : `55${d}`}?text=${encodeURIComponent(message)}`;
}

// Página /links (link da bio do Instagram): Site, Comercial/WhatsApp e Cadastro
export const bioLinks: { kind: "site" | "whatsapp" | "cadastro"; label: T; detail: T; href: string }[] = [
  {
    kind: "site",
    label: { pt: "Site", en: "Website" },
    detail: { pt: "acaimacunaima.com.br", en: "acaimacunaima.com.br" },
    href: "/",
  },
  {
    kind: "whatsapp",
    label: { pt: "Comercial / WhatsApp", en: "Sales / WhatsApp" },
    detail: { pt: "Fale com a equipe comercial", en: "Talk to our sales team" },
    href: whatsappLink(contact.whatsapp, "Olá, vim pelo Instagram e quero falar com o comercial da Macunaíma."),
  },
  {
    kind: "cadastro",
    label: { pt: "Cadastro", en: "Registration" },
    detail: { pt: "Cadastre sua empresa · compras no atacado", en: "Register your company · wholesale only" },
    href: "/contato",
  },
];

// Contatos comerciais B2B (carrossel da Home e página "Onde nos encontrar")
export type Unit = {
  slug: string;
  city: string;
  uf: string;
  country: T;
  kind: T;
  name: string;
  segment: T;
  address?: string;
  phone?: string; // número exibido; o botão de WhatsApp usa este mesmo número
  maps?: string;
  url?: string;
  products: T[];
};

export const units: Unit[] = [
  {
    slug: "inhangapi",
    city: "Inhangapi",
    uf: "PA",
    country: { pt: "Brasil", en: "Brazil" },
    kind: { pt: "Matriz · Indústria", en: "Headquarters · Plant" },
    name: "Agroindústria Açaí Macunaíma",
    segment: { pt: "Atacado direto da indústria", en: "Wholesale direct from the plant" },
    address: "Travessa Benedito Miguel de Souza, 230 · Vila Nova, Inhangapi - PA",
    phone: "(91) 9 8814-5471",
    maps: "https://maps.app.goo.gl/RJcbERxXFCY5qc4K7",
    products: [
      { pt: "Açaí 8%", en: "Açaí 8%" },
      { pt: "Açaí 12%", en: "Açaí 12%" },
      { pt: "Açaí 14%", en: "Açaí 14%" },
      { pt: "Linha Sorbet", en: "Sorbet line" },
    ],
  },
  {
    slug: "recife",
    city: "Recife",
    uf: "PE",
    country: { pt: "Brasil", en: "Brazil" },
    kind: { pt: "Distribuidor B2B", en: "B2B distributor" },
    name: "Açaí Distribuidora",
    segment: { pt: "Atacado · Nordeste", en: "Wholesale · Northeast Brazil" },
    address: "Av. Getúlio Vargas, 635 · Curado, Recife - PE",
    phone: "(81) 8805-5937",
    maps: "https://www.google.com/maps/search/?api=1&query=Av.+Get%C3%BAlio+Vargas,+635+-+Curado,+Recife+-+PE",
    products: [
      { pt: "Creme de açaí · balde", en: "Açaí cream · bucket" },
      { pt: "Açaí 12%", en: "Açaí 12%" },
      { pt: "Açaí 14%", en: "Açaí 14%" },
    ],
  },
  {
    slug: "fortaleza",
    city: "Fortaleza",
    uf: "CE",
    country: { pt: "Brasil", en: "Brazil" },
    kind: { pt: "Distribuidor B2B", en: "B2B distributor" },
    name: "Açaí Distribuidora",
    segment: { pt: "Atacado · Nordeste", en: "Wholesale · Northeast Brazil" },
    address: "Rua E, 92 · Cajazeiras, Fortaleza - CE · 60864-467",
    phone: "(91) 8545-7504",
    maps: "https://www.google.com/maps/search/?api=1&query=Rua+E+92+Cajazeiras+60864-467+Fortaleza+CE",
    products: [
      { pt: "Creme de açaí · balde", en: "Açaí cream · bucket" },
      { pt: "Açaí 12%", en: "Açaí 12%" },
      { pt: "Açaí 14%", en: "Açaí 14%" },
    ],
  },
];

// Marca parceira para exportação nos Estados Unidos.
// Botões só aparecem quando o campo está preenchido. Telefone nos EUA (ligação, não WhatsApp).
export const tropicalAcai = {
  name: "Tropical Açaí",
  kind: { pt: "Exportação · Estados Unidos", en: "Export · United States" },
  text: {
    pt: "Marca da Macunaíma para o mercado norte-americano. Contato direto para importadores e distribuidores nos EUA.",
    en: "Macunaíma's brand for the North American market. Direct contact for importers and distributors in the USA.",
  },
  url: "https://www.tropicalacai.com/contact-us/",
  phone: "(321) 945-0700",
  phoneIntl: "+13219450700",
  email: "",
};

// Selos de certificação (cores originais) com a explicação exibida no hover/clique
export const seals: { src: string; alt: string; w: number; h: number; name: string; text: T }[] = [
  {
    src: "/selos/fssc-22000.png",
    alt: "Certificação FSSC 22000",
    w: 1131,
    h: 208,
    name: "FSSC 22000",
    text: {
      pt: "Certificação do sistema de gestão de segurança de alimentos, reconhecida pela GFSI (Global Food Safety Initiative).",
      en: "Food safety management system certification recognized by the GFSI (Global Food Safety Initiative).",
    },
  },
  {
    src: "/selos/organico-brasil.png",
    alt: "Produto Orgânico Brasil",
    w: 310,
    h: 146,
    name: "Orgânico Brasil",
    text: {
      pt: "Selo do Sistema Brasileiro de Avaliação da Conformidade Orgânica (SisOrg), do Ministério da Agricultura.",
      en: "Brazilian organic conformity seal (SisOrg), issued under the Ministry of Agriculture.",
    },
  },
  {
    src: "/selos/usda-organic.png",
    alt: "USDA Organic",
    w: 500,
    h: 500,
    name: "USDA Organic",
    text: {
      pt: "Certificação orgânica do Departamento de Agricultura dos Estados Unidos (National Organic Program).",
      en: "Organic certification of the United States Department of Agriculture (National Organic Program).",
    },
  },
  {
    src: "/selos/organico-ue.png",
    alt: "Agricultura biológica da União Europeia",
    w: 500,
    h: 333,
    name: "Orgânico UE",
    text: {
      pt: "Logotipo de produção orgânica da União Europeia, exigido para comercializar orgânicos no bloco.",
      en: "European Union organic production logo, required to sell organic products in the EU.",
    },
  },
  {
    src: "/selos/non-gmo.png",
    alt: "Non GMO Project Verified",
    w: 666,
    h: 489,
    name: "Non-GMO Project",
    text: {
      pt: "Verificação independente de que o produto atende ao padrão do Non-GMO Project para não transgênicos.",
      en: "Independent verification that the product meets the Non-GMO Project standard.",
    },
  },
  {
    src: "/selos/bdk-kosher.png",
    alt: "BDK Kosher Parve",
    w: 604,
    h: 278,
    name: "BDK Kosher",
    text: {
      pt: "Certificação kosher BDK na categoria parve: produto preparado conforme as leis dietéticas judaicas, sem carne e sem leite.",
      en: "BDK kosher certification, parve category: prepared according to Jewish dietary laws, with no meat or dairy.",
    },
  },
  {
    src: "/selos/jas-ecocert.png",
    alt: "JAS Ecocert",
    w: 523,
    h: 308,
    name: "JAS · Ecocert",
    text: {
      pt: "Padrão orgânico japonês (Japanese Agricultural Standard), certificado pela Ecocert, para exportar orgânicos ao Japão.",
      en: "Japanese Agricultural Standard for organic products, certified by Ecocert, for exports to Japan.",
    },
  },
  {
    src: "/selos/canada-organic.png",
    alt: "Canada Organic Biologique",
    w: 805,
    h: 808,
    name: "Canada Organic",
    text: {
      pt: "Selo do regime de produtos orgânicos do Canadá (Canada Organic Regime).",
      en: "Seal of the Canada Organic Regime for organic products.",
    },
  },
  {
    src: "/selos/organico-mexico.png",
    alt: "Orgánico México",
    w: 720,
    h: 721,
    name: "Orgánico México",
    text: {
      pt: "Distintivo nacional de produtos orgânicos do México, regulado pelo SENASICA.",
      en: "Mexico's national organic product seal, regulated by SENASICA.",
    },
  },
];

// Linha Açaí: polpas
export const products: {
  slug: string;
  concentration: string;
  weight: string;
  photo: string;
  alt: T;
  text: T;
}[] = [
  {
    slug: "acai-8-1kg",
    concentration: "8%",
    weight: "1,02 kg",
    photo: "/produtos/acai-8-1kg.jpg",
    alt: { pt: "Embalagem de Açaí Macunaíma 8%, 1,02 kg", en: "Macunaíma Açaí 8% pack, 1.02 kg" },
    text: {
      pt: "Polpa de açaí 8%, indicada para consumo direto ou para a fabricação de outros produtos.",
      en: "8% açaí pulp, suitable for direct consumption or as an ingredient for other products.",
    },
  },
  {
    slug: "acai-12-1kg",
    concentration: "12%",
    weight: "1,02 kg",
    photo: "/produtos/acai-12-1kg.jpg",
    alt: { pt: "Embalagem de Açaí Macunaíma 12%, 1,02 kg", en: "Macunaíma Açaí 12% pack, 1.02 kg" },
    text: {
      pt: "Polpa de açaí 12%, mais encorpada, para bowls, cremes e preparos de food service.",
      en: "12% açaí pulp, with more body, for bowls, creams and food service preparations.",
    },
  },
  {
    slug: "acai-14-1kg",
    concentration: "14%",
    weight: "1,02 kg",
    photo: "/produtos/acai-14-1kg.jpg",
    alt: { pt: "Embalagem de Açaí Macunaíma 14%, 1,02 kg", en: "Macunaíma Açaí 14% pack, 1.02 kg" },
    text: {
      pt: "Polpa de açaí 14%, a maior concentração da linha, para quem busca cor, sabor e textura intensos.",
      en: "14% açaí pulp, the line's highest concentration, for intense color, flavor and texture.",
    },
  },
];

// Linha Sorbet (Produtos > Sorvete)
export const sorbetLine = {
  text: {
    pt: "Além da linha de açaí, a Macunaíma possui uma linha de Sorbet desenvolvida com frutas selecionadas e alta concentração de polpa.",
    en: "Besides its açaí line, Macunaíma offers a Sorbet line made with selected fruits and a high pulp concentration.",
  },
  packaging: { pt: "5 litros", en: "5 liters" },
};

export const sorbetBenefits: { key: "gluten" | "corantes" | "aromas" | "leite" | "gordura"; label: T }[] = [
  { key: "gluten", label: { pt: "Sem glúten", en: "Gluten-free" } },
  { key: "corantes", label: { pt: "Sem corantes", en: "No colorings" } },
  { key: "aromas", label: { pt: "Sem aromatizantes", en: "No flavorings" } },
  { key: "leite", label: { pt: "Sem leite", en: "Dairy-free" } },
  { key: "gordura", label: { pt: "Sem gordura hidrogenada", en: "No hydrogenated fat" } },
];

// bg/ink: cores do sabor
export const sorbets: { slug: string; name: T; bg: string; ink: string; src: string }[] = [
  { slug: "coco", name: { pt: "Coco", en: "Coconut" }, bg: "#EFE6D8", ink: "#22011a", src: "/sorbet/coco.jpg" },
  { slug: "manga", name: { pt: "Manga", en: "Mango" }, bg: "#F5A524", ink: "#22011a", src: "/sorbet/manga.jpg" },
  { slug: "maracuja", name: { pt: "Maracujá", en: "Passion fruit" }, bg: "#F0D33C", ink: "#22011a", src: "/sorbet/maracuja.jpg" },
  { slug: "pitaya", name: { pt: "Pitaya", en: "Pitaya" }, bg: "#C8175D", ink: "#ffffff", src: "/sorbet/pitaya.jpg" },
  { slug: "blue-magic", name: { pt: "Blue Magic", en: "Blue Magic" }, bg: "#2C5BD8", ink: "#ffffff", src: "/sorbet/blue-magic.jpg" },
];

// Presença: 22 estados e 4 continentes
export const markets: { region: T; countries: T[] }[] = [
  {
    region: { pt: "América do Norte", en: "North America" },
    countries: [
      { pt: "Estados Unidos", en: "United States" },
      { pt: "Canadá", en: "Canada" },
    ],
  },
  {
    region: { pt: "Europa", en: "Europe" },
    countries: [
      { pt: "Islândia", en: "Iceland" },
      { pt: "Inglaterra", en: "England" },
    ],
  },
  { region: { pt: "Ásia", en: "Asia" }, countries: [{ pt: "China", en: "China" }, { pt: "Japão", en: "Japan" }] },
  { region: { pt: "Oceania", en: "Oceania" }, countries: [{ pt: "Austrália", en: "Australia" }] },
];
