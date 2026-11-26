import type { Template } from "@/types/template";

export const templates: Template[] = [
  {
    id: "flowdesk",
    slug: "flowdesk",
    name: "FlowDesk",
    description: "Landing page moderna e profissional para apresentar softwares, plataformas SaaS e serviços digitais, destacando funcionalidades, benefícios e planos comerciais.",
    category: "saas",
    thumbnail: "/images/templates/flowdesk/cover.webp",
    images: ["/images/templates/flowdesk/dashboard.svg"],
    demoUrl: "https://landing-saas-demo.web.app",
    features: [
      "Design moderno e profissional.",
      "Layout responsivo.",
      "Identidade visual personalizável.",
      "Apresentação de funcionalidades.",
      "Seção de benefícios.",
      "Demonstração visual do produto.",
      "Seção de planos comerciais.",
      "Perguntas frequentes.",
      "Chamadas para ação.",
      "Estrutura preparada para SEO.",
      "Integração com canais de contato.",
    ],
    active: true,
  },
];

/* Exemplo exclusivamente fictício para orientar o cadastro. Não é renderizado.
{
  id: "exemplo-ficticio",
  slug: "exemplo-ficticio",
  name: "Modelo fictício — substituir antes de publicar",
  description: "Descrição ilustrativa; substituir pelos dados do modelo aprovado.",
  category: "profissionais",
  thumbnail: "/images/templates/exemplo-ficticio/capa.webp",
  images: ["/images/templates/exemplo-ficticio/detalhe.webp"],
  // demoUrl: informar apenas uma URL http(s) real de demonstração.
  features: ["Característica ilustrativa"],
  active: false,
}
*/
