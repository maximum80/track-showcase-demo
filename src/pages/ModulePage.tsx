import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, User, Settings, TrendingUp, CheckCircle2 } from 'lucide-react'
import { MODULES, getScenesByModule } from '../demo-data'
import type { Module } from '../demo-data'

interface PitchContent {
  catchCopy: string
  subCopy: string
  sectionHeading: string
  problems: Array<{
    before: string
    afterHeading: string
    afterBody: string
  }>
}

const MODULE_PITCH: Record<Module, PitchContent> = {
  platform: {
    catchCopy: '経営と現場をスキルデータでつなぐ "スキルOS経営" を実現する「スキルインテリジェンス」',
    subCopy: '客観的なスキルデータに基づく人材・組織戦略の意思決定を実現する「スキルインテリジェンス基盤」を構築。従来のタレントマネジメントシステムに格納されている人材データに「スキル評価」という新たなものさしを加え、経営と現場をスキルデータで繋ぎ、意思決定を支援する"スキルOS経営"を実現します。',
    sectionHeading: '分断された施策・人材の管理から脱却し、スキルデータに基づいて人材・組織戦略の意思決定をする組織へ',
    problems: [
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
    ],
  },
  recruiting: {
    catchCopy: 'AIでオペレーションを自動化する\n次世代採用ソリューション',
    subCopy: 'スカウト、スクリーニング、面接、評価などの人事オペレーションをAIで最適化することで、採用の精度とスピードを向上。',
    sectionHeading: '人事をオペレーション業務から解き放ち、候補者に向き合う時間をつくる',
    problems: [
      {
        before: '採用オペレーションの肥大化',
        afterHeading: 'AIで採用オペレーションを自動化',
        afterBody: 'スクリーニングや日程調整、評価データの管理をAIが担い、人事の業務負荷を大幅に削減。オペレーションから解放された人事が候補者との対話や意思決定に集中できる採用プロセスを実現。',
      },
      {
        before: '採用の精度とスピードの両立が困難',
        afterHeading: 'AIによる採用プロセスの最適化',
        afterBody: 'スカウトからスクリーニング、面接、評価までをAIが一貫して最適化。候補者データと評価結果をもとに、再現性のある判断を支援し、採用の精度とスピードを同時に向上。',
      },
    ],
  },
  learning: {
    catchCopy: '実務に求められる「スキルギャップ」を埋めるための「学習プラットフォーム」',
    subCopy: '既存のeラーニングや、タレントマネジメントシステムに散在する学習データをスキル軸で統合し、人的資本データとして資産化。スキルデータを元にAIによる個別最適なラーニングパスを作成し、従業員が自律的に学び続けるカルチャーをつくる、次世代のラーニングエクスペリエンスプラットフォーム（LXP）です。',
    sectionHeading: '「成果につながらないeラーニング」から脱却。「スキルギャップを埋める」学習環境を作る。',
    problems: [
      {
        before: '採用・育成・配置・評価の分断による「人事施策・システムの分散」',
        afterHeading: 'スキルギャップを埋める"自律的学習"の実現',
        afterBody: 'Track Learningは、目指すべきロール（PdM・ソフトウェアエンジニア等）に基づき、個々のスキルギャップを可視化。そこから最適な学習プランを提示します。「何を学ぶべきか分からない」という迷いをなくし、受け身ではなく自律的に学び続けられる環境を構築します。',
      },
      {
        before: '学習データの分断、学習成果が不明瞭',
        afterHeading: '学習データの統合と"人的資本"としての資産化',
        afterBody: 'Track Learningは、目指すべきロール（PdM・ソフトウェアエンジニア等）に基づき、個々のスキルギャップを可視化。そこから最短ルートとなる学習プランを自動提示します。「何を学ぶべきか分からない」という迷いをなくし、受け身ではなく自律的に学び続けられる環境を構築します。',
      },
    ],
  },
  workforce: {
    catchCopy: 'スキルファーストで最適なチーム編成を実現する「要員計画プラットフォーム」',
    subCopy: 'プロジェクトの情報を解析し、社内人材データと外部タレントプールから最もスキルにマッチした人材を自動提案。属人的なアサインから脱却し、安定したプロジェクト運営を実現します。',
    sectionHeading: 'プロジェクトの利益率低下とデリバリー品質の課題を「スキルの可視化」で防ぐ',
    problems: [
      {
        before: '属人的な要員計画による収益・品質リスク',
        afterHeading: 'スキルに基づく要員アサインの支援',
        afterBody: 'Track Workforceは、要員計画に必要なデータ、評価ロジックを統合したスキルインテリジェンス基盤を活用し、「スキルファースト」な人材アサイン検討を支援します。RFPや要求資料から求められる役割・スキル要件を整理し、社内の人材データや外部タレント情報と照合することで、属人的な判断だけに依存しない候補検討を可能にします。',
      },
      {
        before: '外部人材のスキルを客観的に評価・比較できない',
        afterHeading: 'スキル情報に基づく配置検討と単価妥当性の確認',
        afterBody: '外部ビジネスパートナー（BP）を含む人材情報を一元的に管理し、スキルや評価観点に基づいて比較・検討できる環境を整備。継続的な取引関係や個別判断のみに依存しない配置検討が可能となり、スキル水準に応じた単価設計や収益管理の精度向上を支援します。',
      },
    ],
  },
}

export function ModulePage() {
  const { module } = useParams<{ module: string }>()
  const navigate = useNavigate()

  const mod = MODULES.find(m => m.id === module)
  if (!mod) return <div className="text-neutral-400">モジュールが見つかりません</div>

  const scenes = getScenesByModule(mod.id as Module)
  const adminScenes = scenes.filter(s => s.perspective === '管理者')
  const userScenes = scenes.filter(s => s.perspective === 'ユーザー')
  const pitch = MODULE_PITCH[mod.id as Module]

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
      {/* Catch copy + sub copy */}
      <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-6 py-5">
        <h2 className="text-base font-bold text-neutral-900 leading-snug mb-3 whitespace-pre-line">
          {pitch.catchCopy}
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed">{pitch.subCopy}</p>
      </div>

      {/* Problem → Solution section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-[#1A58AF]" />
          <h2 className="text-sm font-semibold text-neutral-800 leading-snug">{pitch.sectionHeading}</h2>
        </div>
        <div className="space-y-3">
          {pitch.problems.map((p, i) => (
            <div key={i} className="rounded-xl border border-neutral-100 bg-white overflow-hidden">
              {/* Before */}
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-100 flex items-start gap-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-200 text-neutral-600 shrink-0 mt-0.5">Before</span>
                <p className="text-xs text-neutral-600 leading-relaxed">{p.before}</p>
              </div>
              {/* After */}
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
