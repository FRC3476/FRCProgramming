import type { CurriculumSection } from "./curriculum";

export const first_subsystem: CurriculumSection[] = [
    {
        id: 'first-subsystem',
        title: 'Making Your First Subsystem',
        subheadings: [
          { id: 'setting-up-your-first-subsystem', 
            title: 'Setting up your first subsytem',
            content: [
                { type: 'text', body: 'Using Git is one of the most important skills you will need as a programmer.' },
                { type: 'image', src: 'newRepo', caption: 'Setting up your first repository' },
                { type: 'text', body: 'Setting up your first repository' },
            ],
         },

        ],
      }
];