import React, { useState, useRef, useEffect, createContext, useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard, FileText, Settings,
  ChevronDown, ChevronRight, PanelLeftClose,
  PanelLeft, Globe, LogOut, Sun, Moon,
} from 'lucide-react'
import { cn, Avatar } from '../ui'
import { signOut } from '../../auth'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  persona: string
  onPersonaChange: (p: string) => void
  dark: boolean
  onToggleTheme: () => void
}

interface NavItem {
  to: string
  label: string
  icon: React.ElementType
  children?: NavItem[]
}

interface SidebarContextValue {
  collapsed: boolean
  expandedSections: Record<string, boolean>
  toggleSection: (key: string) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

function useSidebarContext(): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('Sidebar compound components must be used within <Sidebar>')
  }
  return ctx
}

// Flyout popover for collapsed sidebar items with children
function CollapsedFlyout({ item, isActive, children }: { item: NavItem; isActive: boolean; children: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const flyoutRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const handleEnter = () => {
    clearTimeout(timeoutRef.current)
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPos({ top: rect.top, left: rect.right + 4 })
    }
    setOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className={cn(
          'w-full flex items-center justify-center px-2 py-2 rounded-lg text-body transition-micro cursor-pointer',
          isActive ? 'text-primary bg-primary-50 font-medium' : 'text-sidebar-text hover:text-primary hover:bg-sidebar-hover',
        )}
      >
        <item.icon size={18} className="shrink-0" />
      </div>

      {open && (
        <div
          ref={flyoutRef}
          className="fixed min-w-[180px] bg-white rounded-lg border border-neutral-100 shadow-lg py-1 z-[9999] animate-fade-in"
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={handleLeave}
        >
          <div className="px-3 py-1.5 text-tiny font-semibold text-neutral-500 uppercase tracking-wider">
            {item.label}
          </div>
          {children.map(child => (
            <NavLink
              key={child.to}
              to={child.to}
              onClick={() => setOpen(false)}
              className={({ isActive: active }) => cn(
                'flex items-center gap-2.5 px-3 py-2 text-body transition-micro',
                active ? 'text-primary bg-primary-50 font-medium' : 'text-neutral-700 hover:text-primary hover:bg-neutral-50',
              )}
            >
              <child.icon size={15} className="shrink-0" />
              <span className="truncate">{child.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

// Tooltip for collapsed sidebar items without children
function CollapsedTooltip({ children, label }: { children: React.ReactNode; label: string }) {
  const [show, setShow] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPos({ top: rect.top + rect.height / 2, left: rect.right + 8 })
    }
    setShow(true)
  }

  return (
    <div ref={ref} onMouseEnter={handleEnter} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div
          className="fixed px-2.5 py-1.5 bg-neutral-900 text-white text-caption rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-[9999] -translate-y-1/2"
          style={{ top: pos.top, left: pos.left }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

// Compound component: renders a single nav item, reading collapsed state from context
function SidebarNavItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const { collapsed, expandedSections, toggleSection } = useSidebarContext()
  const location = useLocation()

  const hasChildren = item.children && item.children.length > 0
  const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
  const sectionKey = item.to.replace('/', '')
  const isExpanded = expandedSections[sectionKey]

  // Parent with children
  if (hasChildren) {
    if (collapsed) {
      return (
        <CollapsedFlyout key={item.to} item={item} isActive={isActive} children={item.children!} />
      )
    }

    return (
      <div>
        <button
          onClick={() => toggleSection(sectionKey)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-body transition-micro',
            isActive ? 'text-primary bg-primary-50 font-medium' : 'text-sidebar-text hover:text-primary hover:bg-sidebar-hover',
          )}
        >
          <item.icon size={18} className="shrink-0" />
          <span className="flex-1 text-left truncate">{item.label}</span>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {isExpanded && (
          <div className="ml-5 mt-0.5 space-y-0.5 border-l border-neutral-100 pl-3">
            {item.children!.map(child => (
              <SidebarNavItem key={child.to} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Leaf nav item
  const link = (
    <NavLink
      to={item.to}
      className={({ isActive: active }) => cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-body transition-micro',
        active ? 'text-primary bg-primary-50 font-medium' : 'text-sidebar-text hover:text-primary hover:bg-sidebar-hover',
        collapsed && 'justify-center px-2',
      )}
    >
      <item.icon size={depth > 0 ? 15 : 18} className="shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  )

  if (collapsed && depth === 0) {
    return (
      <CollapsedTooltip label={item.label}>
        {link}
      </CollapsedTooltip>
    )
  }

  return link
}

export function Sidebar({ collapsed, onToggle, persona, onPersonaChange, dark, onToggleTheme }: SidebarProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userMenuPos, setUserMenuPos] = useState({ top: 0, left: 0 })
  const userMenuRef = useRef<HTMLDivElement>(null)

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ja' : 'en')
  }

  const handleSignOut = () => {
    signOut()
    navigate('/signin', { replace: true })
  }

  const handleUserMenuClick = () => {
    if (collapsed && userMenuRef.current) {
      const rect = userMenuRef.current.getBoundingClientRect()
      setUserMenuPos({ top: rect.top, left: rect.right + 4 })
    }
    setUserMenuOpen(prev => !prev)
  }

  useEffect(() => {
    if (!userMenuOpen) return
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [userMenuOpen])

  const ctxValue: SidebarContextValue = { collapsed, expandedSections, toggleSection }

  const navItems: NavItem[] = [
    { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/example', label: t('nav.example'), icon: FileText },
    { to: '/settings', label: t('nav.settings'), icon: Settings },
  ]

  const langLabel = i18n.language === 'en' ? '日本語' : 'English'
  const themeLabel = dark
    ? (i18n.language === 'ja' ? 'ライトモード' : 'Light mode')
    : (i18n.language === 'ja' ? 'ダークモード' : 'Dark mode')

  return (
    <SidebarContext.Provider value={ctxValue}>
      <aside className={cn(
        'h-screen bg-sidebar-bg flex flex-col transition-all duration-250 ease-out border-r border-neutral-100 shrink-0',
        collapsed ? 'w-[56px]' : 'w-[224px]',
      )}>
        {/* Logo */}
        <div className={cn('flex items-center h-14 px-3 border-b border-neutral-100', collapsed ? 'justify-center' : 'gap-3')}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-body shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 truncate">
              <div className="text-body font-semibold text-neutral-900 truncate">App Template</div>
              <div className="text-tiny text-neutral-500 truncate">Base Mock</div>
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
          {navItems.map(item => <SidebarNavItem key={item.to} item={item} />)}
        </nav>

        {/* Footer */}
        <div className="border-t border-neutral-100 px-2 py-2 space-y-1">
          {/* User menu */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={handleUserMenuClick}
              className={cn(
                'w-full flex items-center rounded-lg transition-micro hover:bg-sidebar-hover p-2',
                collapsed ? 'justify-center' : 'gap-2.5',
              )}
            >
              <Avatar name="Admin User" size="sm" />
              {!collapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-body font-medium text-neutral-800 truncate">Admin User</div>
                    <div className="text-tiny text-neutral-400 truncate">admin@example.com</div>
                  </div>
                  <ChevronDown size={14} className={cn('text-neutral-400 transition-transform shrink-0', userMenuOpen && 'rotate-180')} />
                </>
              )}
            </button>

            {/* Expanded dropdown (above button) */}
            {userMenuOpen && !collapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-card border border-neutral-100 shadow-lg py-1 z-50 animate-scale-in">
                <button
                  onClick={() => { onToggleTheme(); setUserMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-body text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-micro"
                >
                  {dark ? <Sun size={15} /> : <Moon size={15} />}
                  <span>{themeLabel}</span>
                </button>
                <button
                  onClick={() => { toggleLang(); setUserMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-body text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-micro"
                >
                  <Globe size={15} />
                  <span>{langLabel}</span>
                </button>
                <div className="border-t border-neutral-100 my-1" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-body text-negative hover:bg-negative/5 transition-micro"
                >
                  <LogOut size={15} />
                  <span>{t('auth.sign_out')}</span>
                </button>
              </div>
            )}

            {/* Collapsed flyout (to the right) */}
            {userMenuOpen && collapsed && (
              <div
                className="fixed min-w-[200px] bg-white rounded-card border border-neutral-100 shadow-lg py-1 z-[9999] animate-fade-in"
                style={{ top: userMenuPos.top, left: userMenuPos.left }}
              >
                <div className="px-3 py-2 border-b border-neutral-100">
                  <div className="text-body font-medium text-neutral-900">Admin User</div>
                  <div className="text-tiny text-neutral-400">admin@example.com</div>
                </div>
                <button
                  onClick={() => { onToggleTheme(); setUserMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-body text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-micro"
                >
                  {dark ? <Sun size={15} /> : <Moon size={15} />}
                  <span>{themeLabel}</span>
                </button>
                <button
                  onClick={() => { toggleLang(); setUserMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-body text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-micro"
                >
                  <Globe size={15} />
                  <span>{langLabel}</span>
                </button>
                <div className="border-t border-neutral-100 my-1" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-body text-negative hover:bg-negative/5 transition-micro"
                >
                  <LogOut size={15} />
                  <span>{t('auth.sign_out')}</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>
    </SidebarContext.Provider>
  )
}
