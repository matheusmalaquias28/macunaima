import Hero from "@/components/sections/Hero";
import Certifications from "@/components/sections/Certifications";
import Industry from "@/components/sections/Industry";
import Purpose from "@/components/sections/Purpose";
import InstitutionalVideo from "@/components/sections/InstitutionalVideo";
import Products from "@/components/sections/Products";
import Applications from "@/components/sections/Applications";
import Origin from "@/components/sections/Origin";
import Harvest from "@/components/sections/Harvest";
import Quality from "@/components/sections/Quality";
import World from "@/components/sections/World";
import Relationships from "@/components/sections/Relationships";
import Sorbet from "@/components/sections/Sorbet";
import FinalCta from "@/components/sections/FinalCta";
import { heroSlides } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Macunaíma | Polpa de açaí da Amazônia para empresas",
  absoluteTitle: true,
  description:
    "Indústria de polpa de açaí no Pará. Açaí 8%, 12% e 14% e Linha Sorbet para distribuidores, açaiterias, indústrias e food service, com qualidade e escala.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero slides={heroSlides} />
      <Certifications />
      <div className="bg-padrao">
        <Industry />
      </div>
      <Purpose />
      <InstitutionalVideo />
      <Products />
      <Applications />
      <Origin />
      <Harvest />
      <Quality />
      <World />
      <Relationships />
      <Sorbet />
      <FinalCta />
    </>
  );
}
