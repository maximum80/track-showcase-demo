import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { TopPage } from './pages/TopPage'
import { ModulePage } from './pages/ModulePage'
import { ScenePage } from './pages/ScenePage'
import { LoginPage } from './pages/LoginPage'

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('track-auth') === '1')

  if (!authed) {
    return <LoginPage onAuth={() => setAuthed(true)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<TopPage />} />
          <Route path="/:module" element={<ModulePage />} />
          <Route path="/:module/:sceneId" element={<ScenePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
