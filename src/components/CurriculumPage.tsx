import { curriculum } from '../data/curriculum'
import './CurriculumPage.css'

export function CurriculumPage() {
  return (
    <main className="curriculum">
      {curriculum.map((section) => (
        <section key={section.id} id={section.id} className="curriculum-page">
          <h1>{section.title}</h1>
          {section.subheadings?.map((sub) => (
            <h2 key={sub.id} id={sub.id}>
              {sub.title}
            </h2>
          ))}
        </section>
      ))}
    </main>
  )
}
