export type CurriculumSubheading = {
  id: string
  title: string
  content?: CurriculumContentBlock[]
}

export type CurriculumContentBlock =
  | { type: 'text'; body: string }
  | { type: 'gif'; src: string; alt: string } 
  | { type: 'video'; src: string; alt: string }
  | { type: 'image'; src: string; alt: string }


export type CurriculumSection = {
  id: string
  title: string
  subheadings?: CurriculumSubheading[]
  content?: CurriculumContentBlock[]
}

