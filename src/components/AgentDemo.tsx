import { ArrowDown, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import demoPoster from '../assets/videos/example2-poster.webp'
import { useTimeline } from '../lib/useTimeline'
import { PravaahMark } from './ui/Logo'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

const STAGES = ['Analyzing', 'Preparing', 'Simulating', 'Optimizing']
const STAGE_MS = 1600
const START = 600
const DONE = START + STAGES.length * STAGE_MS
// Illustrative figures for the exhibition demo — not measured results.
const RESULTS = [
  { value: '−38%', label: 'Mass' },
  { value: '2.1', label: 'Factor of safety' },
  { value: '24', label: 'Design iterations' },
]

const VIDEO_FILES = [ 'example5.mp4','example2.mp4', 'example4.mp4', 'example6.mp4']
const VIDEO_URLS: Record<string, string> = {
  'example5.mp4': `${import.meta.env.BASE_URL}videos/Pravaah_AI_CompleteDemo.mp4`,
  'example2.mp4': `${import.meta.env.BASE_URL}videos/example2.mp4`,
  'example4.mp4': `${import.meta.env.BASE_URL}videos/Part2.mp4`,
}
// Captions are matched by video URL (not playlist position), so they stay correct if the playlist changes.
const CAPTIONS: Record<string, string> = {
  [VIDEO_URLS['example5.mp4']]: `${import.meta.env.BASE_URL}captions/Pravaah_AI_Corrected_Captions.vtt`,
}
const DEMO_VIDEOS = VIDEO_FILES.flatMap((file) => {
  const src = VIDEO_URLS[file]
  return src ? [{ file, src }] : []
})

export function AgentDemo() {
  const ref = useRef<HTMLElement>(null)
  const { t, replay } = useTimeline(ref, DONE + 6000)
  const done = t >= DONE
  const videoRef = useRef<HTMLVideoElement>(null)
  const navigationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeVideo, setActiveVideo] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [showNavigation, setShowNavigation] = useState(false)
  const video = DEMO_VIDEOS[activeVideo]
  const captions = video ? CAPTIONS[video.src] : undefined

  useEffect(() => () => {
    if (navigationTimeout.current) clearTimeout(navigationTimeout.current)
  }, [])

  const hideNavigationAfter = (delay: number) => {
    if (navigationTimeout.current) clearTimeout(navigationTimeout.current)
    navigationTimeout.current = setTimeout(() => setShowNavigation(false), delay)
  }

  const revealNavigation = () => {
    setShowNavigation(true)
    if (navigationTimeout.current) clearTimeout(navigationTimeout.current)
  }

  const revealNavigationForTouch = () => {
    revealNavigation()
    hideNavigationAfter(1800)
  }

  useEffect(() => {
    const player = videoRef.current
    if (!player) return
    player.muted = true
    void player.play().catch(() => {})
  }, [activeVideo])

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed
  }, [speed, activeVideo])

  const moveVideo = (delta: number) => {
    setActiveVideo((current) => (current + delta + DEMO_VIDEOS.length) % DEMO_VIDEOS.length)
    setSpeed(1)
  }

  return (
    <section
      ref={ref}
      id="demo"
      data-theme="dark"
      aria-labelledby="demo-title"
      className="workstation section-y border-y border-line bg-bg text-fg"
    >
      <div className="container-wide">
        <SectionHeader index="02" label="Agent demo" titleId="demo-title" title="Watch the agent loop." />

        <div className="mt-block grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-10">
          <Reveal>
            <div className="flex h-full flex-col">
              {/* Engineer */}
              <p className="label text-muted">Engineer</p>
              <p className="mt-3 rounded-xl border border-line bg-surface px-5 py-4 text-[clamp(1.05rem,0.85rem+0.5vw,1.4rem)] leading-snug">
                “Start Fluent and prepare this geometry for simulation”
              </p>

              <ArrowDown className="mx-auto my-5 size-5 text-muted" aria-hidden />

              {/* Pravaah */}
              <p className="label inline-flex items-center gap-2 text-accent">
                <PravaahMark height={18} /> Pravaah
              </p>
              <ol className="mt-3 space-y-3 rounded-xl border border-line bg-surface p-5">
                {STAGES.map((s, i) => {
                  const p = Math.min(1, Math.max(0, (t - START - i * STAGE_MS) / STAGE_MS))
                  return (
                    <li key={s}>
                      <div className="flex items-center justify-between">
                        <span className={`text-body-sm ${p > 0 ? 'text-fg' : 'text-muted'}`}>{s}</span>
                        <span className="label text-muted">{Math.round(p * 100)}%</span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
                        <div className="h-full rounded-full bg-accent transition-[width] duration-100" style={{ width: `${p * 100}%` }} />
                      </div>
                    </li>
                  )
                })}
              </ol>

              <ArrowDown className="mx-auto my-5 size-5 text-muted" aria-hidden />

              {/* Result */}
              <div className="flex items-center justify-between">
                <p className="label text-muted">Result</p>
                <button type="button" onClick={replay} className="label inline-flex items-center gap-1.5 text-muted hover:text-fg">
                  <RotateCcw className="size-3" aria-hidden /> Replay
                </button>
              </div>
              <dl
                className={`mt-3 grid grid-cols-3 gap-3 transition-all duration-700 ${done ? 'opacity-100' : 'opacity-20'}`}
                aria-live="polite"
              >
                {RESULTS.map((r) => (
                  <div key={r.label} className="rounded-xl border border-line bg-surface p-4">
                    <dd className="text-[clamp(1.5rem,1rem+1.4vw,2.5rem)] font-semibold leading-none tracking-tight text-ok">{r.value}</dd>
                    <dt className="label mt-2 text-muted">{r.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="label mt-3 text-muted">Example result</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full min-h-[18rem] flex-col justify-center">
              <div
                className="relative overflow-hidden rounded-xl border border-line bg-black"
                onMouseEnter={revealNavigation}
                onMouseMove={revealNavigation}
                onMouseLeave={() => hideNavigationAfter(250)}
                onTouchStart={revealNavigationForTouch}
              >
                <video
                  ref={videoRef}
                  key={video?.src}
                  src={video?.src}
                  poster={activeVideo === 0 ? demoPoster : undefined}
                  muted
                  playsInline
                  preload="auto"
                  crossOrigin={captions ? 'anonymous' : undefined}
                  controls
                  onEnded={() => moveVideo(1)}
                  aria-label={`Engineering agent demonstration: ${video?.file ?? 'video'}`}
                  className="block aspect-video max-h-[70vh] w-full bg-black object-contain"
                >
                  {captions && <track kind="captions" src={captions} srcLang="en" label="English" />}
                </video>
                <button
                  type="button"
                  onFocus={revealNavigation}
                  onClick={() => moveVideo(-1)}
                  aria-label="Previous demo video"
                  className={`absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-sm transition-[opacity,visibility] duration-400 hover:bg-black/85 focus-visible:visible focus-visible:pointer-events-auto focus-visible:opacity-100 ${showNavigation ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onFocus={revealNavigation}
                  onClick={() => moveVideo(1)}
                  aria-label="Next demo video"
                  className={`absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-sm transition-[opacity,visibility] duration-400 hover:bg-black/85 focus-visible:visible focus-visible:pointer-events-auto focus-visible:opacity-100 ${showNavigation ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
              {/* <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => seekBy(-10)} aria-label="Rewind 10 seconds" className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-2 text-xs text-fg-2 transition hover:text-fg">
                    <SkipBack className="size-3.5" aria-hidden /> 10s
                  </button>
                  <button type="button" onClick={() => seekBy(10)} aria-label="Forward 10 seconds" className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-2 text-xs text-fg-2 transition hover:text-fg">
                    10s <SkipForward className="size-3.5" aria-hidden />
                  </button>
                  <label className="inline-flex items-center gap-2 rounded-md border border-line px-2.5 py-2 text-xs text-fg-2">
                    Speed
                    <select aria-label="Playback speed" value={speed} onChange={changeSpeed} className="bg-transparent text-fg outline-none">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => <option key={rate} value={rate}>{rate}×</option>)}
                    </select>
                  </label>
                </div>
                <span className="label shrink-0 text-muted" aria-live="polite">{activeVideo + 1} / {DEMO_VIDEOS.length}</span>
              </div> */}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
