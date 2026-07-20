import firstProjectMd from '../content/beginner/first-project.md?raw'
import firstSubsystemMd from '../content/beginner/first-subsystem.md?raw'
import { getPageTitle } from '../utils/buildNavItems'

export type CurriculumEntry = {
  slug: string
  title: string
  markdown: string
}

export const beginnerCurriculum: CurriculumEntry[] = [
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

export const curriculaBySection = {
  beginner: beginnerCurriculum,
  advanced: [],
} as const satisfies Record<string, CurriculumEntry[]>

export type CurriculumSection = keyof typeof curriculaBySection

export function getCurriculum(section: string): CurriculumEntry[] | undefined {
  if (section in curriculaBySection) {
    return curriculaBySection[section as CurriculumSection]
  }
  return undefined
}

export function getNextLesson(
  entries: CurriculumEntry[],
  slug: string,
): CurriculumEntry | undefined {
  const index = entries.findIndex((entry) => entry.slug === slug)
  if (index < 0 || index >= entries.length - 1) return undefined
  return entries[index + 1]
}
