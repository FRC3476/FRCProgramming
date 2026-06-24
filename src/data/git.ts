import type { CurriculumSection } from "./curriculum";

export const git_curriculum: CurriculumSection[] = [
    {
        id: 'git-usage',
        title: 'Git Usage',
        subheadings: [
          { id: 'setting-up-your-first-repository', 
            title: 'Setting up your first repository',
            content: [
                { type: 'text', body: 'Using Git is one of the most important skills you will need as a programmer.' },
                { type: 'text', body: 'Setting up your first repository' },
                { type: 'text', body: 'Setting up your first repository' },
            ],
         },
          {
            id: 'how-to-use-branches-prs-clean-codebase',
            title: 'How to use branches + PRs + keep a clean codebase',
          },
        ],
      }
];