import React from 'react'
import { type LucideIcon, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronRight, X, Check, Search } from 'lucide-react'

// ── Utility ──
export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

// ── Button ──
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const btnBase = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-micro focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
const btnVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-primary/10 text-primary hover:bg-primary/15 active:bg-primary/20',
  ghost: 'text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200',
  danger: 'bg-negative text-white hover:bg-negative-600 active:bg-negative-700',
  outline: 'border border-primary text-primary hover:bg-primary/10 active:bg-primary/15',
}
const btnSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-caption font-bold',
  md: 'h-12 px-4 py-3.5 text-body font-bold',
  lg: 'h-12 px-6 text-body font-bold',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
}

export function Button({ variant = 'primary', size = 'md', icon: Icon, children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(btnBase, btnVariants[variant], btnSizes[size], className)} {...props}>
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  )
}

// ── Badge ──
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'
const badgeColors: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  success: 'bg-positive-50 text-positive-700 border-positive-200',
  warning: 'bg-warning-50 text-warning-700 border-warning-200',
  danger: 'bg-negative-50 text-negative-700 border-negative-200',
  info: 'bg-primary-50 text-primary-700 border-primary-200',
  muted: 'bg-neutral-50 text-neutral-500',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  dot?: boolean
  className?: string
}

export function Badge({ variant = 'default', children, dot, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 text-tiny font-medium rounded-full border border-transparent', badgeColors[variant], className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', variant === 'success' ? 'bg-positive' : variant === 'warning' ? 'bg-warning' : variant === 'danger' ? 'bg-negative' : variant === 'info' ? 'bg-primary' : 'bg-neutral-400')} />}
      {children}
    </span>
  )
}

// ── Avatar ──
interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const avatarSizes = { sm: 'w-7 h-7 text-tiny', md: 'w-9 h-9 text-caption', lg: 'w-12 h-12 text-body' }
const avatarColors = ['bg-primary', 'bg-positive', 'bg-warning-600', 'bg-secondary-600', 'bg-negative', 'bg-accent', 'bg-primary-700', 'bg-secondary-700']

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const colorIdx = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % avatarColors.length
  if (src) {
    return <img src={src} alt={name} className={cn('rounded-full object-cover', avatarSizes[size], className)} />
  }
  return (
    <div className={cn('rounded-full flex items-center justify-center text-white font-medium', avatarSizes[size], avatarColors[colorIdx], className)}>
      {initials}
    </div>
  )
}

// ── AvatarGroup ──
export function AvatarGroup({ names, max = 3 }: { names: string[]; max?: number }) {
  const shown = names.slice(0, max)
  const rest = names.length - max
  return (
    <div className="flex -space-x-2">
      {shown.map(n => (
        <Avatar key={n} name={n} size="sm" className="ring-2 ring-white" />
      ))}
      {rest > 0 && (
        <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-600 text-tiny font-medium flex items-center justify-center ring-2 ring-white">
          +{rest}
        </div>
      )}
    </div>
  )
}

// ── Card (Compound) ──
function CardFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('bg-white rounded-card border border-neutral-100', className)}>
      {children}
    </div>
  )
}

function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>
}

export const Card = Object.assign(CardFrame, {
  Body: CardBody,
})

// ── KPI Card ──
interface KpiCardProps {
  label: string
  value: string
  change?: number
  trend?: 'up' | 'down' | 'flat'
  icon?: React.ReactNode
}

export function KpiCard({ label, value, change, trend, icon }: KpiCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-positive-600' : trend === 'down' ? 'text-negative' : 'text-neutral-400'
  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-caption text-neutral-500 font-medium">{label}</span>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="text-kpi text-neutral-900">{value}</div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 mt-2 text-caption font-medium', trendColor)}>
          <TrendIcon size={14} />
          <span>{change > 0 ? '+' : ''}{change}%</span>
          <span className="text-neutral-400 font-normal ml-1">vs last month</span>
        </div>
      )}
    </div>
  )
}

// ── Input ──
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
}

export function Input({ label, error, icon: Icon, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-caption font-medium text-neutral-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon size={16} />
          </div>
        )}
        <input
          className={cn(
            'w-full h-9 rounded-lg border border-neutral-100 bg-white px-3 text-body placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-micro',
            Icon && 'pl-9',
            error && 'border-negative-400 focus:ring-negative/30',
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-tiny text-negative">{error}</p>}
    </div>
  )
}

// ── SearchInput ──
export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="w-full h-9 pl-9 pr-3 rounded-lg border border-neutral-100 bg-white text-body placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-micro"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
          <X size={14} />
        </button>
      )}
    </div>
  )
}

// ── Select ──
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-caption font-medium text-neutral-700">{label}</label>}
      <select
        className={cn('h-9 rounded-lg border border-neutral-100 bg-white px-3 pr-8 text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-micro appearance-none', className)}
        {...props}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

// ── Tabs ──
interface TabsProps {
  tabs: { id: string; label: string; icon?: LucideIcon; count?: number }[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-0 border-b border-neutral-100', className)}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 text-body font-medium border-b-2 transition-micro -mb-px',
            active === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300',
          )}
        >
          {tab.icon && <tab.icon size={16} />}
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn('text-tiny px-1.5 py-0.5 rounded-full', active === tab.id ? 'bg-primary-100 text-primary' : 'bg-neutral-100 text-neutral-500')}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Toggle Group (View Switcher) ──
interface ToggleGroupProps {
  options: { id: string; label: string; icon?: LucideIcon }[]
  value: string
  onChange: (id: string) => void
}

export function ToggleGroup({ options, value, onChange }: ToggleGroupProps) {
  return (
    <div className="flex rounded-lg border border-neutral-100 overflow-hidden">
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            'flex items-center gap-1.5 px-3 h-8 text-caption font-medium transition-micro',
            value === opt.id ? 'bg-primary text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50',
            opt.id !== options[0].id && 'border-l border-neutral-100',
          )}
        >
          {opt.icon && <opt.icon size={14} />}
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ── Collapsible Section ──
interface CollapsibleProps {
  title: string
  defaultOpen?: boolean
  count?: number
  children: React.ReactNode
}

export function Collapsible({ title, defaultOpen = true, count, children }: CollapsibleProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full py-2 text-caption font-semibold text-neutral-500 uppercase tracking-wider hover:text-neutral-700"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {title}
        {count !== undefined && <span className="text-neutral-400 font-normal normal-case">({count})</span>}
      </button>
      {open && children}
    </div>
  )
}

// ── Progress Bar ──
export function ProgressBar({ value, max = 100, color = 'bg-primary', className }: { value: number; max?: number; color?: string; className?: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className={cn('w-full h-2 rounded-full bg-neutral-100 overflow-hidden', className)}>
      <div className={cn('h-full rounded-full transition-all duration-300', color)} style={{ width: `${pct}%` }} />
    </div>
  )
}

// ── Utilization Bar (colored by level) ──
export function UtilizationBar({ value }: { value: number }) {
  const color = value > 100 ? 'bg-negative' : value >= 80 ? 'bg-positive' : value >= 50 ? 'bg-warning' : value > 0 ? 'bg-primary-400' : 'bg-neutral-200'
  const textColor = value > 100 ? 'text-negative-600' : value >= 80 ? 'text-positive-600' : value >= 50 ? 'text-warning-600' : value > 0 ? 'text-primary-600' : 'text-neutral-400'
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-300', color)} style={{ width: `${Math.min(value, 120)}%` }} />
      </div>
      <span className={cn('text-caption font-medium tabular-nums', textColor)}>{value}%</span>
    </div>
  )
}

// ── Skill Badge ──
export function SkillBadge({ name, level }: { name: string; level: number }) {
  const dots = Array.from({ length: 5 }, (_, i) => i < level)
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-neutral-50 rounded-lg text-caption">
      {name}
      <span className="flex gap-0.5">
        {dots.map((filled, i) => (
          <span key={i} className={cn('w-1 h-1 rounded-full', filled ? 'bg-primary' : 'bg-neutral-200')} />
        ))}
      </span>
    </span>
  )
}

// ── Modal / Overlay ──
interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const modalSizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl' }

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative bg-white rounded-lg shadow-xl w-full mx-4 animate-scale-in', modalSizes[size])}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="text-section text-neutral-900">{title}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-micro">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}

// ── Sheet (Slide-over panel) ──
interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  width?: string
}

export function Sheet({ open, onClose, title, children, width = 'w-[480px]' }: SheetProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className={cn('relative bg-white h-full shadow-xl animate-slide-in overflow-y-auto', width)}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="text-section text-neutral-900">{title}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-micro">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}

// ── Empty State ──
export function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
        <Icon size={24} className="text-neutral-400" />
      </div>
      <h3 className="text-body font-medium text-neutral-700">{title}</h3>
      {description && <p className="text-caption text-neutral-500 mt-1 max-w-sm">{description}</p>}
    </div>
  )
}

// ── Checkbox (selection) ──
export function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'w-4 h-4 rounded border transition-micro flex items-center justify-center',
        checked ? 'bg-primary border-primary' : 'border-neutral-300 hover:border-neutral-400',
      )}
    >
      {checked && <Check size={12} className="text-white" />}
    </button>
  )
}

// ── Tooltip (hover) ──
export function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-neutral-900 text-white text-tiny rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-micro pointer-events-none z-50">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45 -mt-1" />
      </div>
    </div>
  )
}

// ── Density Toggle ──
export function DensityToggle({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { id: 'compact', label: 'Compact', bars: [2, 2, 2] },
    { id: 'default', label: 'Default', bars: [3, 3, 3] },
    { id: 'comfortable', label: 'Comfortable', bars: [4, 4, 4] },
  ]
  return (
    <div className="flex items-center gap-1 rounded-lg border border-neutral-100 p-0.5">
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          title={opt.label}
          className={cn(
            'flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-micro',
            value === opt.id ? 'bg-primary-50 text-primary' : 'text-neutral-400 hover:text-neutral-600',
          )}
        >
          {opt.bars.map((h, i) => (
            <div key={i} className={cn('w-4 rounded-sm bg-current')} style={{ height: h }} />
          ))}
        </button>
      ))}
    </div>
  )
}
