import React from 'react'
import { useTranslation } from 'react-i18next'
import { KpiCard } from '../../components/ui'
import { Users, TrendingUp, Activity, Star } from 'lucide-react'

export function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Users" value="1,234" trend="up" change={12} icon={<Users size={18} />} />
        <KpiCard label="Active Sessions" value="89" trend="up" change={5} icon={<Activity size={18} />} />
        <KpiCard label="Growth" value="24%" trend="up" change={3} icon={<TrendingUp size={18} />} />
        <KpiCard label="Satisfaction" value="4.8" trend="flat" change={0} icon={<Star size={18} />} />
      </div>

      <div className="bg-white rounded-card border border-neutral-100 p-6">
        <h2 className="text-section-title text-neutral-900 mb-2">Welcome to the template</h2>
        <p className="text-body text-neutral-500">
          This is a base template with the shell (sidebar, header, panel stack, command palette) already wired up.
          Replace this content with your application pages.
        </p>
      </div>
    </div>
  )
}
