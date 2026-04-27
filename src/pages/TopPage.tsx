import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart2, Briefcase, BookOpen, Users } from 'lucide-react'
import { MODULES, getScenesByModule } from '../demo-data'
import type { Module } from '../demo-data'
import { useT, useLang } from '../lang-context'

const MODULE_CONFIG: Record<Module, {
  icon: React.ElementType
  color: string
  bgLight: string
  borderColor: string
  textColor: string
  descJa: string
  descEn: string
}> = {
  platform: {
    icon: BarChart2,
    color: 'bg-[#1A58AF]',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-[#1A58AF]',
    descJa: 'スキルタクソノミー定義・組織分析・タレント管理・育成計画',
    descEn: 'Skill taxonomy, org analysis, talent management & development planning',
  },
  recruiting: {
    icon: Users,
    color: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    descJa: 'アセスメント配信・ワークフロー・AIインタビュー評価',
    descEn: 'Assessment delivery, workflow automation & AI interview evaluation',
  },
  learning: {
    icon: BookOpen,
    color: 'bg-sky-500',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
    descJa: '学習管理・受講分析・AIコンテンツ生成・バッジ認定',
    descEn: 'Learning management, enrollment analytics, AI content & badge certification',
  },
  workforce: {
    icon: Briefcase,
    color: 'bg-violet-600',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    descJa: '要員計画の自動化・プロジェクト管理・スキルマッチング',
    descEn: 'Workforce planning automation, project management & skill matching',
  },
}

export function TopPage() {
  const navigate = useNavigate()
  const t = useT()
  const lang = useLang()

  return (
    <div className="space-y-8 pb-8">
      {/* Hero text */}
      <div className="bg-gradient-to-r from-[#1A58AF] to-[#1A58AF]/80 rounded-2xl px-8 py-6">
        <h1 className="text-white text-xl font-bold leading-snug mb-2">
          Track Skill Intelligence Platform
        </h1>
        <p className="text-blue-200 text-sm font-medium leading-snug mb-3">
          {t(
            '経営と現場をスキルデータでつなぐ "スキルOS経営" を実現する「スキルインテリジェンス」',
            'Connecting Management and Frontline with Skill Data — Realizing "Skill OS Management"',
          )}
        </p>
        <p className="text-blue-100 text-xs leading-relaxed">
          {t(
            '客観的なスキルデータに基づく人材・組織戦略の意思決定を実現する「スキルインテリジェンス基盤」を構築。従来のタレントマネジメントシステムに格納されている人材データに「スキル評価」という新たなものさしを加え、経営と現場をスキルデータで繋ぎ、意思決定を支援する"スキルOS経営"を実現します。',
            'Build a Skill Intelligence foundation that enables data-driven talent and organizational strategy decisions. Add a "skill assessment" dimension to existing talent data, bridging management and frontline through skill data to realize "Skill OS Management".',
          )}
        </p>
      </div>

      {/* Minimap image */}
      <img
        src={lang === 'en' ? '/track_minimap_EN.png' : '/track_minimap.png'}
        alt="Track Platform Overview"
        className="w-full h-auto block max-h-72 object-contain object-top"
      />

      {/* 4 Module Cards */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900 mb-4">
          {t('機能カテゴリー', 'Feature Categories')}
        </h2>
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
                <div className="text-xs text-neutral-500 mb-3 leading-relaxed">
                  {t(cfg.descJa, cfg.descEn)}
                </div>
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.borderColor} ${cfg.bgLight} ${cfg.textColor}`}>
                  {scenes.length} {t('シーン', 'scenes')}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Full scene index */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900 mb-4">
          {t('デモシーン一覧', 'Demo Scene Index')}
        </h2>
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
                      {t(scene.scene, scene.sceneEn ?? scene.scene)}
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
