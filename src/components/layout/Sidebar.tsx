import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDown, ChevronRight,
  PanelLeftClose, PanelLeft,
  BarChart2, Users, BookOpen, Briefcase,
  Home,
} from 'lucide-react'
import { cn } from '../ui'
import { MODULES, getScenesByModule } from '../../demo-data'
import type { Module } from '../../demo-data'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  persona: string
  onPersonaChange: (p: string) => void
  dark: boolean
  onToggleTheme: () => void
}

const MODULE_ICONS: Record<Module, React.ElementType> = {
  platform:   BarChart2,
  recruiting: Users,
  learning:   BookOpen,
  workforce:  Briefcase,
}

const TRACK_LOGO_URL = 'https://res.cloudinary.com/hkldfk58b/image/upload/v1666933718/sx1vjp0836o280ivvwgi.png'

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    platform: true,
  })

  const handleModuleClick = (id: string) => {
    const alreadyOnModule = location.pathname === `/${id}`
    setExpandedModules(prev => ({
      ...prev,
      [id]: alreadyOnModule ? !prev[id] : true,
    }))
    navigate(`/${id}`)
  }

  return (
    <aside className={cn(
      'h-screen bg-sidebar-bg flex flex-col transition-all duration-250 ease-out border-r border-neutral-100 shrink-0',
      collapsed ? 'w-[56px]' : 'w-[240px]',
    )}>
      {/* Logo */}
      <div className={cn(
        'flex items-center h-14 px-3 border-b border-neutral-100',
        collapsed ? 'justify-center' : 'gap-3',
      )}>
        {collapsed ? (
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <img src={TRACK_LOGO_URL} alt="Track" className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-2.5 min-w-0">
            <img src={TRACK_LOGO_URL} alt="Track" className="h-6 object-contain shrink-0" />
            <div className="text-tiny text-neutral-400 truncate">Demo Showcase</div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-sidebar-hover transition-micro shrink-0"
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-3 space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) => cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-body transition-micro',
            isActive
              ? 'text-primary bg-primary-50 font-medium'
              : 'text-sidebar-text hover:text-primary hover:bg-sidebar-hover',
            collapsed && 'justify-center px-2',
          )}
        >
          <Home size={18} className="shrink-0" />
          {!collapsed && <span className="truncate">プラットフォーム概要</span>}
        </NavLink>

        {MODULES.map(mod => {
          const Icon = MODULE_ICONS[mod.id]
          const scenes = getScenesByModule(mod.id)
          const isModuleActive = location.pathname.startsWith(`/${mod.id}`)
          const isExpanded = expandedModules[mod.id]

          return (
            <div key={mod.id}>
              {collapsed ? (
                <NavLink
                  to={`/${mod.id}`}
                  title={mod.label}
                  className={({ isActive }) => cn(
                    'w-full flex items-center justify-center px-2 py-2 rounded-lg text-body transition-micro',
                    (isActive || isModuleActive)
                      ? 'text-primary bg-primary-50 font-medium'
                      : 'text-sidebar-text hover:text-primary hover:bg-sidebar-hover',
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                </NavLink>
              ) : (
                <button
                  onClick={() => handleModuleClick(mod.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-body transition-micro',
                    isModuleActive
                      ? 'text-primary bg-primary-50 font-medium'
                      : 'text-sidebar-text hover:text-primary hover:bg-sidebar-hover',
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="flex-1 text-left truncate">{mod.label}</span>
                  {isExpanded
                    ? <ChevronDown size={14} className="shrink-0" />
                    : <ChevronRight size={14} className="shrink-0" />}
                </button>
              )}

              {!collapsed && isExpanded && (
                <div className="ml-5 mt-0.5 space-y-0.5 border-l border-neutral-100 pl-3">
                  {scenes.map(scene => (
                    <NavLink
                      key={scene.id}
                      to={`/${mod.id}/${scene.id}`}
                      className={({ isActive }) => cn(
                        'flex items-center gap-2 px-2 py-1.5 rounded-lg text-caption transition-micro',
                        isActive
                          ? 'text-primary bg-primary-50 font-medium'
                          : 'text-neutral-600 hover:text-primary hover:bg-neutral-50',
                      )}
                    >
                      <span className="truncate leading-snug">{scene.scene}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-100 px-3 py-3">
        {!collapsed && (
          <div className="text-tiny text-neutral-400 text-center">2026.04.08</div>
        )}
      </div>
    </aside>
  )
}
