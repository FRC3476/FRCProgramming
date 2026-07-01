import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AdvancedPage } from './components/advancedpage/AdvancedPage'
import { CurriculumPage } from './components/beginnerpage/CurriculumPage'
import { LandingPage } from './components/landingpage/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="beginner" element={<CurriculumPage />} />
          <Route path="advanced" element={<AdvancedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
