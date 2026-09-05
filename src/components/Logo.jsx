import logoImage from '../assets/logo.png'

const sizes = {
  sm: {
    mark: 'h-8 w-8',
    icon: 'h-6 w-6',
    text: 'text-[1.05rem]',
    gap: 'gap-2.5',
  },
  md: {
    mark: 'h-10 w-10',
    icon: 'h-7 w-7',
    text: 'text-lg',
    gap: 'gap-3',
  },
}

export default function Logo({
  size = 'sm',
  showText = true,
  className = '',
  textClassName = '',
}) {
  const config = sizes[size] ?? sizes.sm

  return (
    <span className={`inline-flex items-center ${config.gap} ${className}`}>
      <span
        className={`isolate flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan/25 via-purple/30 to-warm/25 ring-1 ring-cyan/30 ${config.mark}`}
      >
        <img
          src={logoImage}
          alt="stackpluse logo"
          className={`${config.icon} object-contain mix-blend-screen`}
        />
      </span>
      {showText ? (
        <span
          className={`font-bold tracking-tight text-text ${config.text} ${textClassName}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          stack<span className="gradient-text">pluse</span>
        </span>
      ) : null}
    </span>
  )
}
