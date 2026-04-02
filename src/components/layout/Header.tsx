import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'

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
  const navigate = useNavigate()

  return (
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
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}
