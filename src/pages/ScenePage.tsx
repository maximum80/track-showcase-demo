import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Play, Maximize2, AlertCircle, Layers, Target,
  ChevronLeft, ChevronRight, User, Settings,
} from 'lucide-react'
import { getSceneById, getScenesByModule } from '../demo-data'

// Load all markdown docs at build time
const docs = import.meta.glob('../docs/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function getDoc(sceneId: string): string {
  return docs[`../docs/${sceneId}.md`] ?? ''
}

interface Section {
  heading: string
  body: string
}

function parseSections(md: string): Section[] {
  const sections: Section[] = []
  const parts = md.split(/^## /m).filter(Boolean)
  for (const part of parts) {
    const newline = part.indexOf('\n')
    const heading = newline >= 0 ? part.slice(0, newline).trim() : part.trim()
    const body = newline >= 0 ? part.slice(newline + 1).trim() : ''
    if (heading) sections.push({ heading, body })
  }
  return sections
}

function renderBody(text: string): React.ReactNode {
  return text.split('\n\n').map((para, i) => {
    if (para.startsWith('- ')) {
      const items = para.split('\n').filter(l => l.startsWith('- '))
      return (
        <ul key={i} className="list-disc list-inside space-y-1">
          {items.map((item, j) => (
            <li key={j} className="text-body text-neutral-700 leading-relaxed">{item.slice(2)}</li>
          ))}
        </ul>
      )
    }
    return <p key={i} className="text-body text-neutral-700 leading-relaxed">{para}</p>
  })
}

const SECTION_STYLES: Record<string, { icon: React.ElementType; iconBg: string; iconColor: string; cardBorder: string; cardBg: string; headingColor: string }> = {
  '課題訴求': {
    icon: AlertCircle, iconBg: 'bg-negative-50', iconColor: 'text-negative',
    cardBorder: 'border-neutral-200', cardBg: 'bg-white', headingColor: 'text-neutral-800',
  },
  'ソリューション概要': {
    icon: Layers, iconBg: 'bg-primary-50', iconColor: 'text-primary',
    cardBorder: 'border-neutral-200', cardBg: 'bg-white', headingColor: 'text-neutral-800',
  },
  '提供する価値': {
    icon: Target, iconBg: 'bg-primary', iconColor: 'text-white',
    cardBorder: 'border-primary-200', cardBg: 'bg-primary-50', headingColor: 'text-primary-800',
  },
}

function extractDriveFileId(url: string): string | null {
  const m = url.match(/\/file\/d\/([^/]+)/)
  if (m) return m[1]
  const m2 = url.match(/[?&]id=([^&]+)/)
  if (m2) return m2[1]
  return null
}

export function ScenePage() {
  const { module, sceneId } = useParams<{ module: string; sceneId: string }>()
  const navigate = useNavigate()
  const [fullscreen, setFullscreen] = useState(false)

  const scene = getSceneById(sceneId ?? '')
  if (!scene) return <div className="text-neutral-400">シーンが見つかりません</div>

  const scenes = module ? getScenesByModule(scene.module) : []
  const currentIndex = scenes.findIndex(s => s.id === sceneId)
  const prevScene = currentIndex > 0 ? scenes[currentIndex - 1] : null
  const nextScene = currentIndex < scenes.length - 1 ? scenes[currentIndex + 1] : null

  const driveFileId = scene.driveUrl ? extractDriveFileId(scene.driveUrl) : null
  const embedUrl = driveFileId ? `https://drive.google.com/file/d/${driveFileId}/preview` : null

  const docContent = getDoc(scene.id)
  const sections = parseSections(docContent)

  return (
    <div className="space-y-6 pb-8">
      {/* Perspective badge */}
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-medium border ${
          scene.perspective === '管理者'
            ? 'bg-primary-50 text-primary border-primary-100'
            : 'bg-secondary-50 text-secondary-700 border-secondary-100'
        }`}>
          {scene.perspective === '管理者' ? <Settings size={12} /> : <User size={12} />}
          {scene.perspective}視点
        </span>
      </div>

      {/* Video area */}
      <div
        className="rounded-xl overflow-hidden border border-neutral-100 bg-neutral-900"
        style={{ aspectRatio: '16/9', position: 'relative' }}
      >
        {embedUrl ? (
          <>
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
              title={scene.scene}
            />
            <button
              onClick={() => setFullscreen(true)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <Maximize2 size={14} />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-neutral-700 flex items-center justify-center">
              <Play size={28} className="text-neutral-600 ml-1" />
            </div>
            <div className="text-body text-neutral-500 font-medium">動画準備中</div>
          </div>
        )}
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && embedUrl && (
        <div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <iframe src={embedUrl} className="w-full h-full" allow="autoplay" allowFullScreen title={scene.scene} />
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors text-lg"
            onClick={() => setFullscreen(false)}
          >✕</button>
        </div>
      )}

      {/* Documentation sections from Markdown */}
      {sections.length > 0 ? (
        <div className="space-y-4">
          {sections.map(({ heading, body }) => {
            const style = SECTION_STYLES[heading]
            if (!style) return (
              <div key={heading} className="rounded-xl border border-neutral-200 bg-white p-5">
                <h3 className="text-body font-semibold text-neutral-800 mb-2">{heading}</h3>
                <div className="space-y-2">{renderBody(body)}</div>
              </div>
            )
            const Icon = style.icon
            return (
              <div key={heading} className={`rounded-xl border ${style.cardBorder} ${style.cardBg} overflow-hidden`}>
                <div className={`flex items-center gap-2.5 px-5 py-3.5 border-b ${
                  heading === '提供する価値' ? 'border-primary-100' : 'border-neutral-100 bg-neutral-50'
                }`}>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${style.iconBg}`}>
                    <Icon size={13} className={style.iconColor} />
                  </div>
                  <span className={`text-body font-semibold ${style.headingColor}`}>{heading}</span>
                </div>
                <div className="px-5 py-4 space-y-2">
                  {renderBody(body)}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-8 text-center text-caption text-neutral-400">
          このシーンのドキュメントは準備中です
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="flex items-center gap-3 pt-2">
        {prevScene ? (
          <button
            onClick={() => navigate(`/${module}/${prevScene.id}`)}
            className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border border-neutral-100 bg-white hover:border-primary-200 hover:shadow-sm transition-all text-left group"
          >
            <ChevronLeft size={16} className="text-neutral-400 group-hover:text-primary shrink-0 transition-colors" />
            <div className="min-w-0">
              <div className="text-tiny text-neutral-400">前のシーン</div>
              <div className="text-caption font-medium text-neutral-700 group-hover:text-primary truncate transition-colors">{prevScene.scene}</div>
            </div>
          </button>
        ) : <div className="flex-1" />}

        {nextScene ? (
          <button
            onClick={() => navigate(`/${module}/${nextScene.id}`)}
            className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border border-neutral-100 bg-white hover:border-primary-200 hover:shadow-sm transition-all text-right group justify-end"
          >
            <div className="min-w-0">
              <div className="text-tiny text-neutral-400">次のシーン</div>
              <div className="text-caption font-medium text-neutral-700 group-hover:text-primary truncate transition-colors">{nextScene.scene}</div>
            </div>
            <ChevronRight size={16} className="text-neutral-400 group-hover:text-primary shrink-0 transition-colors" />
          </button>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}
