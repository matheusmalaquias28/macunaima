import os,shutil,re
S='src';D='dist'
body=open(f'{S}/body.html').read()
body=body.replace('{{ICONS}}',open(f'{S}/icons.svg').read()).replace('{{WORLD}}',open(f'{S}/world.svg').read()).replace('{{BRAZIL}}',open(f'{S}/brazil.svg').read())
fonts='<link rel="preload" href="fonts/bricolage-grotesque.woff2" as="font" type="font/woff2" crossorigin>'
_old='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">'
title='<title>Macunaíma | Açaí da Amazônia, produzido no Pará para o mundo</title>'
head=f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
{title}
<meta name="description" content="Da origem do fruto à produção industrial, a Macunaíma transforma o açaí do Pará em produtos para empresas que precisam de qualidade, escala e consistência.">
<meta name="theme-color" content="#0c090b">
<link rel="icon" href="img/icon.svg" type="image/svg+xml">
<link rel="preload" as="image" href="media/hero-poster.jpg">
{fonts}
<link rel="stylesheet" href="styles.css">
<script defer src="main.js"></script>
</head>
<body>
'''
if os.path.exists(D): shutil.rmtree(D)
shutil.copytree('public',D)
shutil.copy(f'{S}/styles.css',D); shutil.copy(f'{S}/main.js',D)
open(f'{D}/index.html','w').write(head+body+'\n</body>\n</html>\n')
art=f'''{title}
<meta name="description" content="Redesign do site da Macunaíma">
{fonts}
<link rel="stylesheet" href="styles.css">
'''+body+'\n<script src="main.js"></script>\n'
open('artifact.html','w').write(art)
print('ok')
