import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AdvancedIndexPage } from './components/advancedpage/AdvancedIndexPage'
import { IntroductionPage } from './components/introductionpage/IntroductionPage'
import { LandingPage } from './components/landingpage/LandingPage'
import { LessonPage } from './components/lessonpage/LessonPage'
import { beginnerCurriculum } from './data/curriculum'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="introduction" element={<IntroductionPage />} />
          <Route
            path="beginner"
            element={
              <Navigate to={`/beginner/${beginnerCurriculum[0].slug}`} replace />
            }
          />
          <Route path="advanced" element={<AdvancedIndexPage />} />
          <Route path=":section/:slug" element={<LessonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
