interface StickyMessageBarProps {
  message: string
}

export function StickyMessageBar({ message }: StickyMessageBarProps) {
  return <aside className="sticky-message-bar">{message}</aside>
}
