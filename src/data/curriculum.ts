import firstProjectMd from '../content/beginner/first-project.md?raw'
import firstSubsystemMd from '../content/beginner/first-subsystem.md?raw'
import { getPageTitle } from '../utils/buildNavItems'

export type CurriculumEntry = {
  slug: string
  title: string
  markdown: string
}

export const curriculum: CurriculumEntry[] = [
  {
    slug: 'first-project',
    title: getPageTitle(firstProjectMd),
    markdown: firstProjectMd,
  },
  {
    slug: 'first-subsystem',
    title: getPageTitle(firstSubsystemMd),
    markdown: firstSubsystemMd,
  },
]

// import gitMd from '../content/git.md?raw'
// export const gitCurriculum: CurriculumEntry[] = [
//   { slug: 'git', markdown: gitMd },
// ]
