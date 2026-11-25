// Produtos > Receitas: ideias de uso para food service. Textos sugeridos, sujeitos à aprovação do cliente.
import type { T } from "@/lib/i18n";

export type RecipeCategory = { slug: string; name: T };

export const recipeCategories: RecipeCategory[] = [
  { slug: "bowls-e-sorvetes", name: { pt: "Bowls e Sorvetes", en: "Bowls & Ice Creams" } },
  { slug: "sucos", name: { pt: "Sucos", en: "Juices" } },
  { slug: "nectares", name: { pt: "Néctares", en: "Nectars" } },
  { slug: "smoothies", name: { pt: "Smoothies", en: "Smoothies" } },
];

export type Recipe = {
  slug: string;
  category: string;
  title: T;
  product: T;
  yield: T;
  photo: string;
  alt: T;
  ingredients: { pt: string[]; en: string[] };
  steps: { pt: string[]; en: string[] };
};

export const recipes: Recipe[] = [
  {
    slug: "bowl-de-acai",
    category: "bowls-e-sorvetes",
    title: { pt: "Bowl de açaí cremoso", en: "Creamy açaí bowl" },
    product: { pt: "Açaí 14%", en: "Açaí 14%" },
    yield: { pt: "2 porções de 300 ml", en: "2 servings of 300 ml" },
    photo: "/aplicacoes/sorvetes-v3.png",
    alt: {
      pt: "Bolas de creme de açaí em tigela de cerâmica sobre palha trançada",
      en: "Scoops of açaí cream in a ceramic bowl on woven straw",
    },
    ingredients: {
      pt: [
        "400 g de polpa de açaí Macunaíma 14%, congelada",
        "1 banana congelada em rodelas",
        "30 ml de xarope de guaraná (ou açúcar a gosto)",
        "Coberturas: granola, banana, morango, leite em pó e mel",
      ],
      en: [
        "400 g Macunaíma 14% açaí pulp, frozen",
        "1 frozen banana, sliced",
        "30 ml guaraná syrup (or sugar to taste)",
        "Toppings: granola, banana, strawberry, powdered milk and honey",
      ],
    },
    steps: {
      pt: [
        "Quebre a polpa ainda congelada em pedaços.",
        "Bata no processador com a banana e o xarope, usando o mínimo de líquido, até obter um creme firme.",
        "Sirva em seguida na tigela e finalize com as coberturas.",
      ],
      en: [
        "Break the still-frozen pulp into pieces.",
        "Blend with the banana and syrup in a food processor, using as little liquid as possible, until thick and creamy.",
        "Serve immediately in a bowl and finish with the toppings.",
      ],
    },
  },
  {
    slug: "suco-de-acai",
    category: "sucos",
    title: { pt: "Suco de açaí", en: "Açaí juice" },
    product: { pt: "Açaí 8%", en: "Açaí 8%" },
    yield: { pt: "2 copos de 300 ml", en: "2 glasses of 300 ml" },
    photo: "/aplicacoes/sucos-v3.png",
    alt: { pt: "Copo alto de suco de açaí sobre mesa de madeira", en: "Tall glass of açaí juice on a wooden table" },
    ingredients: {
      pt: ["200 g de polpa de açaí Macunaíma 8%", "300 ml de água gelada", "Açúcar ou adoçante a gosto", "Gelo a gosto"],
      en: ["200 g Macunaíma 8% açaí pulp", "300 ml cold water", "Sugar or sweetener to taste", "Ice to taste"],
    },
    steps: {
      pt: [
        "Deixe a polpa descongelar parcialmente.",
        "Bata no liquidificador com a água e o açúcar por cerca de 1 minuto.",
        "Sirva em copos com gelo.",
      ],
      en: [
        "Let the pulp partially thaw.",
        "Blend with the water and sugar for about 1 minute.",
        "Serve in glasses with ice.",
      ],
    },
  },
  {
    slug: "nectar-de-acai-com-limao",
    category: "nectares",
    title: { pt: "Néctar de açaí com limão", en: "Açaí and lime nectar" },
    product: { pt: "Açaí 12%", en: "Açaí 12%" },
    yield: { pt: "750 ml", en: "750 ml" },
    photo: "/aplicacoes/nectares-v3.png",
    alt: {
      pt: "Copo de néctar de açaí sobre pedra, com frutos de açaí ao lado",
      en: "Glass of açaí nectar on stone, with açaí berries beside it",
    },
    ingredients: {
      pt: ["250 g de polpa de açaí Macunaíma 12%", "500 ml de água gelada", "60 g de açúcar", "Suco de ½ limão"],
      en: ["250 g Macunaíma 12% açaí pulp", "500 ml cold water", "60 g sugar", "Juice of ½ lime"],
    },
    steps: {
      pt: [
        "Bata a polpa com a água e o açúcar até dissolver bem.",
        "Acrescente o suco de limão e bata por mais alguns segundos.",
        "Coe, se preferir uma bebida mais leve, e sirva bem gelado.",
      ],
      en: [
        "Blend the pulp with the water and sugar until fully dissolved.",
        "Add the lime juice and blend for a few more seconds.",
        "Strain for a lighter drink, if you prefer, and serve well chilled.",
      ],
    },
  },
  {
    slug: "smoothie-de-acai-e-frutas-vermelhas",
    category: "smoothies",
    title: { pt: "Smoothie de açaí e frutas vermelhas", en: "Açaí and berry smoothie" },
    product: { pt: "Açaí 12%", en: "Açaí 12%" },
    yield: { pt: "2 copos de 300 ml", en: "2 glasses of 300 ml" },
    photo: "/aplicacoes/smoothies-v3.png",
    alt: {
      pt: "Copo de smoothie de açaí com canudo e tigela de frutos ao fundo",
      en: "Glass of açaí smoothie with a straw and a bowl of berries behind it",
    },
    ingredients: {
      pt: [
        "150 g de polpa de açaí Macunaíma 12%",
        "1 banana",
        "100 g de frutas vermelhas congeladas",
        "150 ml de leite ou bebida vegetal",
        "1 colher (sopa) de mel",
      ],
      en: [
        "150 g Macunaíma 12% açaí pulp",
        "1 banana",
        "100 g frozen berries",
        "150 ml milk or plant-based drink",
        "1 tablespoon honey",
      ],
    },
    steps: {
      pt: ["Coloque todos os ingredientes no liquidificador.", "Bata até ficar homogêneo e cremoso.", "Sirva em seguida."],
      en: ["Place all ingredients in the blender.", "Blend until smooth and creamy.", "Serve immediately."],
    },
  },
];
