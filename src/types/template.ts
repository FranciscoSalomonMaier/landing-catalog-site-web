export type TemplateCategory = "profissionais" | "empresas" | "campanhas" | "saas";

export interface Template {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: TemplateCategory;
  thumbnail: string;
  images: string[];
  demoUrl?: string;
  features: string[];
  active: boolean;
}
