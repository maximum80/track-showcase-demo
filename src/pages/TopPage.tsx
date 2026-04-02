import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart2, Briefcase, BookOpen, Users, TrendingUp, CheckCircle2 } from 'lucide-react'
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
    color: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    description: 'アセスメント配信・ワークフロー・AIインタビュー評価',
  },
  learning: {
    icon: BookOpen,
    color: 'bg-sky-500',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
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
      {/* Hero text */}
      <div className="bg-gradient-to-r from-[#1A58AF] to-[#1A58AF]/80 rounded-2xl px-8 py-6">
        <h1 className="text-white text-xl font-bold leading-snug mb-2">
          Track Skill Intelligence Platform
        </h1>
        <p className="text-blue-200 text-sm font-medium leading-snug mb-3">
          経営と現場をスキルデータでつなぐ "スキルOS経営" を実現する「スキルインテリジェンス」
        </p>
        <p className="text-blue-100 text-xs leading-relaxed">
          客観的なスキルデータに基づく人材・組織戦略の意思決定を実現する「スキルインテリジェンス基盤」を構築。従来のタレントマネジメントシステムに格納されている人材データに「スキル評価」という新たなものさしを加え、経営と現場をスキルデータで繋ぎ、意思決定を支援する"スキルOS経営"を実現します。
        </p>
      </div>

      {/* Minimap image */}
      <div className="rounded-xl overflow-hidden border border-neutral-100">
        <img
          src="/track_minimap.png"
          alt="Track Platform Overview"
          className="w-full h-auto block"
        />
      </div>

      {/* Platform pitch content */}
      <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-6 py-5">
        <h2 className="text-base font-bold text-neutral-900 leading-snug mb-3">
          経営と現場をスキルデータでつなぐ "スキルOS経営" を実現する「スキルインテリジェンス」
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          客観的なスキルデータに基づく人材・組織戦略の意思決定を実現する「スキルインテリジェンス基盤」を構築。従来のタレントマネジメントシステムに格納されている人材データに「スキル評価」という新たなものさしを加え、経営と現場をスキルデータで繋ぎ、意思決定を支援する"スキルOS経営"を実現します。
        </p>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-[#1A58AF]" />
          <h2 className="text-sm font-semibold text-neutral-800 leading-snug">
            分断された施策・人材の管理から脱却し、スキルデータに基づいて人材・組織戦略の意思決定をする組織へ
          </h2>
        </div>
        <div className="space-y-3">
          {[
            {
              before: '自己申告や静的データに依存した「スキル実態の不透明化」',
              afterHeading: '客観的なスキルデータを可視化・統合する基盤',
              afterBody: '従来の静的な人材データの記録・管理に加え、実務ログやアセスメントに基づく客観的なスキルデータを可視化・統合。自己申告による限界を補完し、一貫した人材・組織戦略の意思決定をより強固にする「スキルインテリジェンス基盤」を構築します。',
            },
            {
              before: '採用・育成・配置・評価の分断による「人事施策・システムの分散」',
              afterHeading: 'データドリブンな意思決定と一貫した施策実行',
              afterBody: '構築した基盤を軸に、分散しがちな採用・育成・配置のプロセスをシームレスに連動させます。データドリブンなタレント需給予測から最適配置・個別育成までが機能する仕組みを組織に実装し、事業変革に対応する人材ポートフォリオの構築とデジタルケイパビリティの底上げを実現します。',
            },
          ].map((p, i) => (
            <div key={i} className="rounded-xl border border-neutral-100 bg-white overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-100 flex items-start gap-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-200 text-neutral-600 shrink-0 mt-0.5">Before</span>
                <p className="text-xs text-neutral-600 leading-relaxed">{p.before}</p>
              </div>
              <div className="px-4 py-3 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#1A58AF] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#1A58AF] mb-1">{p.afterHeading}</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{p.afterBody}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
