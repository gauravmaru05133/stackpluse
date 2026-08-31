import { useEffect, useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion'

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.8,
  decimals = 0,
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)
  const numeric =
    typeof value === 'number'
      ? value
      : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0
  const places =
    decimals ||
    (String(numeric).includes('.')
      ? String(numeric).split('.')[1]?.length || 0
      : 0)

  useEffect(() => {
    if (!isInView) return
    let start
    let raf
    const animate = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * numeric)
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [isInView, numeric, duration])

  const formatted =
    places > 0 ? display.toFixed(places) : String(Math.round(display))

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  )
}
