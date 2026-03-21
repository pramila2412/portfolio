export interface Project {
    slug: string;
    title: string;
    description: string;
    longDescription: string[];
    technologies: string[];
    year: string;
    role: string;
    images: string[];
    status?: string;
    liveUrl?: string;
}

export const projects: Project[] = [
    {
        slug: "quantzi-website",
        title: "Quantzi",
        description: "Quantzi company website.",
        longDescription: [
            "Developed the Quantzi company website using Next.js.",
            "Created a modern, fast, and responsive web experience.",
            "Ensured cross-device compatibility and optimized page performance."
        ],
        technologies: ["Next.js", "React.js", "Tailwind CSS"],
        year: "2025",
        role: "Software Developer",
        images: ["/assets/quantzi1.webp", "/assets/quantzi2.webp", "/assets/quantzi3.webp"],
        liveUrl: "https://www.quantzi.co/"
    },
    {
        slug: "avita-residency",
        title: "Avita Residency",
        description: "PG management admin panel webapp for Avita Residency.",
        longDescription: [
            "Developed a PG management admin panel webapp using React.js.",
            "Built modules for KYC verification, staff management, and booking management.",
            "Implemented mess tracking, expense and income monitoring."
        ],
        technologies: ["React.js", "Node.js", "Admin Panel"],
        year: "2025",
        role: "Software Developer",
        images: ["/assets/avita1.webp", "/assets/avita2.webp", "/assets/avita3.webp"],
        liveUrl: "https://avitaresidences.in/"
    },
    {
        slug: "bme-bazaar",
        title: "BME Bazaar",
        description: "Full-stack marketplace platform for used medical equipment.",
        longDescription: [
            "Built a full-stack marketplace platform similar to OLX for medical equipment.",
            "Features include verified sellers, secure buyer access, and listing approval systems.",
            "Created admin moderation tools for user and product management."
        ],
        technologies: ["Next.js", "Node.js", "MongoDB"],
        year: "2025",
        role: "Software Developer",
        images: ["/assets/bme1.webp", "/assets/bme2.webp", "/assets/bme3.webp"],
        liveUrl: "https://www.bmebazaar.com/"
    },
    {
        slug: "success-shipping",
        title: "Success Shipping",
        description: "Company website with CMS functionality.",
        longDescription: [
            "Built a simple and responsive company website with CMS functionality.",
            "Implemented page-wise content management features.",
            "Ensured high performance and SEO best practices."
        ],
        technologies: ["React.js", "CMS", "Frontend"],
        year: "2025",
        role: "Software Developer",
        images: ["/assets/sss1.webp", "/assets/sss2.webp", "/assets/sss3.webp"],
        liveUrl: "https://www.successshipping.in/"
    }
];
