import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['ia-conteudo', 'automacao', 'ferramentas', 'criar-site', 'ia-empresas']),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    affiliate: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const plataformas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plataformas' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string().max(200),
    tipo: z.enum(['ia', 'testes', 'freela', 'pesquisas']),
    nota: z.number().min(0).max(5),
    ganhos: z.string(),
    aceitaBrasil: z.string(),
    pagamento: z.string(),
    idioma: z.string(),
    paraQuem: z.string(),
    link: z.string().url(),
    indicacao: z.boolean().default(false),
    pros: z.array(z.string()),
    contras: z.array(z.string()),
    veredito: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    order: z.number().default(50),
  }),
});

export const collections = { blog, plataformas };
