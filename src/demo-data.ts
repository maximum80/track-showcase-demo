export type Module = 'platform' | 'recruiting' | 'learning' | 'workforce'

export interface DemoScene {
  id: string
  no: number
  module: Module
  moduleLabel: string
  scene: string
  perspective: '管理者' | 'ユーザー'
  driveFileId?: string  // Google Drive video file ID (column N)
}

export const MODULES: { id: Module; label: string; shortLabel: string }[] = [
  { id: 'platform',   label: 'Skill Platform', shortLabel: 'Platform' },
  { id: 'recruiting', label: 'Recruiting',      shortLabel: 'Recruiting' },
  { id: 'learning',   label: 'Learning',        shortLabel: 'Learning' },
  { id: 'workforce',  label: 'Workforce',       shortLabel: 'Workforce' },
]

export const DEMO_SCENES: DemoScene[] = [
  // ─── Skill Platform ────────────────────────────────────────────────────────
  { id: 'platform-01', no: 1,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'スキルタクソノミー一覧・ジョブ詳細定義書',            driveFileId: '16t0ZsHN8iDnZUUX_tTNFpfzqGb7BZM-c' },
  { id: 'platform-02', no: 2,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'スキルタクソノミー生成・カスタマイズ・JD自動生成',    driveFileId: '1SNQyxq5oLpH4h8W8mv3RU7VbwDwrS1tH' },
  { id: 'platform-03', no: 3,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'ジョブレベル分析',                                    driveFileId: '17ZNnMqNEBm9NIFeQ3NfFYwNWKB0-jY90' },
  { id: 'platform-04', no: 4,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'スキルギャップ分析',                                  driveFileId: '17ZNnMqNEBm9NIFeQ3NfFYwNWKB0-jY90' },
  { id: 'platform-05', no: 5,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'タレント検索（スキル×ロール×レベル）',                driveFileId: '1V2pOnW-agNV_rMgoRa4NJOM3De0AVrM8' },
  { id: 'platform-06', no: 6,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'Hubユーザ紹介ページ',                                 driveFileId: '1V2pOnW-agNV_rMgoRa4NJOM3De0AVrM8' },
  { id: 'platform-07', no: 7,  module: 'platform', moduleLabel: 'Skill Platform', perspective: '管理者', scene: 'ケイパビリティ分析（育成計画・ラーニングパス承認）',  driveFileId: '1Mmr9TJn1lutzAroytfDNNqTgZSIKH85q' },
  { id: 'platform-08', no: 8,  module: 'platform', moduleLabel: 'Skill Platform', perspective: 'ユーザー', scene: '新スキル調査UI',                                    driveFileId: '1vfxPHw7stgCHueM9005dO3rbyYSxKSkE' },
  { id: 'platform-09', no: 9,  module: 'platform', moduleLabel: 'Skill Platform', perspective: 'ユーザー', scene: 'スキルギャップ分析・ラーニングパス生成' },
  // ─── Recruiting ────────────────────────────────────────────────────────────
  { id: 'recruiting-01', no: 10, module: 'recruiting', moduleLabel: 'Recruiting', perspective: '管理者', scene: '配信設定（対象者・スケジュール）' },
  { id: 'recruiting-02', no: 11, module: 'recruiting', moduleLabel: 'Recruiting', perspective: '管理者', scene: 'ワークフロー構築',                                    driveFileId: '1TP3a3DU8WsOLl5KTnAVm6MGcg28v0PYi' },
  { id: 'recruiting-03', no: 12, module: 'recruiting', moduleLabel: 'Recruiting', perspective: '管理者', scene: '受講者レポート',                                      driveFileId: '1K-UKxi4i-SjNkxoYxAN9Y8lT_1mLmBdg' },
  { id: 'recruiting-04', no: 13, module: 'recruiting', moduleLabel: 'Recruiting', perspective: 'ユーザー', scene: 'AIインタビュー（マインド分析）',                     driveFileId: '1NcBiPCqwB8yv1AvbIDA_xK_gP-YytVvR' },
  // ─── Learning ──────────────────────────────────────────────────────────────
  { id: 'learning-01', no: 14, module: 'learning', moduleLabel: 'Learning', perspective: '管理者', scene: '受講状況ダッシュボード→Hubユーザ確認',                      driveFileId: '15TqV8cHZo9Z8gy1jYgjCdL2bpck4UMrm' },
  { id: 'learning-02', no: 15, module: 'learning', moduleLabel: 'Learning', perspective: '管理者', scene: '講座・受講分析（MAU・コホート等）',                          driveFileId: '15TqV8cHZo9Z8gy1jYgjCdL2bpck4UMrm' },
  { id: 'learning-03', no: 16, module: 'learning', moduleLabel: 'Learning', perspective: '管理者', scene: '講座登録・サードパーティ接続',                               driveFileId: '1wm0fYPCI_RSlvDCVPEkP0GG1xbda6-J-' },
  { id: 'learning-04', no: 17, module: 'learning', moduleLabel: 'Learning', perspective: '管理者', scene: '申込者管理',                                                driveFileId: '1Mt90HOKz32M6VnHih_IYcVTLSZ1rtOIc' },
  { id: 'learning-05', no: 18, module: 'learning', moduleLabel: 'Learning', perspective: 'ユーザー', scene: 'ラーニングパス進捗・Hubスキル自動反映',                    driveFileId: '156NCbmKPp-epzdhJIz5elXjeJecJO7Pg' },
  { id: 'learning-06', no: 19, module: 'learning', moduleLabel: 'Learning', perspective: 'ユーザー', scene: 'AIスライドマテリアル',                                    driveFileId: '156NCbmKPp-epzdhJIz5elXjeJecJO7Pg' },
  { id: 'learning-07', no: 20, module: 'learning', moduleLabel: 'Learning', perspective: 'ユーザー', scene: 'バッジクレデンシャル',                                     driveFileId: '156NCbmKPp-epzdhJIz5elXjeJecJO7Pg' },
  // ─── Workforce ─────────────────────────────────────────────────────────────
  { id: 'workforce-01', no: 21, module: 'workforce', moduleLabel: 'Workforce', perspective: 'ユーザー', scene: 'インターナルジョブポスティング・プロジェクト検索',        driveFileId: '1_0lA6jHm4Gra55tEH4Mx2m4RWF3xNdu7' },
  { id: 'workforce-02', no: 22, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'プロジェクト管理・AIサマリー生成',                         driveFileId: '1mJpi55Fl5H02nupUYwHF12OvvoqoS8cF' },
  { id: 'workforce-03', no: 23, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: '要員計画の自動化エージェント',                             driveFileId: '1mJpi55Fl5H02nupUYwHF12OvvoqoS8cF' },
  { id: 'workforce-04', no: 24, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'プロジェクトジョブロール自動生成',                         driveFileId: '1ERxMn0YYJU3qsLHZG84GszuZ4sPXl0KA' },
  { id: 'workforce-05', no: 25, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'タレント検索・マッチングレコメンド',                        driveFileId: '1VUeD3lyhJuWuRfd480VkGgNlUsFcuJXq' },
  { id: 'workforce-06', no: 26, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'プロジェクトヘルス管理・営業連携・収支管理',                driveFileId: '1Qizz8ZIR2DXTEyJCGO2JlCNsnwLZTSYN' },
  { id: 'workforce-07', no: 27, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: '稼働実績→Hubスキル自動反映' },
  { id: 'workforce-08', no: 28, module: 'workforce', moduleLabel: 'Workforce', perspective: '管理者', scene: 'ベンダーマネジメント',                                     driveFileId: '1dOe5d-gghbrkhsQ9R-2QMZifZUxsGmiM' },
]

export function getScenesByModule(module: Module): DemoScene[] {
  return DEMO_SCENES.filter(s => s.module === module && s.driveFileId)
}

export function getSceneById(id: string): DemoScene | undefined {
  return DEMO_SCENES.find(s => s.id === id)
}
