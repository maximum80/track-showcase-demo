export type Module = 'platform' | 'recruiting' | 'learning' | 'workforce'

export interface DemoScene {
  id: string
  no: number
  module: Module
  moduleLabel: string
  scene: string
  perspective: '管理者' | 'ユーザー'
  demoUrl?: string
}

export const MODULES: { id: Module; label: string; shortLabel: string }[] = [
  { id: 'platform',   label: 'Skill Platform', shortLabel: 'Platform' },
  { id: 'recruiting', label: 'Recruiting',      shortLabel: 'Recruiting' },
  { id: 'learning',   label: 'Learning',        shortLabel: 'Learning' },
  { id: 'workforce',  label: 'Workforce',       shortLabel: 'Workforce' },
]

export const DEMO_SCENES: DemoScene[] = [
  // ─── Skill Platform ────────────────────────────────────────────────────────
  { id: 'platform-01', no: 1,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'スキルタクソノミー一覧・ジョブ詳細定義書',            demoUrl: 'https://track-taxonomy.vercel.app' },
  { id: 'platform-02', no: 2,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'スキルタクソノミー生成・カスタマイズ・JD自動生成' },
  { id: 'platform-03', no: 3,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'ジョブレベル分析' },
  { id: 'platform-04', no: 4,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'スキルギャップ分析' },
  { id: 'platform-05', no: 5,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'タレント検索（スキル×ロール×レベル）' },
  { id: 'platform-06', no: 6,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'Hubユーザ紹介ページ' },
  { id: 'platform-07', no: 7,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'ケイパビリティ分析（育成計画・ラーニングパス承認）',  demoUrl: 'https://skill-platform-two.vercel.app/employee' },
  { id: 'platform-08', no: 8,  module: 'platform', moduleLabel: 'Skill Platform', perspective: 'ユーザー', scene: '新スキル調査UI',                                    demoUrl: 'https://skill-platform-two.vercel.app/employee' },
  { id: 'platform-09', no: 9,  module: 'platform', moduleLabel: 'Skill Platform', perspective: 'ユーザー', scene: 'スキルギャップ分析・ラーニングパス生成' },
  // ─── Recruiting ────────────────────────────────────────────────────────────
  { id: 'recruiting-01', no: 10, module: 'recruiting', moduleLabel: 'Recruiting', perspective: '管理者', scene: '配信設定（対象者・スケジュール）' },
  { id: 'recruiting-02', no: 11, module: 'recruiting', moduleLabel: 'Recruiting', perspective: '管理者', scene: 'ワークフロー構築' },
  { id: 'recruiting-03', no: 12, module: 'recruiting', moduleLabel: 'Recruiting', perspective: '管理者', scene: '受講者レポート' },
  { id: 'recruiting-04', no: 13, module: 'recruiting', moduleLabel: 'Recruiting', perspective: 'ユーザー', scene: 'AIインタビュー（マインド分析）',                     demoUrl: 'https://drive.google.com/file/d/1L3svC4uegYbyeey_7D8gTKa8jZYeDC72/view?usp=sharing' },
  // ─── Learning ──────────────────────────────────────────────────────────────
  { id: 'learning-01', no: 14, module: 'learning', moduleLabel: 'Learning', perspective: '管理者', scene: '受講状況ダッシュボード→Hubユーザ確認',                      demoUrl: 'https://track-elearning-prototype.vercel.app/admin/dashboard' },
  { id: 'learning-02', no: 15, module: 'learning', moduleLabel: 'Learning', perspective: '管理者', scene: '講座・受講分析（MAU・コホート等）',                          demoUrl: 'https://track-elearning-prototype.vercel.app/admin/dashboard' },
  { id: 'learning-03', no: 16, module: 'learning', moduleLabel: 'Learning', perspective: '管理者', scene: '講座登録・サードパーティ接続',                               demoUrl: 'https://track-elearning-prototype.vercel.app/admin/publish' },
  { id: 'learning-04', no: 17, module: 'learning', moduleLabel: 'Learning', perspective: '管理者', scene: '申込者管理',                                                demoUrl: 'https://track-elearning-prototype.vercel.app/admin/applications' },
  { id: 'learning-05', no: 18, module: 'learning', moduleLabel: 'Learning', perspective: 'ユーザー', scene: 'ラーニングパス進捗・Hubスキル自動反映',                    demoUrl: 'https://track-elearning-prototype.vercel.app/learner/track/my-learning' },
  { id: 'learning-06', no: 19, module: 'learning', moduleLabel: 'Learning', perspective: 'ユーザー', scene: 'AIスライドマテリアル' },
  { id: 'learning-07', no: 20, module: 'learning', moduleLabel: 'Learning', perspective: 'ユーザー', scene: 'バッジクレデンシャル',                                     demoUrl: 'https://track-elearning-prototype.vercel.app/learner/track/courses' },
  // ─── Workforce ─────────────────────────────────────────────────────────────
  { id: 'workforce-01', no: 21, module: 'workforce', moduleLabel: 'Workforce', perspective: 'ユーザー', scene: 'インターナルジョブポスティング・プロジェクト検索',        demoUrl: 'https://mock-workforce.vercel.app/talent-portal/jobs' },
  { id: 'workforce-02', no: 22, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'プロジェクト管理・AIサマリー生成',                         demoUrl: 'https://mock-workforce.vercel.app/projects/p1/ai-analyze' },
  { id: 'workforce-03', no: 23, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: '要員計画の自動化エージェント',                             demoUrl: 'https://mock-workforce.vercel.app/projects/p1/ai-analyze' },
  { id: 'workforce-04', no: 24, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'プロジェクトジョブロール自動生成',                         demoUrl: 'https://mock-workforce.vercel.app/projects/p1/contracts/c1?panel=role-edit-pr-c1-0%2Cjd-gen-c1' },
  { id: 'workforce-05', no: 25, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'タレント検索・マッチングレコメンド',                        demoUrl: 'https://mock-workforce.vercel.app/projects/p1/contracts/c1?panel=select-talent-pr-c1-0' },
  { id: 'workforce-06', no: 26, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'プロジェクトヘルス管理・営業連携・収支管理',                demoUrl: 'https://mock-workforce.vercel.app/projects/p1' },
  { id: 'workforce-07', no: 27, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: '稼働実績→Hubスキル自動反映' },
  { id: 'workforce-08', no: 28, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'ベンダーマネジメント',                                     demoUrl: 'https://mock-workforce.vercel.app/vendors' },
]

export function getScenesByModule(module: Module): DemoScene[] {
  return DEMO_SCENES.filter(s => s.module === module)
}

export function getSceneById(id: string): DemoScene | undefined {
  return DEMO_SCENES.find(s => s.id === id)
}
