"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { filterTemplatesByCategory, templateCategoryLabels } from "@/lib/templates";
import type { TemplateCategory } from "@/types/template";

type CatalogItem = { id: string; category: TemplateCategory; content: ReactNode };
const filters = ["todos", ...(Object.keys(templateCategoryLabels) as TemplateCategory[])] as const;

export function TemplateFilters({ items, emptyState }: { items: CatalogItem[]; emptyState: ReactNode }) {
  const [category, setCategory] = useState<TemplateCategory | "todos">("todos");
  const visible = filterTemplatesByCategory(items, category);

  return (
    <div>
      <div role="group" aria-label="Filtrar modelos por categoria" className="flex flex-wrap gap-2">
        {filters.map((value) => (
          <Button key={value} variant={category === value ? "primary" : "outline"} aria-pressed={category === value} aria-controls="template-results" onClick={() => setCategory(value)}>
            {value === "todos" ? "Todos" : templateCategoryLabels[value]}
          </Button>
        ))}
      </div>
      <p role="status" className="mt-6 text-sm text-muted-foreground">
        {visible.length} {visible.length === 1 ? "modelo disponível" : "modelos disponíveis"} · {category === "todos" ? "Todos" : templateCategoryLabels[category]}
      </p>
      <div id="template-results" className="mt-8">
        {items.length === 0 ? emptyState : visible.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
            <Heading level="h3">Nenhum modelo disponível nesta categoria.</Heading>
            <Button variant="outline" className="mt-6" onClick={() => setCategory("todos")}>Visualizar todos os modelos</Button>
          </div>
        ) : (
          <TemplateGrid>{visible.map(({ id, content }) => <li key={id} className="min-w-0">{content}</li>)}</TemplateGrid>
        )}
      </div>
    </div>
  );
}
