import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from 'motion/react'
import envelopeReference from '../../assets/references/landing-reference.png'
import reviewStamp from '../../assets/landing/review-stamp.png'
import reviewStampTop from '../../assets/landing/review-stamp-top.png'
import logo from '../../assets/logos/sk-careers-editor-logo.png'
import { ResumeSection } from '../resume/ResumeSection'
import { ResumeSidebar } from '../resume/ResumeSidebar'
import { appContent, resumeSections } from '../../data/resumeSections'

interface EnvelopeProps {
  label: string
  onClick: () => void
}

export function Envelope({ label, onClick: _onClick }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isResumeOpening, setIsResumeOpening] = useState(false)
  const [isEndingClosed, setIsEndingClosed] = useState(false)
  const [isStamping, setIsStamping] = useState(false)
  const [isStampImprintVisible, setIsStampImprintVisible] = useState(false)
  const [isStampToolGone, setIsStampToolGone] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<string>(
    resumeSections[0].id,
  )
  const paperRef = useRef<HTMLSpanElement>(null)
  const returningEnvelopeRef = useRef<HTMLSpanElement>(null)
  const endingAnimationStartedRef = useRef(false)
  const endingTimerRef = useRef<number | null>(null)
  const stampStartTimerRef = useRef<number | null>(null)
  const stampContactTimerRef = useRef<number | null>(null)
  const stampFinishTimerRef = useRef<number | null>(null)
  const paperStartRectRef = useRef<DOMRect | null>(null)
  const paperControls = useAnimationControls()
  const returningEnvelopeProgress = useMotionValue(0)
  const returningEnvelopeY = useTransform(
    returningEnvelopeProgress,
    [0, 1],
    ['100%', '0%'],
  )
  const returningEnvelopeOpacity = useTransform(
    returningEnvelopeProgress,
    [0, 0.35],
    [0, 1],
  )
  const returningPaperY = useTransform(
    returningEnvelopeProgress,
    [0, 1],
    [-220, -70],
  )

  useEffect(
    () => () => {
      if (endingTimerRef.current !== null) {
        window.clearTimeout(endingTimerRef.current)
      }
      if (stampStartTimerRef.current !== null) {
        window.clearTimeout(stampStartTimerRef.current)
      }
      if (stampContactTimerRef.current !== null) {
        window.clearTimeout(stampContactTimerRef.current)
      }
      if (stampFinishTimerRef.current !== null) {
        window.clearTimeout(stampFinishTimerRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    if (!isEndingClosed) return

    stampStartTimerRef.current = window.setTimeout(() => {
      setIsStamping(true)
      stampStartTimerRef.current = null
    }, 950)
    stampContactTimerRef.current = window.setTimeout(() => {
      setIsStampImprintVisible(true)
      stampContactTimerRef.current = null
    }, 1600)
    stampFinishTimerRef.current = window.setTimeout(() => {
      setIsStampToolGone(true)
      stampFinishTimerRef.current = null
    }, 2300)
  }, [isEndingClosed])

  const openEnvelope = () => {
    if (!isOpen) setIsOpen(true)
  }

  const openResume = () => {
    if (!paperRef.current || isResumeOpening) return

    const paperRect = paperRef.current.getBoundingClientRect()
    paperStartRectRef.current = paperRect
    const targetWidth = Math.min(window.innerWidth * 0.88, 1320)
    const targetHeight = window.innerHeight * 0.82
    const targetLeft = (window.innerWidth - targetWidth) / 2
    const targetTop = (window.innerHeight - targetHeight) / 2 + 40

    paperControls.set({
      opacity: 1,
      top: paperRect.top,
      left: paperRect.left,
      x: 0,
      y: 0,
      width: paperRect.width,
      height: paperRect.height,
      borderRadius: 5,
      clipPath: 'inset(0 0 80% 0 round 5px)',
    })
    setIsResumeOpening(true)

    requestAnimationFrame(() => {
      void paperControls.start({
        top: targetTop,
        left: targetLeft,
        width: targetWidth,
        height: targetHeight,
        borderRadius: 22,
        clipPath: 'inset(0 0 0% 0 round 22px)',
        boxShadow: '0 0 0 0 rgb(48 34 27 / 0%)',
        transition: { duration: 0.85, ease: 'easeInOut' },
      })
    })
  }

  const handlePaperClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    openResume()
  }

  const handlePaperKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    event.stopPropagation()
    openResume()
  }

  const handleResumeScroll = () => {
    const scrollContainer = paperRef.current
    if (!scrollContainer || !isResumeOpening) return

    const containerRect = scrollContainer.getBoundingClientRect()
    const returningEnvelopeRegion = returningEnvelopeRef.current

    if (returningEnvelopeRegion) {
      const regionRect = returningEnvelopeRegion.getBoundingClientRect()
      const startScroll =
        scrollContainer.scrollTop +
        regionRect.top -
        (containerRect.top + containerRect.height * 0.9)
      const endScroll =
        scrollContainer.scrollTop + regionRect.bottom - containerRect.bottom
      const progress =
        (scrollContainer.scrollTop - startScroll) /
        Math.max(endScroll - startScroll, 1)

      const clampedProgress = Math.min(Math.max(progress, 0), 1)
      returningEnvelopeProgress.set(clampedProgress)

      if (clampedProgress >= 0.98 && !endingAnimationStartedRef.current) {
        endingAnimationStartedRef.current = true
        endingTimerRef.current = window.setTimeout(() => {
          setIsEndingClosed(true)
          endingTimerRef.current = null
        }, 500)
      }
    }

    const focusLine = containerRect.top + Math.min(180, containerRect.height * 0.3)
    const sections = scrollContainer.querySelectorAll<HTMLElement>('.resume-section')
    let nextSectionId: string = resumeSections[0].id

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= focusLine) {
        nextSectionId = section.id
      }
    })

    setActiveSectionId(nextSectionId)
  }

  const paperElement = (
    <motion.span
      ref={paperRef}
      className={`envelope-paper-hint${isResumeOpening ? ' envelope-paper-hint--expanding' : ''}`}
      role="button"
      tabIndex={0}
      aria-label="지원서 펼쳐보기"
      style={
        isResumeOpening && paperStartRectRef.current
          ? {
              top: paperStartRectRef.current.top,
              left: paperStartRectRef.current.left,
              width: paperStartRectRef.current.width,
              height: paperStartRectRef.current.height,
            }
          : undefined
      }
      initial={isResumeOpening ? false : { opacity: 0, y: 26 }}
      animate={isResumeOpening ? paperControls : { opacity: 1, y: -100 }}
      transition={{
        duration: 0.52,
        delay: 0.5,
        ease: 'easeOut',
      }}
      onClick={handlePaperClick}
      onKeyDown={handlePaperKeyDown}
      onScroll={handleResumeScroll}
    >
      <span className="envelope-paper-label">APPLICATION</span>
      <span
        className="expanded-resume-content"
        aria-hidden={!isResumeOpening}
      >
        <span className="expanded-resume-header">
          <img src={logo} alt={appContent.brandName} />
          <strong>지원서</strong>
        </span>
        <span className="expanded-resume-divider" />
        <span className="expanded-resume-layout">
          <span className="expanded-resume-main">
            {resumeSections.map((section) => (
              <ResumeSection key={section.id} section={section} />
            ))}
          </span>
          <ResumeSidebar
            title={appContent.resume.sidebarTitle}
            sections={resumeSections}
            activeSectionId={activeSectionId}
            onSelect={() => undefined}
          />
        </span>
      </span>
      {isResumeOpening && (
        <>
          <span className="expanded-resume-exterior-space">
            <span className="resume-scroll-mouse" aria-hidden="true">
              <span className="resume-scroll-wheel" />
            </span>
            <span className="resume-scroll-guidance landing-instruction">
              <p>
                <span>기업의 지원서를 모두 검토하셨다면,</span>
                <span>
                  아래로 스크롤하여 <strong>봉투에 다시 넣어주세요.</strong>
                </span>
              </p>
            </span>
          </span>
          <span
            ref={returningEnvelopeRef}
            className="resume-returning-envelope-region"
          >
            <span className="resume-returning-envelope-stage">
              <motion.span
                className="resume-returning-envelope"
                style={{
                  y: returningEnvelopeY,
                  opacity: returningEnvelopeOpacity,
                }}
                animate={{
                  scale: isStampImprintVisible
                    ? [0.9, 0.8865, 0.9]
                    : isEndingClosed
                      ? 0.9
                      : 1,
                }}
                transition={{
                  scale: {
                    duration: isStampImprintVisible ? 0.22 : 0.5,
                    delay:
                      isEndingClosed && !isStampImprintVisible ? 0.45 : 0,
                    ease: 'easeInOut',
                  },
                }}
                aria-hidden="true"
              >
                <span className="envelope">
                  <img
                    className="envelope-reference-image"
                    src={envelopeReference}
                    alt=""
                    draggable={false}
                  />
                </span>
                <motion.span
                  className="envelope-interior"
                  animate={{ opacity: isEndingClosed ? 0 : 1 }}
                  transition={{
                    duration: 0.22,
                    delay: isEndingClosed ? 0.38 : 0,
                    ease: 'easeInOut',
                  }}
                />
                <motion.span
                  className="envelope-paper-pocket"
                  animate={{ opacity: isEndingClosed ? 0 : 1 }}
                  transition={{
                    duration: 0.22,
                    delay: isEndingClosed ? 0.38 : 0,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.span
                    className="envelope-paper-hint resume-returning-paper-hint"
                    style={{ y: returningPaperY }}
                  >
                    <span className="envelope-paper-label">APPLICATION</span>
                  </motion.span>
                </motion.span>
                <motion.span
                  className="envelope-animated-flap resume-returning-envelope-open-flap"
                  animate={{
                    rotateX: isEndingClosed ? -92 : 0,
                    opacity: isEndingClosed ? [1, 1, 0] : 1,
                    zIndex: isEndingClosed ? 5 : 3,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                    opacity: {
                      duration: 0.65,
                      times: [0, 0.72, 1],
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <span className="envelope-flap-face envelope-flap-back" />
                </motion.span>
                {isStamping && !isStampToolGone && (
                  <motion.span
                    className="review-stamp-tool"
                    initial={{
                      opacity: 0,
                      x: 160,
                      y: -170,
                      scale: 1.2,
                      rotateZ: 0,
                      z: 240,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: [160, 0, 0, 160],
                      y: [-170, 0, 0, -170],
                      scale: 1.2,
                      rotateZ: 0,
                      z: 240,
                    }}
                    transition={{
                      duration: 1.35,
                      times: [0, 0.48, 0.57, 1],
                      ease: 'easeInOut',
                      opacity: {
                        duration: 1.35,
                        times: [0, 0.06, 0.9, 1],
                        ease: 'easeInOut',
                      },
                    }}
                    aria-hidden="true"
                  >
                    <motion.img
                      className="review-stamp-tool-side"
                      src={reviewStamp}
                      alt=""
                      animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
                      transition={{
                        duration: 1.35,
                        times: [0, 0.22, 0.45, 0.62, 0.84, 1],
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.img
                      className="review-stamp-tool-top"
                      src={reviewStampTop}
                      alt=""
                      animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                      transition={{
                        duration: 1.35,
                        times: [0, 0.22, 0.45, 0.62, 0.84, 1],
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.span>
                )}
                <motion.span
                  className="review-complete-imprint"
                  initial={false}
                  animate={{
                    opacity: isStampImprintVisible ? 1 : 0,
                    scale: isStampImprintVisible ? 1 : 1.08,
                  }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  aria-hidden="true"
                >
                  <span className="review-imprint-stars">★ · ★ · ★</span>
                  <strong>기업</strong>
                  <strong>검토 완료</strong>
                  <span className="review-imprint-waves" />
                </motion.span>
              </motion.span>
            </span>
          </span>
        </>
      )}
    </motion.span>
  )

  return (
    <motion.button
      className={`envelope-trigger${isResumeOpening ? ' envelope-trigger--resume-opening' : ''}`}
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
          <span className="envelope-paper-pocket">
            {!isResumeOpening && paperElement}
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
          {isResumeOpening && createPortal(paperElement, document.body)}
        </>
      )}
    </motion.button>
  )
}
