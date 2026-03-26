export type UserRole = 'admin' | 'member' | 'viewer'
export type ViewMode = 'list' | 'kanban' | 'timeline'
export type Density = 'compact' | 'default' | 'comfortable'
export type Language = 'en' | 'ja'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}
