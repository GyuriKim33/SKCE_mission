import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { motion, useAnimationControls } from 'motion/react'
import envelopeReference from '../../assets/references/landing-reference.png'
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
  const [activeSectionId, setActiveSectionId] = useState<string>(
    resumeSections[0].id,
  )
  const paperRef = useRef<HTMLSpanElement>(null)
  const paperStartRectRef = useRef<DOMRect | null>(null)
  const paperControls = useAnimationControls()

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
        boxShadow:
          '0 0 0 2px rgb(48 34 27 / 18%), 0 8px 24px rgb(48 34 27 / 30%), 0 30px 90px rgb(48 34 27 / 32%)',
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
