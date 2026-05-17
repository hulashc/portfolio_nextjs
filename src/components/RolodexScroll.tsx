'use client'

import { useEffect, useRef, useState } from 'react'

interface RolodexItem {
  image: string
  title: string
  year: string
  category: string
}

export default function RolodexScroll({ items }: { items: RolodexItem[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [subProgress, setSubProgress] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let currentPos = 0
    let targetPos = 0

    const tick = () => {
      if (wrapperRef.current) {
        const scrolled = -wrapperRef.current.getBoundingClientRect().top
        targetPos = Math.max(0, Math.min(scrolled / 200, items.length))
      }
      currentPos += (targetPos - currentPos) * 0.08
      if (Math.abs(currentPos - targetPos) < 0.0005) currentPos = targetPos
      const idx = Math.max(0, Math.min(Math.floor(currentPos), items.length - 1))
      const sub = Math.max(0, Math.min(currentPos - idx, 1))
      setActiveIndex(idx)
      setSubProgress(sub)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [items.length])

  return (
    <div style={{ height: `calc(${items.length * 200}px + 100vh)`, position: 'relative' }} ref={wrapperRef}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
        <div style={{ perspective: '1200px', perspectiveOrigin: '50% 0%', width: '40vw', maxWidth: '320px', aspectRatio: '2/3', position: 'relative' }}>
          {items.map((item, i) => {
            const diff = i - activeIndex
            const sp = subProgress

            let transform = ''
            let zIndex = 0
            let overlay = 0
            let origin = 'center center'
            let transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'

            if (i < activeIndex) {
              transform = 'rotateX(24deg) scale(0.68) translateY(100px)'
              zIndex = 0
              overlay = 0.6
            } else if (diff === 0) {
              const rx = -sp * 28
              const s = 1 - sp * 0.12
              const y = sp * -55
              transform = `rotateX(${rx}deg) scale(${s}) translateY(${y}px)`
              zIndex = 1000
              overlay = 0
              origin = 'bottom center'
              transition = 'none'
            } else if (diff === 1) {
              const rx = (1 - sp) * 8
              const s = 0.92 + sp * 0.08
              transform = `rotateX(${rx}deg) translateZ(-60px) scale(${s})`
              zIndex = 999
              overlay = 0.15
              transition = 'none'
            } else if (diff === 2) {
              transform = 'rotateX(14deg) translateZ(-120px) scale(0.85)'
              zIndex = 998
              overlay = 0.3
            } else {
              transform = 'rotateX(18deg) translateZ(-180px) scale(0.79)'
              zIndex = 1000 - diff
              overlay = 0.5
            }

            return (
              <div key={i} style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                border: '1px solid #ddd',
                overflow: 'hidden',
                transform,
                zIndex,
                transformOrigin: origin,
                transition,
                background: `url(${item.image}) center/cover no-repeat`,
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `rgba(255,255,255,${overlay})`,
                  pointerEvents: 'none',
                }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
