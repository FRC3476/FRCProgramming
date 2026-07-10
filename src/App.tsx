import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AdvancedPage } from './components/advancedpage/AdvancedPage'
import { BeginnerIndexPage } from './components/beginnerpage/BeginnerIndexPage'
import { CurriculumLessonPage } from './components/beginnerpage/CurriculumLessonPage'
import { LandingPage } from './components/landingpage/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="beginner" element={<BeginnerIndexPage />} />
          <Route path="beginner/:slug" element={<CurriculumLessonPage />} />
          <Route path="advanced" element={<AdvancedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
