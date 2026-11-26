"use client";

import { useState } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { templateServiceCategories } from "@/lib/templates";
import type { Template } from "@/types/template";

type ContactModel = Pick<Template, "slug" | "name" | "category">;

type FieldName = "name" | "email" | "whatsapp" | "projectType" | "description";
type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type Errors = Partial<Record<FieldName, string>>;

const projectOptions = [
  { value: "profissionais", label: "Site profissional" },
  { value: "empresas", label: "Site empresarial" },
  { value: "campanhas", label: "Landing page para campanha" },
  { value: "indefinido", label: "Ainda não sei" },
];
const fieldClass = "mt-2 block min-h-12 w-full min-w-0 rounded-md border border-control-border bg-background px-3 py-3 text-base text-foreground aria-invalid:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";
const requiredMessages: Record<FieldName, string> = {
  name: "Informe seu nome.",
  email: "Informe seu e-mail.",
  whatsapp: "",
  projectType: "Selecione o tipo de projeto.",
  description: "Descreva sua ideia para o projeto.",
};

function ContactFields({ initialService, model }: { initialService: string; model?: ContactModel }) {
  const [errors, setErrors] = useState<Errors>({});

  function validate(field: FieldElement) {
    const name = field.name as FieldName;
    let message = "";
    if (field.required && !field.value.trim()) message = requiredMessages[name];
    else if (field.validity.typeMismatch) message = "Informe um e-mail válido, como nome@exemplo.com.";
    setErrors((previous) => ({ ...previous, [name]: message }));
  }

  function handleBlur(event: FocusEvent<FieldElement>) {
    validate(event.currentTarget);
  }

  function handleChange(event: ChangeEvent<FieldElement>) {
    if (errors[event.currentTarget.name as FieldName]) validate(event.currentTarget);
  }

  function fieldProps(name: FieldName) {
    return {
      id: `contact-${name}`,
      name,
      className: fieldClass,
      onBlur: handleBlur,
      onChange: handleChange,
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": `contact-${name}-error`,
    };
  }

  function errorMessage(name: FieldName) {
    return <p id={`contact-${name}-error`} aria-live="polite" className="mt-2 text-sm font-medium">{errors[name]}</p>;
  }

  return (
    <form onSubmit={(event) => event.preventDefault()} aria-label="Formulário de orçamento" aria-describedby="contact-unavailable" className="space-y-6">
      {model && <p className="rounded-md border border-border bg-surface p-4 text-sm">Modelo escolhido: <strong className="font-medium">{model.name}</strong>. Você pode alterar o tipo de projeto abaixo.</p>}
      <p className="text-sm text-muted-foreground">Os campos indicados como obrigatórios precisam ser preenchidos.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">Nome (obrigatório)</label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required />
          {errorMessage("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">E-mail (obrigatório)</label>
          <input {...fieldProps("email")} type="email" autoComplete="email" required />
          {errorMessage("email")}
        </div>
      </div>
      <div>
        <label htmlFor="contact-whatsapp" className="text-sm font-medium">WhatsApp (opcional)</label>
        <input {...fieldProps("whatsapp")} type="tel" autoComplete="tel" />
        {errorMessage("whatsapp")}
      </div>
      <div>
        <label htmlFor="contact-projectType" className="text-sm font-medium">Tipo de projeto (obrigatório)</label>
        <select {...fieldProps("projectType")} defaultValue={initialService} required>
          <option value="" disabled>Selecione uma opção</option>
          {projectOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
        {errorMessage("projectType")}
      </div>
      <div>
        <label htmlFor="contact-description" className="text-sm font-medium">Descrição do projeto (obrigatório)</label>
        <textarea {...fieldProps("description")} rows={6} required className={`${fieldClass} resize-y`} />
        {errorMessage("description")}
      </div>
      <div className="border-t border-border pt-6">
        <p id="contact-unavailable" className="text-sm text-muted-foreground">O envio pelo formulário estará disponível em breve.</p>
        <Button type="submit" disabled size="lg" aria-describedby="contact-unavailable" className="mt-4 w-full sm:w-auto">Solicitar orçamento</Button>
      </div>
    </form>
  );
}

export function ContactForm({ models = [] }: { models?: ContactModel[] }) {
  const searchParams = useSearchParams();
  const service = searchParams.get("servico") ?? "";
  const initialService = ["profissionais", "empresas", "campanhas"].includes(service) ? service : "";

  const model = models.find((item) => item.slug === searchParams.get("modelo"));

  return <ContactFields key={`${model?.slug ?? ""}:${initialService}`} initialService={model ? templateServiceCategories[model.category] : initialService} model={model} />;
}
