"use client";

import { useState, useSyncExternalStore } from "react";
import { Arrow } from "@/components/ui/Button";
import { useLang } from "@/components/i18n/LangProvider";
import { contact, products } from "@/lib/site";

// Somente compradores do atacado (B2B): sem a opção Varejo
const businessTypes = {
  pt: ["Distribuidor", "Açaiteria / Franquia", "Indústria", "Food Service", "Outro"],
  en: ["Distributor", "Açaí shop / Franchise", "Industry", "Food Service", "Other"],
};

const copy = {
  pt: {
    notSure: "Ainda não sei",
    sorbet: "Sorbet (potes de 5 litros)",
    other: "Outras embalagens / baldes",
    quantities: ["A partir de 1.000 kg (1 tonelada)", "15 toneladas", "Mais de 30 toneladas"],
    errors: {
      nome: "Informe seu nome.",
      empresa: "Informe o nome da empresa.",
      cnpj: "Informe um CNPJ válido.",
      whatsapp: "Informe um WhatsApp com DDD.",
      email: "Informe um e-mail válido.",
      local: "Informe cidade, estado e país.",
      tipo: "Escolha o tipo de negócio.",
      produtos: "Escolha ao menos uma opção.",
    },
    greeting: "Olá! Quero comprar no atacado com a Macunaíma.",
    f: {
      nome: "Nome",
      empresa: "Empresa",
      cnpj: "CNPJ",
      whatsapp: "WhatsApp",
      email: "E-mail",
      local: "Onde está",
      tipo: "Tipo de negócio",
      produtos: "Produtos de interesse",
      quantidade: "Quantidade",
    },
    sent: {
      eyebrow: "Quase lá",
      title: "Sua mensagem está pronta no WhatsApp.",
      text: "Abrimos uma conversa com a equipe comercial com os seus dados. É só tocar em enviar. Se a janela não abriu, use o botão abaixo.",
      open: "Abrir WhatsApp",
      edit: "Editar dados",
    },
    legends: ["Seus dados", "Sobre o seu negócio", "O que você procura?"],
    labels: {
      nome: "Nome",
      empresa: "Nome da empresa",
      cnpj: "CNPJ",
      whatsapp: "WhatsApp",
      email: "E-mail",
      local: "Onde sua empresa está?",
      localPh: "Cidade / Estado / País",
      tipo: "Qual é o seu tipo de negócio?",
      produtos: "Qual produto você tem interesse?",
      quantidade: "Qual quantidade você pretende comprar?",
    },
    required: "* Campos obrigatórios",
    submit: "Quero falar com a Macunaíma",
  },
  en: {
    notSure: "Not sure yet",
    sorbet: "Sorbet (5-liter tubs)",
    other: "Other packs / buckets",
    quantities: ["From 1,000 kg (1 ton)", "15 tons", "More than 30 tons"],
    errors: {
      nome: "Please enter your name.",
      empresa: "Please enter the company name.",
      cnpj: "Please enter a valid company ID (CNPJ).",
      whatsapp: "Please enter a WhatsApp number with area code.",
      email: "Please enter a valid e-mail.",
      local: "Please enter city, state and country.",
      tipo: "Choose your type of business.",
      produtos: "Choose at least one option.",
    },
    greeting: "Hello! I'd like to buy wholesale from Macunaíma.",
    f: {
      nome: "Name",
      empresa: "Company",
      cnpj: "Company ID",
      whatsapp: "WhatsApp",
      email: "E-mail",
      local: "Location",
      tipo: "Business type",
      produtos: "Products of interest",
      quantidade: "Quantity",
    },
    sent: {
      eyebrow: "Almost there",
      title: "Your message is ready on WhatsApp.",
      text: "We opened a chat with our sales team with your details. Just tap send. If the window didn't open, use the button below.",
      open: "Open WhatsApp",
      edit: "Edit details",
    },
    legends: ["Your details", "About your business", "What are you looking for?"],
    labels: {
      nome: "Name",
      empresa: "Company name",
      cnpj: "Company ID (CNPJ)",
      whatsapp: "WhatsApp",
      email: "E-mail",
      local: "Where is your company located?",
      localPh: "City / State / Country",
      tipo: "What is your type of business?",
      produtos: "Which products are you interested in?",
      quantidade: "How much do you plan to buy?",
    },
    required: "* Required fields",
    submit: "Talk to Macunaíma",
  },
};

type Errors = Partial<Record<"nome" | "empresa" | "cnpj" | "whatsapp" | "email" | "local" | "tipo" | "produtos", string>>;

const digits = (v: string) => v.replace(/\D/g, "");
const noopSubscribe = () => () => {};

// CNPJ alfanumérico (a partir de jul/2026): 12 caracteres [0-9A-Z] + 2 dígitos verificadores
const cnpjChars = (v: string) => v.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 14);
function maskCnpj(v: string) {
  const c = cnpjChars(v);
  return [c.slice(0, 2), c.slice(2, 5), c.slice(5, 8)].filter(Boolean).join(".") + (c.length > 8 ? `/${c.slice(8, 12)}` : "") + (c.length > 12 ? `-${c.slice(12)}` : "");
}
function validCnpj(v: string) {
  const c = cnpjChars(v);
  if (!/^[0-9A-Z]{12}\d{2}$/.test(c) || /^(.)\1+$/.test(c)) return false;
  const dv = (len: number) => {
    const weights = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, w, i) => acc + (c.charCodeAt(i) - 48) * w, 0);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return dv(12) === Number(c[12]) && dv(13) === Number(c[13]);
}

function maskPhone(v: string) {
  const d = digits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// O pedido segue como mensagem pronta para o WhatsApp comercial
const salesWhatsApp = contact.whatsapp;

// Cópia do pedido por e-mail via Web3Forms, uma chamada por destinatário. Roda em segundo
// plano: se falhar, o WhatsApp já foi aberto e o visitante não fica travado.
function sendByEmail(fields: Record<string, string>) {
  for (const { key } of contact.formKeys) {
    if (!key) continue;
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      keepalive: true,
      body: JSON.stringify({
        access_key: key,
        subject: `Novo pedido pelo site: ${fields.Empresa}`,
        from_name: "Site Macunaíma",
        ...(fields["E-mail"] !== "—" ? { replyto: fields["E-mail"] } : {}),
        ...fields,
      }),
    }).catch(() => {});
  }
}

export default function ContactForm() {
  const lang = useLang();
  const t = copy[lang];
  const productOptions = [
    ...products.map((p) => `Açaí ${p.concentration} — ${lang === "en" ? p.weight.replace(",", ".") : p.weight}`),
    t.sorbet,
    t.other,
    t.notSure,
  ];

  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  // Botões "Solicitar cotação" chegam com ?produto=... e já marcam o produto (até o visitante mexer na escolha)
  const fromQuery = useSyncExternalStore(noopSubscribe, () => new URLSearchParams(window.location.search).get("produto") ?? "", () => "");
  const [chosen, setChosen] = useState<string[] | null>(null);
  const queryOption = (() => {
    if (!fromQuery) return null;
    const i = products.findIndex((p) => p.slug === fromQuery);
    return i >= 0 ? productOptions[i] : fromQuery.startsWith("sorbet") ? t.sorbet : fromQuery === "baldes" ? t.other : null;
  })();
  const picked = chosen ?? (queryOption ? [queryOption] : []);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);


  const clear = (k: keyof Errors) => setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  // "Ainda não sei" é exclusivo: marcá-lo limpa os produtos, e marcar um produto o desmarca
  const toggleProduct = (opt: string) => {
    clear("produtos");
    const cur = picked;
    if (cur.includes(opt)) setChosen(cur.filter((o) => o !== opt));
    else if (opt === t.notSure) setChosen([t.notSure]);
    else setChosen([...cur.filter((o) => o !== t.notSure), opt]);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("nome")) next.nome = t.errors.nome;
    if (!get("empresa")) next.empresa = t.errors.empresa;
    if (!validCnpj(cnpj)) next.cnpj = t.errors.cnpj;
    if (![10, 11].includes(digits(phone).length)) next.whatsapp = t.errors.whatsapp;
    if (get("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = t.errors.email;
    if (!get("local")) next.local = t.errors.local;
    if (!get("tipo")) next.tipo = t.errors.tipo;
    if (!picked.length) next.produtos = t.errors.produtos;
    setErrors(next);

    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const lines = [
      t.greeting,
      "",
      `*${t.f.nome}:* ${get("nome")}`,
      `*${t.f.empresa}:* ${get("empresa")}`,
      `*${t.f.cnpj}:* ${cnpj}`,
      `*${t.f.whatsapp}:* ${phone}`,
      get("email") ? `*${t.f.email}:* ${get("email")}` : null,
      `*${t.f.local}:* ${get("local")}`,
      `*${t.f.tipo}:* ${get("tipo")}`,
      `*${t.f.produtos}:* ${picked.join(", ")}`,
      get("quantidade") ? `*${t.f.quantidade}:* ${get("quantidade")}` : null,
    ].filter((l) => l !== null);
    const url = `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    sendByEmail({
      Nome: get("nome"),
      Empresa: get("empresa"),
      CNPJ: cnpj,
      WhatsApp: phone,
      "E-mail": get("email") || "—",
      "Onde está": get("local"),
      "Tipo de negócio": get("tipo"),
      "Produtos de interesse": picked.join(", "),
      Quantidade: get("quantidade") || "—",
      Idioma: lang === "en" ? "Inglês (site em inglês)" : "Português",
    });
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div className="rounded-[1.5rem] bg-nevoa p-8 md:p-12" role="status">
        <p className="caption text-acai">{t.sent.eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1] tracking-[-0.025em] text-acai-ink">{t.sent.title}</h2>
        <p className="mt-4 max-w-md text-acai-ink/70">{t.sent.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center gap-3 rounded-full bg-acai pl-6 pr-5 font-semibold text-white transition-colors hover:bg-acai-ink"
          >
            {t.sent.open} <Arrow className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setSentUrl(null)}
            className="h-13 rounded-full border border-acai-ink/20 px-6 font-semibold text-acai-ink transition-colors hover:border-acai-ink"
          >
            {t.sent.edit}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-[clamp(40px,5vw,64px)]">
      <Fieldset legend={t.legends[0]}>
        <div className="grid gap-x-5 gap-y-6 md:grid-cols-2">
          <Field label={t.labels.nome} name="nome" required error={errors.nome} onInput={() => clear("nome")} autoComplete="name" />
          <Field label={t.labels.empresa} name="empresa" required error={errors.empresa} onInput={() => clear("empresa")} autoComplete="organization" />
          <Field
            label={t.labels.cnpj}
            name="cnpj"
            required
            error={errors.cnpj}
            value={cnpj}
            onChange={(v) => {
              setCnpj(maskCnpj(v));
              clear("cnpj");
            }}
            placeholder="00.000.000/0000-00"
            autoCapitalize="characters"
          />
          <Field
            label={t.labels.whatsapp}
            name="whatsapp"
            required
            error={errors.whatsapp}
            value={phone}
            onChange={(v) => {
              setPhone(maskPhone(v));
              clear("whatsapp");
            }}
            placeholder="(00) 00000-0000"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
          />
          <div className="md:col-span-2">
            <Field label={t.labels.email} name="email" type="email" error={errors.email} onInput={() => clear("email")} autoComplete="email" />
          </div>
        </div>
      </Fieldset>

      <Fieldset legend={t.legends[1]}>
        <div className="grid gap-8">
          <Field label={t.labels.local} name="local" required error={errors.local} onInput={() => clear("local")} placeholder={t.labels.localPh} />
          <ChoiceGroup label={t.labels.tipo} required error={errors.tipo}>
            {businessTypes[lang].map((b) => (
              <Choice key={b} type="radio" name="tipo" value={b} onChange={() => clear("tipo")} />
            ))}
          </ChoiceGroup>
        </div>
      </Fieldset>

      <Fieldset legend={t.legends[2]}>
        <div className="grid gap-8">
          <ChoiceGroup label={t.labels.produtos} required error={errors.produtos}>
            {productOptions.map((p) => (
              <Choice key={p} type="checkbox" name="produtos" value={p} checked={picked.includes(p)} onChange={() => toggleProduct(p)} />
            ))}
          </ChoiceGroup>
          <ChoiceGroup label={t.labels.quantidade}>
            {t.quantities.map((q) => (
              <Choice key={q} type="radio" name="quantidade" value={q} />
            ))}
          </ChoiceGroup>
        </div>
      </Fieldset>

      <div className="flex flex-col gap-4 border-t border-acai-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-acai-ink/55">{t.required}</p>
        <button
          type="submit"
          className="group inline-flex h-16 items-center justify-between gap-4 rounded-full bg-acai pl-8 pr-3 font-semibold text-white transition-colors duration-500 hover:bg-acai-ink"
        >
          {t.submit}
          <span className="grid size-11 place-items-center rounded-full bg-white/10 transition-transform duration-500 group-hover:rotate-[-45deg]">
            <Arrow className="size-4" />
          </span>
        </button>
      </div>
    </form>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="caption mb-6 flex w-full items-center gap-3 border-b border-acai-ink/10 pb-4 text-acai">
        <span className="h-px w-7 bg-current opacity-70" />
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

const Req = () => (
  <span aria-hidden="true" className="text-acai">
    *
  </span>
);

function Field({
  label,
  name,
  required,
  error,
  value,
  onChange,
  onInput,
  ...rest
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (v: string) => void;
  onInput?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onInput" | "value">) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.95rem] font-semibold text-acai-ink">
        {label}
        {required && <Req />}
      </label>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        {...(value !== undefined ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) } : {})}
        onInput={onInput}
        className={`h-13 w-full rounded-xl border bg-creme px-4 text-acai-ink outline-none transition-colors placeholder:text-acai-ink/35 focus:border-acai focus:bg-white ${
          error ? "border-red-600" : "border-acai-ink/15"
        }`}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function ChoiceGroup({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label}>
      <p className="mb-3 text-[0.95rem] font-semibold text-acai-ink">
        {label}
        {required && <Req />}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

// Opção em formato de pílula; o input nativo fica acessível (teclado e leitor de tela)
function Choice({
  type,
  name,
  value,
  checked,
  onChange,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <label className="cursor-pointer">
      <input type={type} name={name} value={value} {...(checked !== undefined ? { checked } : {})} onChange={onChange} className="peer sr-only" />
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border border-acai-ink/15 bg-white px-4 py-2.5 text-[0.95rem] font-medium text-acai-ink transition-colors hover:border-acai-ink/40 peer-checked:border-acai peer-checked:bg-acai peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-folha peer-checked:[&>i]:border-white peer-checked:[&>i]:bg-white`}
      >
        <i aria-hidden="true" className={`size-3 shrink-0 border border-acai-ink/30 ${type === "radio" ? "rounded-full" : "rounded-[2px]"}`} />
        {value}
      </span>
    </label>
  );
}
