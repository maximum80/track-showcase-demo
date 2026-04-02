import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, User, Settings } from 'lucide-react'
import { MODULES, getScenesByModule } from '../demo-data'
import type { Module } from '../demo-data'

const MODULE_DESCRIPTIONS: Record<Module, string> = {
  platform:   'スキルタクソノミー定義・組織分析・タレント管理・育成計画まで、スキルファーストな人材戦略を支えるコアプラットフォーム。',
  recruiting: 'アセスメント配信・ワークフロー構築・AIインタビューで、採用・評価をデータドリブンに変革するリクルーティング機能。',
  learning:   '学習管理・受講分析・AIコンテンツ生成・バッジ認定まで、一人ひとりの学習体験を最適化するラーニング機能。',
  workforce:  '要員計画の自動化・プロジェクトマッチング・稼働管理まで、労働力配置を最適化するWorkforce機能。',
}

export function ModulePage() {
  const { module } = useParams<{ module: string }>()
  const navigate = useNavigate()

  const mod = MODULES.find(m => m.id === module)
  if (!mod) return <div className="text-neutral-400">モジュールが見つかりません</div>

  const scenes = getScenesByModule(mod.id as Module)
  const adminScenes = scenes.filter(s => s.perspective === '管理者')
  const userScenes = scenes.filter(s => s.perspective === 'ユーザー')

  const SceneCard = ({ scene }: { scene: typeof scenes[0] }) => (
    <button
      onClick={() => navigate(`/${module}/${scene.id}`)}
      className="text-left w-full rounded-xl border border-neutral-100 bg-white p-5 hover:shadow-md hover:border-primary-200 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-tiny font-medium border ${
              scene.perspective === '管理者'
                ? 'bg-primary-50 text-primary border-primary-100'
                : 'bg-secondary-50 text-secondary-700 border-secondary-100'
            }`}>
              {scene.perspective === '管理者' ? <Settings size={10} /> : <User size={10} />}
              {scene.perspective}
            </span>
          </div>
          <div className="font-semibold text-neutral-900 text-body leading-snug group-hover:text-primary transition-colors">
            {scene.scene}
          </div>
        </div>
        <ChevronRight size={16} className="text-neutral-300 group-hover:text-primary transition-colors shrink-0 mt-1" />
      </div>
    </button>
  )

  return (
    <div className="space-y-8 pb-8">
      {/* Module description */}
      <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-6 py-5">
        <div className="text-caption text-neutral-500 mb-1">{scenes.length} シーン</div>
        <p className="text-body text-neutral-600 leading-relaxed">{MODULE_DESCRIPTIONS[mod.id as Module]}</p>
      </div>

      {/* Admin perspective */}
      {adminScenes.length > 0 && (
        <section>
          <h2 className="text-subheading font-semibold text-neutral-900 mb-3 flex items-center gap-2">
            <Settings size={16} className="text-neutral-500" />
            管理者向け機能
          </h2>
          <div className="space-y-3">
            {adminScenes.map(s => <SceneCard key={s.id} scene={s} />)}
          </div>
        </section>
      )}

      {/* User perspective */}
      {userScenes.length > 0 && (
        <section>
          <h2 className="text-subheading font-semibold text-neutral-900 mb-3 flex items-center gap-2">
            <User size={16} className="text-neutral-500" />
            ユーザー向け機能
          </h2>
          <div className="space-y-3">
            {userScenes.map(s => <SceneCard key={s.id} scene={s} />)}
          </div>
        </section>
      )}
    </div>
  )
}
