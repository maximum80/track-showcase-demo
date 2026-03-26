import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Search, LayoutDashboard, FileText, Settings, ArrowRight,
} from 'lucide-react'
import { cn } from '../ui'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

interface CommandItem {
  id: string
  label: string
  labelJa: string
  icon: React.ElementType
  category: string
  action: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const isJa = i18n.language === 'ja'

  const commands: CommandItem[] = [
    { id: 'nav-dash', label: 'Go to Dashboard', labelJa: 'ダッシュボードへ', icon: LayoutDashboard, category: 'Navigation', action: () => navigate('/dashboard') },
    { id: 'nav-example', label: 'Go to Example Page', labelJa: 'サンプルページへ', icon: FileText, category: 'Navigation', action: () => navigate('/example') },
    { id: 'nav-settings', label: 'Go to Settings', labelJa: '設定へ', icon: Settings, category: 'Navigation', action: () => navigate('/settings') },
  ]

  const filtered = query
    ? commands.filter(c => {
        const text = isJa ? c.labelJa : c.label
        return text.toLowerCase().includes(query.toLowerCase())
      })
    : commands.slice(0, 8)

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      filtered[selectedIdx].action()
      onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  // Group by category
  const groups: Record<string, CommandItem[]> = {}
  filtered.forEach(item => {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  })

  let flatIdx = 0

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-xl mx-4 animate-scale-in overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 h-12 border-b border-neutral-100">
          <Search size={18} className="text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('common.type_command')}
            className="flex-1 bg-transparent text-body placeholder:text-neutral-400 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-100 rounded text-tiny text-neutral-400">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-caption text-neutral-400">
              {t('common.no_results')}
            </div>
          ) : (
            Object.entries(groups).map(([category, items]) => (
              <div key={category}>
                <div className="px-4 py-1.5 text-tiny font-semibold text-neutral-400 uppercase tracking-wider">
                  {category}
                </div>
                {items.map(item => {
                  const idx = flatIdx++
                  return (
                    <button
                      key={item.id}
                      onClick={() => { item.action(); onClose() }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2 text-body text-left transition-micro',
                        idx === selectedIdx ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50',
                      )}
                    >
                      <item.icon size={16} className="shrink-0 text-neutral-400" />
                      <span className="flex-1 truncate">{isJa ? item.labelJa : item.label}</span>
                      <ArrowRight size={14} className="text-neutral-300" />
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
