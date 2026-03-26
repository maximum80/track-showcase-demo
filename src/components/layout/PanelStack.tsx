import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { cn } from '../ui'

// ── Types ──

export interface PanelEntry {
  id: string
  title: string
  titleJa?: string
  color?: string
  content: React.ReactNode
}

interface PanelStackContextValue {
  panels: PanelEntry[]
  push: (entry: PanelEntry) => void
  pop: () => void
  closeTo: (id: string) => void
  closeAll: () => void
  isOpen: boolean
}

// ── Context ──

const PanelStackContext = createContext<PanelStackContextValue | null>(null)

export function usePanelStack() {
  const ctx = useContext(PanelStackContext)
  if (!ctx) throw new Error('usePanelStack must be used within PanelStackProvider')
  return ctx
}

// ── Provider ──

export function PanelStackProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [panels, setPanels] = useState<PanelEntry[]>([])

  // Close all panels on route change
  useEffect(() => {
    setPanels([])
  }, [location.pathname])

  const push = useCallback((entry: PanelEntry) => {
    setPanels(prev => {
      // Replace if same id exists
      const existing = prev.findIndex(p => p.id === entry.id)
      if (existing !== -1) {
        const next = [...prev]
        next[existing] = entry
        return next
      }
      return [...prev, entry]
    })
  }, [])

  const pop = useCallback(() => {
    setPanels(prev => prev.slice(0, -1))
  }, [])

  const closeTo = useCallback((id: string) => {
    setPanels(prev => {
      const idx = prev.findIndex(p => p.id === id)
      if (idx === -1) return prev
      return prev.slice(0, idx + 1)
    })
  }, [])

  const closeAll = useCallback(() => {
    setPanels([])
  }, [])

  return (
    <PanelStackContext.Provider value={{ panels, push, pop, closeTo, closeAll, isOpen: panels.length > 0 }}>
      {children}
    </PanelStackContext.Provider>
  )
}

// ── Constants ──

const PANEL_WIDTH = 720
const PEEK_WIDTH = 48

// ── Panel Stack Container ──
// Panels stick to the RIGHT edge and slide in from the right.
// Hierarchy: active panel on the right, peek strips further right.
// Layout: [dimmed overlay] [active panel 480px] [peek strips 48px each]

export function PanelStackContainer({ isJa }: { isJa?: boolean }) {
  const { panels, closeTo, closeAll, pop } = usePanelStack()

  // Keyboard: Escape closes top panel
  useEffect(() => {
    if (panels.length === 0) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') pop()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [panels.length, pop])

  if (panels.length === 0) return null

  // Active panel is the last in the array
  const activePanel = panels[panels.length - 1]
  // Peek strips are all panels except the last, shown in reverse order
  // (most recent peek closest to active panel, oldest on far right)
  const peekPanels = panels.slice(0, -1).reverse()

  return (
    <div className="absolute inset-0 z-30 flex">
      {/* Click-to-close overlay on the left */}
      <div
        className="flex-grow bg-black/10 cursor-pointer animate-fade-in"
        onClick={closeAll}
      />

      {/* Panel stack area — right-aligned */}
      <div className="relative flex h-full flex-shrink-0">
        {/* ── Active panel ── */}
        <div
          key={activePanel.id}
          className="relative h-full flex-shrink-0 bg-white shadow-2xl panel-slide-in-right overflow-hidden flex flex-col"
          style={{ width: PANEL_WIDTH }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-end px-5 pt-4 pb-1 flex-shrink-0">
            <button
              onClick={pop}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-micro"
              aria-label="Close panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* Panel content — scrollable */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-5 pb-6">
            {activePanel.content}
          </div>
        </div>

        {/* ── Peek strips (right of active panel) ── */}
        {peekPanels.map(panel => {
          const title = isJa && panel.titleJa ? panel.titleJa : panel.title
          return (
            <div
              key={panel.id}
              className="relative h-full flex-shrink-0 bg-white border-l border-neutral-200 cursor-pointer group transition-all duration-200 hover:bg-neutral-50"
              style={{ width: PEEK_WIDTH }}
              onClick={() => closeTo(panel.id)}
              title={title}
            >
              {/* Vertical title */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <span
                  className="text-caption font-medium text-neutral-400 group-hover:text-neutral-600 whitespace-nowrap transition-micro"
                  style={{ writingMode: 'vertical-lr' }}
                >
                  {title}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
