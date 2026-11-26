import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import type { Template } from "@/types/template";

export function TemplateGallery({ template }: { template: Template }) {
  const additionalImages = [...new Set(template.images)].filter((image) => image !== template.thumbnail);

  return (
    <Section aria-labelledby="preview-title" className="border-t border-border bg-surface">
      <Container>
        <Heading level="h2" id="preview-title">Prévia visual</Heading>
        <p className="mt-4 text-sm text-muted-foreground">Imagem de apresentação e prévias ilustrativas do modelo.</p>
        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-lg border border-border bg-background sm:aspect-video">
          <Image src={template.thumbnail} alt={`Visão principal do modelo ${template.name}`} fill unoptimized sizes="(min-width: 1200px) 1120px, 100vw" className="object-contain" />
        </div>
        {additionalImages.length > 0 && (
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {additionalImages.map((image, index) => (
              <li key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-background">
                <Image src={image} alt={`Prévia adicional ${index + 1} do modelo ${template.name}`} fill unoptimized sizes="(min-width: 1200px) 548px, (min-width: 768px) 50vw, 100vw" className="object-contain" />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
