import { projects } from "@/lib/projects-data";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {};
    }

    const titleMap: Record<string, string> = {
        'bmebazaar': 'bmebazaar – Schema Driven SaaS Web Builder',
        'avita-residency': 'avita – Cross-platform Music Streaming App',
        'quantzi-website': 'Quantzi – Animated Branding & Performance UI',
        'Success Shipping Services': 'Success Shipping Services – UI Redesign & Content Management'
    };

    return {
        title: titleMap[slug] || `${project.title} | Pramila K`,
        description: project.description,
    };
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailContent project={project} />;
}
