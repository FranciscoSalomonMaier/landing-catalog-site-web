import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateDetails } from "@/components/templates/TemplateDetails";
import { templates } from "@/data/templates";
import { getTemplateBySlug, getTemplateSlugs, templateCategoryLabels } from "@/lib/templates";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getTemplateSlugs(templates);
  // Esta versão do export também exige um parâmetro com catálogo vazio.
  // O marcador técnico resulta em notFound(), nunca em um modelo fictício.
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "__empty__" }];
}

export async function generateMetadata({ params }: PageProps<"/modelos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(templates, slug);
  if (!template) notFound();
  const title = template.category === "saas"
    ? `${template.name} — Landing Page para ${templateCategoryLabels[template.category]} | Estúdio Web`
    : `${template.name} | Estúdio Web`;
  const url = `https://landing-catalog.web.app/modelos/${encodeURIComponent(template.slug)}/`;
  return {
    title,
    description: template.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description: template.description,
      url,
      images: [{ url: new URL(template.thumbnail, "https://landing-catalog.web.app").href, alt: `Apresentação do modelo ${template.name}` }],
    },
  };
}

export default async function TemplatePage({ params }: PageProps<"/modelos/[slug]">) {
  const { slug } = await params;
  const template = getTemplateBySlug(templates, slug);
  if (!template) notFound();
  return <TemplateDetails template={template} />;
}
