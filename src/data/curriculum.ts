import firstProjectMd from '../content/first-project.md?raw'
import firstSubsystemMd from '../content/first-subsystem.md?raw'

export type CurriculumEntry = {
  slug: string
  markdown: string
}

export const curriculum: CurriculumEntry[] = [
  { slug: 'first-project', markdown: firstProjectMd },
  { slug: 'first-subsystem', markdown: firstSubsystemMd },
]

// import gitMd from '../content/git.md?raw'
// export const gitCurriculum: CurriculumEntry[] = [
//   { slug: 'git', markdown: gitMd },
// ]
