# Macunaíma — Redesign do site (v2)

Site estático pronto (HTML + CSS + JS puro, sem dependências).

## Abrir
Sirva a pasta com qualquer servidor estático (ex.: `npx serve .`) e abra `index.html`.

## Levar para o projeto Next.js (Vercel)
- `img/`, `media/`, `fonts/` → copiar para `public/`
- `styles.css` → importar no layout global
- `main.js` → carregar com `<Script strategy="afterInteractive">`
- Marcação de cada seção em `index.html` (comentários `<!-- ===== -->` separam as seções)
- Links internos preservados: /produtos/*, /estrutura, /processo-e-qualidade, /linha-sorbet

## v2
- Tipografia: Bricolage Grotesque (títulos e números) + Instrument Sans (textos, legendas, menus). Sem serifa.
- Conteúdo limitado a 1280 px de largura, centralizado (imagens de destaque continuam em tela cheia).
- Escala tipográfica reduzida em ~40%; corpo de texto 17 px / 1,65.

## Conteúdo
Textos, números e fatos são os do site atual. Pendências originais mantidas: e-mail e endereço [A CONFIRMAR].

## Notas técnicas
- Vídeos carregam só quando visíveis; imagens WebP 720/1600 px com lazy loading; fontes self-hosted.
- prefers-reduced-motion respeitado.
- Mapas: world-atlas (Natural Earth) e @svg-maps/brazil (CC BY 4.0).
- `_fonte/` contém os arquivos-fonte e o script de build.
