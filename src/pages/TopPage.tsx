import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart2, Briefcase, BookOpen, Users } from 'lucide-react'
import { MODULES, getScenesByModule } from '../demo-data'
import type { Module } from '../demo-data'

const MODULE_CONFIG: Record<Module, {
  icon: React.ElementType
  color: string
  bgLight: string
  borderColor: string
  textColor: string
  description: string
}> = {
  platform: {
    icon: BarChart2,
    color: 'bg-[#1A58AF]',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-[#1A58AF]',
    description: 'スキルタクソノミー定義・組織分析・タレント管理・育成計画',
  },
  recruiting: {
    icon: Users,
    color: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    description: 'アセスメント配信・ワークフロー・AIインタビュー評価',
  },
  learning: {
    icon: BookOpen,
    color: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    description: '学習管理・受講分析・AIコンテンツ生成・バッジ認定',
  },
  workforce: {
    icon: Briefcase,
    color: 'bg-violet-600',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    description: '要員計画の自動化・プロジェクト管理・スキルマッチング',
  },
}

export function TopPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8 pb-8">
      {/* Minimap Hero */}
      <div className="rounded-2xl overflow-hidden border border-neutral-100 relative">
        <img
          src="/track_minimap.png"
          alt="Track Platform Overview"
          className="w-full object-cover"
          style={{ maxHeight: '360px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A58AF]/80 via-[#1A58AF]/40 to-transparent flex items-end">
          <div className="p-8 max-w-xl">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">
              Skill Intelligence Platform
            </p>
            <h1 className="text-white text-3xl font-bold leading-snug mb-3">
              Track Platform
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              スキルデータを起点に、採用・育成・配置・評価を一気通貫で最適化する
              AI／デジタル人材向けスキルインテリジェンスプラットフォーム
            </p>
          </div>
        </div>
      </div>

      {/* 4 Module Cards */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900 mb-4">機能カテゴリー</h2>
        <div className="grid grid-cols-2 gap-4">
          {MODULES.map(mod => {
            const cfg = MODULE_CONFIG[mod.id]
            const Icon = cfg.icon
            const scenes = getScenesByModule(mod.id)
            return (
              <button
                key={mod.id}
                onClick={() => navigate(`/${mod.id}`)}
                className={`text-left rounded-xl border ${cfg.borderColor} bg-white p-5 hover:shadow-md transition-all group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cfg.color}`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <ArrowRight size={16} className={`${cfg.textColor} opacity-0 group-hover:opacity-100 transition-opacity mt-1`} />
                </div>
                <div className="font-semibold text-neutral-900 text-sm mb-1">{mod.label}</div>
                <div className="text-xs text-neutral-500 mb-3 leading-relaxed">{cfg.description}</div>
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.borderColor} ${cfg.bgLight} ${cfg.textColor}`}>
                  {scenes.length} シーン
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Full scene index */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900 mb-4">デモシーン一覧</h2>
        <div className="space-y-5">
          {MODULES.map(mod => {
            const cfg = MODULE_CONFIG[mod.id]
            const Icon = cfg.icon
            const scenes = getScenesByModule(mod.id)
            return (
              <div key={mod.id}>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border mb-2 ${cfg.borderColor} ${cfg.bgLight} ${cfg.textColor}`}>
                  <Icon size={12} />
                  {mod.label}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {scenes.map(scene => (
                    <button
                      key={scene.id}
                      onClick={() => navigate(`/${mod.id}/${scene.id}`)}
                      className={`text-left px-3 py-2.5 rounded-lg border border-neutral-100 bg-white hover:${cfg.borderColor} hover:${cfg.bgLight} hover:${cfg.textColor} transition-all text-xs text-neutral-700`}
                    >
                      <span className="text-neutral-400 mr-1">
                        {String(scene.no).padStart(2, '0')}.
                      </span>
                      {scene.scene}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
