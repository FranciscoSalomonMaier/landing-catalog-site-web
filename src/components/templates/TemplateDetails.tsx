import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { templateCategoryLabels } from "@/lib/templates";
import type { Template } from "@/types/template";

export function TemplateDetails({ template }: { template: Template }) {
  const contactUrl = `/contato?modelo=${encodeURIComponent(template.slug)}`;
  return (
    <>
      <Section spacing="lg" aria-labelledby="template-title">
        <Container>
          <Link href="/modelos" className="inline-flex min-h-11 items-center text-sm underline text-primary transition-colors hover:text-primary-hover">Voltar aos modelos</Link>
          <div className="mt-6 max-w-reading">
            <div className="flex flex-wrap gap-2">
              <Badge>{templateCategoryLabels[template.category]}</Badge>
              {template.active && <Badge bordered>Disponível</Badge>}
            </div>
            <Heading id="template-title" className="mt-6 text-balance">{template.name}</Heading>
            <p className="mt-6 text-muted-foreground sm:text-lg">{template.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={contactUrl} className={buttonStyles({ size: "lg" })}>Solicitar orçamento</Link>
              {template.demoUrl && (
                <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: "outline", size: "lg" })}>
                  Ver demonstração<span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
            </div>
          </div>
        </Container>
      </Section>
      <TemplateGallery template={template} />
      <Section aria-labelledby="features-title" className="border-t border-border">
        <Container>
          <Heading level="h2" id="features-title">Características</Heading>
          {template.features.length > 0 ? (
            <ul className="mt-8 max-w-reading list-disc space-y-3 pl-5 text-muted-foreground">
              {template.features.map((feature, index) => <li key={`${index}-${feature}`}>{feature}</li>)}
            </ul>
          ) : <p className="mt-6 text-muted-foreground">Entre em contato para conhecer as possibilidades deste modelo.</p>}
        </Container>
      </Section>
      <Section aria-labelledby="customization-title" className="border-t border-border">
        <Container>
          <div className="max-w-reading">
            <Heading level="h2" id="customization-title">Um modelo com a sua identidade.</Heading>
            <p className="mt-6 text-muted-foreground">Este modelo pode ser personalizado com suas informações, identidade visual, imagens e conteúdos, conforme o escopo contratado.</p>
            {template.category === "saas" && <p className="mt-4 text-sm text-muted-foreground">A contratação é da landing page personalizável, não do produto ou serviço ilustrado na demonstração. O software demonstrativo é fictício: não inclui backend, banco de dados, autenticação, processamento de pagamentos ou gestão real de projetos. Os planos e valores exibidos na demonstração não são preços de contratação da landing page.</p>}
          </div>
        </Container>
      </Section>
      <Section spacing="lg" aria-labelledby="template-contact-title" className="border-t border-border bg-surface">
        <Container>
          <div className="max-w-reading">
            <Heading level="h2" id="template-contact-title">Gostou deste modelo?</Heading>
            <p className="mt-6 text-muted-foreground">Entre em contato para solicitar uma proposta de personalização.</p>
            <Link href={contactUrl} className={buttonStyles({ size: "lg", className: "mt-8 w-full sm:w-auto" })}>Solicitar orçamento</Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
