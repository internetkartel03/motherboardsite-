export type Flagship = {
  id: string;
  num: string;
  status: string;
  available: boolean;
  category: string;
  name: string;
  description: string;
  accent: string;
  action: string;
  image: string;
};

// Contributors start at 162 and increase by 3 every 24h from this anchor date.
const CONTRIBUTOR_ANCHOR = new Date('2026-06-01T00:00:00Z').valueOf();
const CONTRIBUTOR_BASE = 162;

export const METALLIC = {
  betaDate: new Date('2026-12-31T00:00:00Z').valueOf(),
  getContributors: () => {
    const days = Math.max(0, Math.floor((Date.now() - CONTRIBUTOR_ANCHOR) / 86400000));
    return CONTRIBUTOR_BASE + days * 3;
  },
  flagships: [
    {
      id: 'metallic',
      num: '01',
      status: 'COMING SOON',
      available: false,
      category: 'Elite Cognitive Builder',
      name: 'METALLIC.V1',
      description:
        'Metallic.V1 is a private cognitive building system designed for creators, founders, operators, and developers. It combines automation, workflow intelligence, reusable frameworks, and scalable execution systems into a single operating environment. Built to help ambitious people create faster, automate deeper, and execute at scale.',
      accent: 'rgba(0,200,122,0.14)',
      action: 'COMING SOON',
      image: '/uploads/Metallic.v1 product image.png',
    },
    {
      id: 'zouk',
      num: '02',
      status: 'COMING SOON',
      available: false,
      category: 'AI Skills, Agents & Automation Operating System',
      name: 'ZOUK',
      description:
        'ZOUK is a complete AI operating system containing advanced skills, specialist agents, reusable workflows, backend logic systems, execution frameworks, and automation architectures. Built for Claude Code, Open WebUI, Codex, local AI environments, and advanced builders. Designed to eliminate repetitive work and dramatically increase output.',
      accent: 'rgba(0,200,122,0.12)',
      action: 'COMING SOON',
      image: '/uploads/zouk product image.png',
    },
    {
      id: 'naughty',
      num: '03',
      status: 'COMING SOON',
      available: false,
      category: 'Adult Traffic Automation Platform',
      name: 'NAUGHTY PILOT',
      description:
        'Naughty Pilot is an automation platform built specifically for adult creators, agencies, and traffic operators. The system focuses on audience growth, traffic generation, lead acquisition, promotional automation, and campaign management. Built for scale, speed, and visibility.',
      accent: 'rgba(184,50,50,0.16)',
      action: 'COMING SOON',
      image: '/uploads/naughty pilot product.png',
    },
    {
      id: 'uncensored',
      num: '04',
      status: 'AVAILABLE NOW',
      available: true,
      category: 'Adult Companion Experience',
      name: 'UNCENSORED &\nUNCERTAIN',
      description:
        'Uncensored & Uncertain is an interactive adult companion experience built around conversation, engagement, entertainment, and unrestricted interaction. Designed for users seeking personalized digital companionship within a private environment.',
      accent: 'rgba(184,50,50,0.18)',
      action: 'GET ACCESS NOW',
      image: '/uploads/uncensored & uncertain product.png',
    },
    {
      id: 'fluentbridge',
      num: '05',
      status: 'COMING SOON',
      available: false,
      category: 'Bilingual Learning Platform',
      name: 'FLUENTBRIDGE',
      description:
        'FluentBridge helps students learn English and Spanish through interactive lessons, guided speaking practice, AI-powered conversation, listening exercises, and progress tracking. The platform includes a dedicated educator portal featuring grading tools, student management, classroom analytics, assignments, and performance monitoring. Built for learners, teachers, schools, and educational organizations.',
      accent: 'rgba(0,200,122,0.12)',
      action: 'COMING SOON',
      image: '/uploads/fluent bridge product.png',
    },
  ] as Flagship[],
};
