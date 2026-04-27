import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { PanelStackProvider, PanelStackContainer } from './PanelStack'
import { MODULES, DEMO_SCENES } from '../../demo-data'
import { LangContext } from '../../lang-context'
import type { Lang } from '../../lang-context'

function usePageTitle(lang: Lang) {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  if (segments.length === 0) return { title: 'Track Demo Showcase', breadcrumb: undefined, showBack: false }

  const moduleId = segments[0]
  const sceneId = segments[1]
  const mod = MODULES.find(m => m.id === moduleId)

  if (!mod) return { title: 'Track Demo Showcase', breadcrumb: undefined, showBack: false }

  if (!sceneId) {
    return { title: mod.label, breadcrumb: undefined, showBack: false }
  }

  const scene = DEMO_SCENES.find(s => s.id === sceneId)
  const sceneTitle = scene
    ? (lang === 'en' ? (scene.sceneEn ?? scene.scene) : scene.scene)
    : sceneId
  return {
    title: sceneTitle,
    breadcrumb: [{ label: mod.label, to: `/${moduleId}` }],
    showBack: true,
  }
}

export function AppLayout() {
  const { i18n } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const [dark, setDark] = useState(false)
  const [persona, setPersona] = useState('admin')
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('givery-language') as Lang) || 'ja')

  const { title, breadcrumb, showBack } = usePageTitle(lang)

  const langToggle = (
    <div className="flex items-center rounded-lg border border-neutral-200 overflow-hidden text-xs font-medium">
      <button
        onClick={() => { setLang('ja'); localStorage.setItem('givery-language', 'ja') }}
        className={`px-3 py-1.5 transition-colors ${lang === 'ja' ? 'bg-[#1A58AF] text-white' : 'bg-white text-neutral-500 hover:bg-neutral-50'}`}
      >
        JA
      </button>
      <button
        onClick={() => { setLang('en'); localStorage.setItem('givery-language', 'en') }}
        className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-[#1A58AF] text-white' : 'bg-white text-neutral-500 hover:bg-neutral-50'}`}
      >
        EN
      </button>
    </div>
  )

  return (
    <LangContext.Provider value={lang}>
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
              actions={langToggle}
            />
            <div className="relative flex-grow overflow-hidden">
              <div className="absolute inset-0 overflow-y-auto">
                <div className="flex flex-col flex-grow gap-6 px-6 py-4">
                  <Outlet context={{ persona, dark, lang }} />
                </div>
              </div>
              <PanelStackContainer isJa={lang === 'ja'} />
            </div>
          </div>
        </div>
      </div>
    </PanelStackProvider>
    </LangContext.Provider>
  )
}
