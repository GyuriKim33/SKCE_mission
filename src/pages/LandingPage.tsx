import { useState } from 'react'
import { Pointer } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Envelope } from '../components/landing/Envelope'
import { NotificationCard } from '../components/landing/NotificationCard'
import { PageShell } from '../components/layout/PageShell'
import { appContent } from '../data/resumeSections'

interface LandingPageProps {
  onStart: () => void
}

type LandingStage = 'notification' | 'envelope'

export function LandingPage({ onStart }: LandingPageProps) {
  const { landing, pageLabels } = appContent
  const [landingStage, setLandingStage] =
    useState<LandingStage>('notification')
  const showEnvelope = landingStage === 'envelope'

  return (
    <PageShell title={pageLabels.landing}>
      <div
        className={`landing-page landing-page--${showEnvelope ? 'envelope' : 'notification'}`}
      >
        <AnimatePresence>
          {showEnvelope ? (
            <motion.div
              className="envelope-stage"
              key="envelope"
            >
              <motion.div
                initial={{ opacity: 0, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'tween',
                  duration: 2.65,
                  delay: 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Envelope label={landing.envelopeLabel} onClick={onStart} />
              </motion.div>
              <motion.div
                className="landing-instruction"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.94,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Pointer aria-hidden="true" strokeWidth={1.7} />
                <p>{landing.instruction}</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="notification-intro"
              key="notification"
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 1, 1] }}
            >
              <motion.h1
                className="landing-main-copy"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{landing.introCopyFirst}</span>
                <span>
                  {landing.introCopyPrefix}
                  <strong>{landing.introCopyEmphasis}</strong>
                </span>
              </motion.h1>
              <NotificationCard
                eyebrow={landing.notificationEyebrow}
                title={landing.notificationTitle}
                time={landing.notificationTime}
                closeLabel={landing.closeNotificationLabel}
                confirmLabel={landing.confirmButton}
                laterLabel={landing.laterButton}
                onConfirm={() => setLandingStage('envelope')}
                arrivalDelay={0.5}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  )
}
