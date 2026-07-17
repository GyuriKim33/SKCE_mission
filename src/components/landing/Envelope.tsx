import { useState } from 'react'
import { motion } from 'motion/react'
import envelopeReference from '../../assets/references/landing-reference.png'

interface EnvelopeProps {
  label: string
  onClick: () => void
}

export function Envelope({ label, onClick: _onClick }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openEnvelope = () => {
    if (!isOpen) setIsOpen(true)
  }

  return (
    <motion.button
      className="envelope-trigger"
      type="button"
      aria-label={label}
      aria-expanded={isOpen}
      onClick={openEnvelope}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ y: 1, scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      style={{
        position: 'relative',
        perspective: 1500,
        perspectiveOrigin: '50% 0%',
        transformStyle: 'preserve-3d',
      }}
    >
      <span className="envelope">
        <img
          className="envelope-reference-image"
          src={envelopeReference}
          alt=""
          draggable={false}
        />
      </span>
      {isOpen && (
        <>
          <span
            className="envelope-interior"
            aria-hidden="true"
          />
          <span className="envelope-paper-pocket" aria-hidden="true">
            <motion.span
              className="envelope-paper-hint"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: -100 }}
              transition={{
                duration: 0.52,
                delay: 0.5,
                ease: 'easeOut',
              }}
            >
              APPLICATION
            </motion.span>
          </span>
          <motion.span
            className="envelope-animated-flap"
            aria-hidden="true"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -165 }}
            transition={{ duration: 0.82, ease: 'easeInOut' }}
          >
            <span className="envelope-flap-face envelope-flap-front">
              <img
                className="envelope-flap-reference"
                src={envelopeReference}
                alt=""
                draggable={false}
              />
            </span>
            <span className="envelope-flap-face envelope-flap-back" />
          </motion.span>
        </>
      )}
    </motion.button>
  )
}
