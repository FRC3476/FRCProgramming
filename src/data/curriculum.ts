export type CurriculumSubheading = {
  id: string
  title: string
  content?: CurriculumContentBlock[]
}

export type CurriculumContentBlock =
  | { type: 'text'; body: string }
  | { type: 'gif'; src: string; caption?: string }
  | { type: 'video'; src: string; caption?: string }
  | { type: 'image'; src: string; caption?: string }


export type CurriculumSection = {
  id: string
  title: string
  subheadings?: CurriculumSubheading[]
  content?: CurriculumContentBlock[]
}

