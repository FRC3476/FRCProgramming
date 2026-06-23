export type CurriculumSubheading = {
  id: string
  title: string
}

export type CurriculumSection = {
  id: string
  title: string
  subheadings?: CurriculumSubheading[]
}

export const curriculum: CurriculumSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
  },
  {
    id: 'git-usage',
    title: 'Git Usage',
    subheadings: [
      { id: 'setting-up-your-first-repository', title: 'Setting up your first repository' },
      {
        id: 'how-to-use-branches-prs-clean-codebase',
        title: 'How to use branches + PRs + keep a clean codebase',
      },
    ],
  },
  {
    id: 'creating-your-first-subsystem',
    title: 'Creating Your First Subsystem',
    subheadings: [
      { id: 'creating-a-subsystem', title: 'Creating a Subsystem' },
      { id: 'creating-commands', title: 'Creating Commands' },
      { id: 'creating-triggers', title: 'Creating Triggers' },
      {
        id: 'ctre-devices',
        title: 'CTRE Devices (Configuration, Read APIs, ControlModes)',
      },
      { id: 'motion-magic', title: 'Motion Magic' },
    ],
  },
  {
    id: 'creating-your-second-subsystem',
    title: 'Creating Your Second Subsystem',
    subheadings: [
      { id: 'state-machines', title: 'State Machines' },
      { id: 'logging-replay', title: 'Logging + Replay' },
    ],
  },
  {
    id: 'creating-autos',
    title: 'Creating Autos',
    subheadings: [
      { id: 'different-auto-pathing-routines', title: 'Different Auto Pathing Routines' },
    ],
  },
  {
    id: 'vision-basics',
    title: 'Vision Basics',
  },
  {
    id: 'advanced-thingies',
    title: 'Advanced thingies',
    subheadings: [{ id: 'unit-libraries', title: 'Unit libraries' }],
  },
  {
    id: 'advanced-controls',
    title: 'Advanced Controls',
  },
  {
    id: 'vision-advanced',
    title: 'Vision Advanced',
  },
  {
    id: 'simulation-visualization',
    title: 'Simulation Visualization',
    subheadings: [{ id: 'project-management', title: 'Project Management?' }],
  },
]
