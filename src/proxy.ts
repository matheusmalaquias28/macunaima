import { NextRequest, NextResponse } from "next/server";
import { contact, whatsappLink } from "@/lib/site";

// Chave única do modo manutenção: true = site fora do ar para o público.
// Para voltar ao ar, mude para false e dê push.
const MAINTENANCE_MODE = false;

const waLink = whatsappLink(contact.phones[0], "Olá, vi que o site está em manutenção e gostaria de falar com a equipe.");

const maintenanceHtml = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Macunaíma | Site em manutenção</title>
<meta name="robots" content="noindex" />
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: #4a0234;
    color: #ffffff;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    text-align: center;
  }
  main { max-width: 34rem; }
  p.eyebrow {
    margin: 0 0 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.8rem;
    font-weight: 600;
    color: #96ca65;
  }
  h1 {
    margin: 0 0 1rem;
    font-size: clamp(1.75rem, 5vw, 2.75rem);
    line-height: 1.15;
    font-weight: 700;
  }
  h1 em { color: #96ca65; font-style: normal; }
  p.lead {
    margin: 0 0 2rem;
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.75);
  }
  a.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 1.75rem;
    border-radius: 999px;
    background: #96ca65;
    color: #22011a;
    font-weight: 600;
    text-decoration: none;
    font-size: 0.95rem;
  }
  p.contact {
    margin-top: 1.75rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }
  p.contact a { color: rgba(255, 255, 255, 0.85); text-decoration: underline; }
</style>
</head>
<body>
<main>
  <p class="eyebrow">Macunaíma</p>
  <h1>Site em <em>manutenção.</em></h1>
  <p class="lead">Estamos fazendo uma atualização rápida. Voltamos ao ar em breve — enquanto isso, fale direto com a nossa equipe comercial.</p>
  <a class="btn" href="${waLink}">Falar no WhatsApp</a>
  <p class="contact">ou envie um e-mail para <a href="mailto:${contact.email}">${contact.email}</a></p>
</main>
</body>
</html>`;

export function proxy(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next();

  return new NextResponse(maintenanceHtml, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|mp4|woff2?|css|js)).*)",
  ],
};
