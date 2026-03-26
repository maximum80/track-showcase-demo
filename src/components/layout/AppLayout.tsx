import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { PanelStackProvider, PanelStackContainer } from './PanelStack'

const routeTitles: Record<string, { en: string; ja: string; sub?: { en: string; ja: string } }> = {
  '/dashboard': { en: 'Dashboard', ja: 'ダッシュボード' },
  '/example': { en: 'Example Page', ja: 'サンプルページ' },
  '/settings': { en: 'Settings', ja: '設定' },
}

const parentLabels: Record<string, { en: string; ja: string }> = {}

export function AppLayout() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [dark, setDark] = useState(false)
  const [persona, setPersona] = useState('admin')

  const isJa = i18n.language === 'ja'

  const pathKey = Object.keys(routeTitles)
    .filter(k => location.pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0]

  const titleData = pathKey ? routeTitles[pathKey] : null
  const title = titleData ? (isJa ? titleData.ja : titleData.en) : 'App'

  const segments = location.pathname.split('/').filter(Boolean)
  const breadcrumb = segments.length > 1
    ? (() => {
        const parentPath = '/' + segments[0]
        const parent = parentLabels[parentPath]
        return parent ? [{ label: isJa ? parent.ja : parent.en, to: parentPath }] : []
      })()
    : []
  const showBack = breadcrumb.length > 0

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
              breadcrumb={breadcrumb.length > 0 ? breadcrumb : undefined}
              showBack={showBack}
            />
            <div className="relative flex-grow overflow-hidden">
              <div className="absolute inset-0 overflow-y-auto">
                <div className="flex flex-col flex-grow gap-6 px-6 py-4">
                  <Outlet context={{ persona, dark }} />
                </div>
              </div>
              <PanelStackContainer isJa={isJa} />
            </div>
          </div>
        </div>
      </div>
    </PanelStackProvider>
  )
}
