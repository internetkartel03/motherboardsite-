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
};

export const METALLIC = {
  betaDate: new Date('2026-12-31T00:00:00Z').valueOf(),
  getContributors: () => 182,
  flagships: [
    {
      id: 'zouk',
      num: '01',
      status: 'AVAILABLE',
      available: true,
      category: 'Agent Toolkit',
      name: 'ZOUK Skills Kit',
      description: 'A modular skills suite for AI agents, autonomous workflows, and creative automation.',
      accent: 'rgba(0,200,122,0.16)',
      action: 'EXPLORE',
    },
    {
      id: 'fluent',
      num: '02',
      status: 'PREVIEW',
      available: false,
      category: 'Interface Bridge',
      name: 'Fluent Bridge',
      description: 'A language-native gateway for real-time collaboration, chain execution, and contextual automation.',
      accent: 'rgba(72,152,226,0.16)',
      action: 'NOTIFY',
    },
    {
      id: 'uncensored',
      num: '03',
      status: 'IN PREP',
      available: false,
      category: 'Reality Engine',
      name: 'Uncensored & Uncertain',
      description: 'A transparency-first AI layer focused on raw insight, honest reasoning, and experimental output.',
      accent: 'rgba(192,82,242,0.16)',
      action: 'EXPECT',
    },
    {
      id: 'naughty',
      num: '04',
      status: 'UNDER REVIEW',
      available: false,
      category: 'Dynamics Lab',
      name: 'Naughty Pilot',
      description: 'A high-risk simulation engine for creative systems, bold experimentation, and conceptual design.',
      accent: 'rgba(232,92,60,0.16)',
      action: 'WATCH',
    },
  ] as Flagship[],
};
