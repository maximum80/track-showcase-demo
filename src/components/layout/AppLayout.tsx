import React, { useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { PanelStackProvider, PanelStackContainer } from './PanelStack'
import { MODULES, DEMO_SCENES } from '../../demo-data'

function usePageTitle() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  if (segments.length === 0) return { title: 'Track デモ', breadcrumb: undefined, showBack: false }

  const moduleId = segments[0]
  const sceneId = segments[1]
  const mod = MODULES.find(m => m.id === moduleId)

  if (!mod) return { title: 'Track デモ', breadcrumb: undefined, showBack: false }

  if (!sceneId) {
    return { title: mod.label, breadcrumb: undefined, showBack: false }
  }

  const scene = DEMO_SCENES.find(s => s.id === sceneId)
  return {
    title: scene?.scene ?? sceneId,
    breadcrumb: [{ label: mod.label, to: `/${moduleId}` }],
    showBack: true,
  }
}

export function AppLayout() {
  const { i18n } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const [dark, setDark] = useState(false)
  const [persona, setPersona] = useState('admin')

  const { title, breadcrumb, showBack } = usePageTitle()

  return (
    <PanelStackProvider>
      <div className={`min-h-screen w-full flex ${dark ? 'dark' : ''}`}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          persona={persona}
          onPersonaChange={setPersona}
          dark={dark}
          onToggleTheme={() => setDark(!dark)}
        />
        <div className="relative flex flex-col flex-grow min-w-0">
          <div className="absolute inset-0 flex flex-col">
            <Header
              title={title}
              breadcrumb={breadcrumb}
              showBack={showBack}
            />
            <div className="relative flex-grow overflow-hidden">
              <div className="absolute inset-0 overflow-y-auto">
                <div className="flex flex-col flex-grow gap-6 px-6 py-4">
                  <Outlet context={{ persona, dark }} />
                </div>
              </div>
              <PanelStackContainer isJa={i18n.language === 'ja'} />
            </div>
          </div>
        </div>
      </div>
    </PanelStackProvider>
  )
}
