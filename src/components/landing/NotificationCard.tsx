import { Bell, X } from 'lucide-react'
import { motion } from 'motion/react'

interface NotificationCardProps {
  eyebrow: string
  title: string
  time: string
  closeLabel: string
  confirmLabel: string
  laterLabel: string
  onConfirm: () => void
  arrivalDelay?: number
}

export function NotificationCard({
  eyebrow,
  title,
  time,
  closeLabel,
  confirmLabel,
  laterLabel,
  onConfirm,
  arrivalDelay = 0,
}: NotificationCardProps) {
  return (
    <motion.aside
      className="notification-card"
      initial={{ opacity: 0, y: -56 }}
      animate={{ opacity: [0, 1, 1, 1], y: [-56, 5, -3, 0] }}
      exit={{
        opacity: 0,
        y: -18,
        transition: { duration: 0.28, ease: 'easeIn' },
      }}
      transition={{
        duration: 0.85,
        times: [0, 0.68, 0.84, 1],
        ease: ['easeOut', 'easeOut', 'easeInOut'],
        delay: arrivalDelay,
      }}
    >
      <div className="notification-main">
        <span className="notification-icon" aria-hidden="true">
          <span className="notification-rays">
            <i />
            <i />
            <i />
          </span>
          <Bell />
        </span>
        <div className="notification-copy">
          <span className="notification-eyebrow">{eyebrow}</span>
          <p>{title}</p>
        </div>
      </div>
      <div className="notification-meta">
        <span>{time}</span>
        <button type="button" aria-label={closeLabel}>
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="notification-actions">
        <button
          className="notification-confirm-button"
          type="button"
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
        <button className="notification-later-button" type="button">
          {laterLabel}
        </button>
      </div>
    </motion.aside>
  )
}
