import type { CurriculumSection } from '../data/curriculum'

export type NavItem = {
  id: string
  title: string
  level: 0 | 1
}

export function buildNavItems(sections: CurriculumSection[]): NavItem[] {
  return sections.flatMap((section) => {
    const items: NavItem[] = [{ id: section.id, title: section.title, level: 0 }]
    if (section.subheadings) {
      for (const sub of section.subheadings) {
        items.push({ id: sub.id, title: sub.title, level: 1 })
      }
    }
    return items
  })
}
