import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Bell, Command, ArrowLeft, ChevronRight } from 'lucide-react'
import { CommandPalette } from './CommandPalette'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface HeaderProps {
  title: string
  subtitle?: string
  breadcrumb?: BreadcrumbItem[]
  showBack?: boolean
  actions?: React.ReactNode
}

export function Header({ title, subtitle, breadcrumb, showBack, actions }: HeaderProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [cmdOpen, setCmdOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  // Keyboard shortcut for command palette
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header className="h-16 bg-white border-b border-neutral-100 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-micro shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            {breadcrumb && breadcrumb.length > 0 && (
              <div className="flex items-center gap-1 mb-0.5">
                {breadcrumb.map((crumb, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <ChevronRight size={11} className="text-neutral-300" />}
                    <span className="text-caption text-neutral-400">{crumb.label}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
            <h1 className="text-page-title text-neutral-900 leading-tight">{title}</h1>
            {subtitle && <p className="text-caption text-neutral-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {actions}

          {/* Command palette trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 h-8 px-3 bg-neutral-50 border border-neutral-100 rounded-lg text-caption text-neutral-500 hover:bg-neutral-100 transition-micro"
          >
            <Search size={14} />
            <span className="hidden sm:inline">{t('common.search')}</span>
            <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-neutral-100 rounded text-tiny text-neutral-400">
              <Command size={10} />K
            </kbd>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 transition-micro"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-negative" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-10 w-80 bg-white rounded-card border border-neutral-100 shadow-lg z-50 animate-scale-in">
                <div className="px-4 py-3 border-b border-neutral-100">
                  <span className="text-body font-semibold text-neutral-900">Notifications</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[
                    { text: 'Example notification one', time: '2h ago' },
                    { text: 'Example notification two', time: '5h ago' },
                    { text: 'Example notification three', time: '1d ago' },
                  ].map((n, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-0 cursor-pointer transition-micro">
                      <p className="text-body text-neutral-700">{n.text}</p>
                      <p className="text-tiny text-neutral-400 mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  )
}
