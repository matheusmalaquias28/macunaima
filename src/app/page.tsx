import Hero from "@/components/sections/Hero";
import Certifications from "@/components/sections/Certifications";
import Industry from "@/components/sections/Industry";
import Purpose from "@/components/sections/Purpose";
import AcaiWord from "@/components/sections/AcaiWord";
import Products from "@/components/sections/Products";
import Applications from "@/components/sections/Applications";
import Origin from "@/components/sections/Origin";
import Harvest from "@/components/sections/Harvest";
import Quality from "@/components/sections/Quality";
import World from "@/components/sections/World";
import Relationships from "@/components/sections/Relationships";
import Sorbet from "@/components/sections/Sorbet";
import FinalCta from "@/components/sections/FinalCta";

// Quando os vídeos estiverem prontos, salve em public/video e informe o caminho aqui.
const HERO_VIDEO: string | undefined = undefined; // "/video/hero.mp4"
const HERO_YOUTUBE_ID = "ctjxznmqRV0"; // tem prioridade sobre HERO_VIDEO

export default function Home() {
  return (
    <>
      <Hero videoSrc={HERO_VIDEO} youtubeId={HERO_YOUTUBE_ID} />
      <Certifications />
      <div className="bg-padrao">
        <Industry />
      </div>
      <Purpose />
      <AcaiWord />
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
