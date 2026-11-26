import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { templateCategoryLabels } from "@/lib/templates";
import type { Template } from "@/types/template";

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Card href={`/modelos/${encodeURIComponent(template.slug)}`} className="h-full">
      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-md bg-surface">
        <Image src={template.thumbnail} alt={`Prévia do modelo ${template.name}`} fill unoptimized sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="object-contain" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>{templateCategoryLabels[template.category]}</Badge>
        {template.active && <Badge bordered>Disponível</Badge>}
      </div>
      <Heading level="h3" className="mt-4">{template.name}</Heading>
      <p className="mt-4 text-sm text-muted-foreground">{template.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline">Visualizar detalhes<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" focusable="false" /></span>
    </Card>
  );
}
