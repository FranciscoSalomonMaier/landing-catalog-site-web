import type { Template, TemplateCategory } from "@/types/template";

export const templateCategoryLabels: Record<TemplateCategory, string> = {
  profissionais: "Profissionais",
  empresas: "Empresas",
  campanhas: "Campanhas e vendas",
  saas: "SaaS e Tecnologia",
};

// Categorias de catálogo podem ser mais específicas que os serviços contratáveis.
export const templateServiceCategories: Record<TemplateCategory, "profissionais" | "empresas" | "campanhas"> = {
  profissionais: "profissionais",
  empresas: "empresas",
  campanhas: "campanhas",
  saas: "empresas",
};

export function getActiveTemplates(templates: readonly Template[]): Template[] {
  return templates.filter((template) => template.active);
}

export function filterTemplatesByCategory<T extends { category: TemplateCategory }>(
  templates: readonly T[], category: TemplateCategory | "todos",
): T[] {
  return templates.filter((template) => category === "todos" || template.category === category);
}

export function getTemplateBySlug(templates: readonly Template[], slug: string): Template | undefined {
  return getActiveTemplates(templates).find((template) => template.slug === slug);
}

export function getTemplateSlugs(templates: readonly Template[]): string[] {
  return getActiveTemplates(templates).map((template) => template.slug);
}
