import firstProjectMd from '../content/beginner/first-project.md?raw'
import firstSubsystemMd from '../content/beginner/first-subsystem.md?raw'
import writingHardwareMd from '../content/beginner/writing-hardware.md?raw'
import writingSoftwareMd from '../content/beginner/writing-software.md?raw'
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
  {
    slug: 'writing-hardware',
    title: getPageTitle(writingHardwareMd),
    markdown: writingHardwareMd,
  },
  {
    slug: 'writing-software',
    title: getPageTitle(writingSoftwareMd),
    markdown: writingSoftwareMd,
  }
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

export function getPreviousLesson(
  entries: CurriculumEntry[],
  slug: string,
): CurriculumEntry | undefined {
  const index = entries.findIndex((entry) => entry.slug === slug)
  if (index <= 0) return undefined
  return entries[index - 1]
}
