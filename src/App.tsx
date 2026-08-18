import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AdvancedIndexPage } from './components/advancedpage/AdvancedIndexPage'
import { BeginnerIndexPage } from './components/beginnerpage/BeginnerIndexPage'
import { LandingPage } from './components/landingpage/LandingPage'
import { LessonPage } from './components/lessonpage/LessonPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="beginner" element={<BeginnerIndexPage />} />
          <Route path="advanced" element={<AdvancedIndexPage />} />
          <Route path=":section/:slug" element={<LessonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
