import type { CurriculumSection } from "./curriculum";

export const git: CurriculumSection[] = [
    {
        id: 'git-usage',
        title: 'Git Usage',
        subheadings: [
          { id: 'setting-up-your-first-repository', 
            title: 'Setting up your first repository',
            content: [
                { type: 'text', body: 'Using Git is one of the most important skills you will need as a programmer.' },
                { type: 'image', src: 'newRepo', caption: 'Setting up your first repository' },
                { type: 'text', body: 'Setting up your first repository' },
            ],
         },
          {
            id: 'how-to-use-branches-prs-clean-codebase',
            title: 'How to use branches + PRs + keep a clean codebase',
          },
        ],
        content: [
          {type: 'text', body: "Use it. Doesn't matter if you're the sole programmer on your team, use it. You will regret not using Git properly once you touched 3 different subsystems but you really only wanted to change one and now you have to either manually revert everything or delete everything."}
        ]
      }
];