import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollFloat({
  children,
  effect = 'float',
  splitBy = 'chars',
  direction = 'up',
  order = 'start',
  fromColor = 'currentColor',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  distance = 120,
  stretch = 2.3,
  smoothing = 0,
  className = '',
  containerClassName = '',
  textClassName = '',
  as: Tag = 'h2',
}) {
  const containerRef = useRef(null)

  const content = useMemo(() => {
    if (typeof children !== 'string') return children

    const words = children.split(' ')
    if (splitBy === 'words') {
      return words.map((word, wi) => (
        <span
          key={wi}
          className="scroll-float-word"
          style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}
        >
          <span className="scroll-float-target" style={{ display: 'inline-block' }}>
            {word}
          </span>
        </span>
      ))
    }

    return words.map((word, wi) => (
      <span
        key={wi}
        className="scroll-float-word"
        style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}
      >
        {word.split('').map((char, ci) => (
          <span
            key={ci}
            className="scroll-float-target scroll-float-char"
            style={{ display: 'inline-block' }}
          >
            {char}
          </span>
        ))}
      </span>
    ))
  }, [children, splitBy])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const targets = el.querySelectorAll('.scroll-float-target')
    if (!targets || targets.length === 0) return

    const isUp = direction === 'up'
    const yFrom = isUp ? distance : -distance

    const fromVars = {
      opacity: 0,
      y: yFrom,
      scaleY: stretch || 1,
      transformOrigin: isUp ? '50% 0%' : '50% 100%',
      willChange: 'transform, opacity',
    }

    if (fromColor && fromColor !== 'currentColor') {
      fromVars.color = fromColor
    }

    const toVars = {
      opacity: 1,
      y: 0,
      scaleY: 1,
      duration: animationDuration,
      ease: ease,
      stagger: {
        each: stagger,
        from: order === 'end' ? 'end' : order === 'center' ? 'center' : 'start',
      },
      scrollTrigger: {
        trigger: el,
        start: scrollStart,
        end: scrollEnd,
        scrub: smoothing ? smoothing : true,
      },
    }

    if (fromColor && fromColor !== 'currentColor') {
      toVars.color = 'currentColor'
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, toVars)
    }, el)

    return () => ctx.revert()
  }, [
    direction,
    distance,
    stretch,
    animationDuration,
    ease,
    stagger,
    order,
    scrollStart,
    scrollEnd,
    smoothing,
    fromColor,
  ])

  return (
    <Tag
      ref={containerRef}
      className={`scroll-float-container ${containerClassName} ${className}`}
      style={{ overflow: 'visible' }}
    >
      <span className={`scroll-float-inner ${textClassName}`} style={{ display: 'inline-block' }}>
        {content}
      </span>
    </Tag>
  )
}
