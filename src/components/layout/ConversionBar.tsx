import Link from "next/link";
import { contact } from "@/lib/site";

const whatsappHref = `https://wa.me/${contact.whatsapp}`;

export default function ConversionBar() {
  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-acai/10 bg-nevoa/95 pt-2.5 pl-[max(0.85rem,env(safe-area-inset-left))] pr-[max(0.85rem,env(safe-area-inset-right))] backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-lg items-center gap-2.5">
          <Link
            href="/contato"
            className="flex h-14 min-w-0 flex-1 items-center justify-center rounded-full bg-acai px-6 text-[0.98rem] font-semibold text-white shadow-[0_12px_32px_-12px_rgba(34,1,26,0.55)] transition-colors duration-500 hover:bg-acai-ink"
          >
            Fazer pedido
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-10px_rgba(18,140,70,0.7)] transition-transform duration-500 hover:scale-105"
          >
            <WhatsAppIcon className="size-6" />
          </a>
        </div>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed right-6 bottom-6 z-40 hidden size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-12px_rgba(18,140,70,0.65)] transition-transform duration-500 hover:scale-105 lg:grid"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.16h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.12.1-1.81-.11-.42-.13-.95-.3-1.64-.59-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.26.64-.38 1.02-.38.12 0 .23 0 .33.01.3.01.45.03.65.5.24.57.82 2 .89 2.15.07.14.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.41.48-.14.13-.28.28-.12.54.16.26.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}
