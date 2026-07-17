import { motion } from 'motion/react'
import envelopeReference from '../../assets/references/landing-reference.png'

interface EnvelopeProps {
  label: string
  onClick: () => void
}

export function Envelope({ label, onClick }: EnvelopeProps) {
  return (
    <motion.button
      className="envelope-trigger"
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ y: 1, scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
    >
      <span className="envelope">
        <img
          className="envelope-reference-image"
          src={envelopeReference}
          alt=""
          draggable={false}
        />
      </span>
    </motion.button>
  )
}
