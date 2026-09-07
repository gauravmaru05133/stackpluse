import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function getViewport() {
  if (typeof window === 'undefined') {
    return { once: true, amount: 0.15, margin: '0px' }
  }
  const mobile = window.matchMedia('(max-width: 768px)').matches
  return mobile
    ? { once: true, amount: 0.12, margin: '0px' }
    : { once: true, amount: 0.2, margin: '0px 0px -40px 0px' }
}

export default function SectionReveal({
  children,
  className = '',
  as = 'div',
  id,
  immediate = false,
}) {
  const Component = motion[as] || motion.div

  return (
    <Component
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: getViewport() })}
    >
      {typeof children === 'function' ? children(item) : children}
    </Component>
  )
}

export { item as revealItem }
