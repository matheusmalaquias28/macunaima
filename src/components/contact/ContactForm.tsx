"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui/Button";
import { contact, products } from "@/lib/site";

const businessTypes = ["Distribuidor", "Açaiteria / Franquia", "Indústria", "Food Service", "Varejo", "Outro"];
const NOT_SURE = "Ainda não sei";
const productOptions = [...products.map((p) => `Açaí ${p.concentration} — ${p.weight}`), "Sorbet", NOT_SURE];
const quantities = ["A partir de 1.000 kg (1 tonelada)", "15 toneladas", "Mais de 30 toneladas"];

type Errors = Partial<Record<"nome" | "empresa" | "cnpj" | "whatsapp" | "email" | "local" | "tipo" | "produtos", string>>;

const digits = (v: string) => v.replace(/\D/g, "");

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

export default function ContactForm() {
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const clear = (k: keyof Errors) => setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  // "Ainda não sei" é exclusivo: marcá-lo limpa os produtos, e marcar um produto o desmarca
  const toggleProduct = (opt: string) => {
    clear("produtos");
    setPicked((cur) => {
      if (cur.includes(opt)) return cur.filter((o) => o !== opt);
      if (opt === NOT_SURE) return [NOT_SURE];
      return [...cur.filter((o) => o !== NOT_SURE), opt];
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("nome")) next.nome = "Informe seu nome.";
    if (!get("empresa")) next.empresa = "Informe o nome da empresa.";
    if (!validCnpj(cnpj)) next.cnpj = "Informe um CNPJ válido.";
    if (![10, 11].includes(digits(phone).length)) next.whatsapp = "Informe um WhatsApp com DDD.";
    if (get("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Informe um e-mail válido.";
    if (!get("local")) next.local = "Informe cidade, estado e país.";
    if (!get("tipo")) next.tipo = "Escolha o tipo de negócio.";
    if (!picked.length) next.produtos = "Escolha ao menos uma opção.";
    setErrors(next);

    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const lines = [
      "Olá! Quero comprar com a Macunaíma.",
      "",
      `*Nome:* ${get("nome")}`,
      `*Empresa:* ${get("empresa")}`,
      `*CNPJ:* ${cnpj}`,
      `*WhatsApp:* ${phone}`,
      get("email") ? `*E-mail:* ${get("email")}` : null,
      `*Onde está:* ${get("local")}`,
      `*Tipo de negócio:* ${get("tipo")}`,
      `*Produtos de interesse:* ${picked.join(", ")}`,
      get("quantidade") ? `*Quantidade:* ${get("quantidade")}` : null,
    ].filter((l) => l !== null);
    const url = `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div className="rounded-[4px] bg-white p-8 md:p-12" role="status">
        <p className="caption text-acai-soft">Quase lá</p>
        <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1] tracking-[-0.025em] text-acai-ink">
          Sua mensagem está pronta no WhatsApp.
        </h2>
        <p className="mt-4 max-w-md text-acai-ink/70">
          Abrimos uma conversa com a equipe comercial com os seus dados. É só tocar em enviar. Se a janela não abriu, use o
          botão abaixo.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center gap-3 rounded-full bg-acai pl-6 pr-5 font-semibold text-white transition-colors hover:bg-acai-ink"
          >
            Abrir WhatsApp <Arrow className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setSentUrl(null)}
            className="h-13 rounded-full border border-acai-ink/20 px-6 font-semibold text-acai-ink transition-colors hover:border-acai-ink"
          >
            Editar dados
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-[clamp(40px,5vw,64px)]">
      <Fieldset legend="Seus dados">
        <div className="grid gap-x-5 gap-y-6 md:grid-cols-2">
          <Field label="Nome" name="nome" required error={errors.nome} onInput={() => clear("nome")} autoComplete="name" />
          <Field label="Nome da empresa" name="empresa" required error={errors.empresa} onInput={() => clear("empresa")} autoComplete="organization" />
          <Field
            label="CNPJ"
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
            label="WhatsApp"
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
            <Field label="E-mail" name="email" type="email" error={errors.email} onInput={() => clear("email")} autoComplete="email" />
          </div>
        </div>
      </Fieldset>

      <Fieldset legend="Sobre o seu negócio">
        <div className="grid gap-8">
          <Field
            label="Onde sua empresa está?"
            name="local"
            required
            error={errors.local}
            onInput={() => clear("local")}
            placeholder="Cidade / Estado / País"
          />
          <ChoiceGroup label="Qual é o seu tipo de negócio?" required error={errors.tipo}>
            {businessTypes.map((t) => (
              <Choice key={t} type="radio" name="tipo" value={t} onChange={() => clear("tipo")} />
            ))}
          </ChoiceGroup>
        </div>
      </Fieldset>

      <Fieldset legend="O que você procura?">
        <div className="grid gap-8">
          <ChoiceGroup label="Qual produto você tem interesse?" required error={errors.produtos}>
            {productOptions.map((p) => (
              <Choice key={p} type="checkbox" name="produtos" value={p} checked={picked.includes(p)} onChange={() => toggleProduct(p)} />
            ))}
          </ChoiceGroup>
          <ChoiceGroup label="Qual quantidade você pretende comprar?">
            {quantities.map((q) => (
              <Choice key={q} type="radio" name="quantidade" value={q} />
            ))}
          </ChoiceGroup>
        </div>
      </Fieldset>

      <div className="flex flex-col gap-4 border-t border-acai-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-acai-ink/55">* Campos obrigatórios</p>
        <button
          type="submit"
          className="group inline-flex h-16 items-center justify-between gap-4 rounded-full bg-acai pl-8 pr-3 font-semibold text-white transition-colors duration-500 hover:bg-acai-ink"
        >
          Quero falar com a Macunaíma
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
      <legend className="caption mb-6 flex w-full items-center gap-3 border-b border-acai-ink/10 pb-4 text-acai-soft">
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
        className={`h-13 w-full rounded-[4px] border bg-white px-4 text-acai-ink outline-none transition-colors placeholder:text-acai-ink/35 focus:border-acai ${
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
      <input
        type={type}
        name={name}
        value={value}
        {...(checked !== undefined ? { checked } : {})}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border border-acai-ink/15 bg-white px-4 py-2.5 text-[0.95rem] font-medium text-acai-ink transition-colors hover:border-acai-ink/40 peer-checked:border-acai peer-checked:bg-acai peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-folha peer-checked:[&>i]:border-white peer-checked:[&>i]:bg-white`}
      >
        <i aria-hidden="true" className={`size-3 shrink-0 border border-acai-ink/30 ${type === "radio" ? "rounded-full" : "rounded-[2px]"}`} />
        {value}
      </span>
    </label>
  );
}
