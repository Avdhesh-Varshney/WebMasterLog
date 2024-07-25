import { memo } from 'react'

interface LoadingIconProps {
  width?: string
  height?: string
}

const LoadingIcon: React.FC<LoadingIconProps> = memo(({ width, height }) => (
  <svg viewBox="0 0 24 24" style={{ width: width || '26px', height }} className="icon">
    <defs>
      <linearGradient x1="28.154%" y1="63.74%" x2="74.629%" y2="17.783%" id="a">
        <stop stopColor="currentColor" offset="0%"></stop>
        <stop stopColor="#fff" stopOpacity="0" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g transform="translate(2)" fill="none">
      <circle stroke="url(#a)" strokeWidth="2" cx="10" cy="12" r="10"></circle>
      <path d="M10 2C4.477 2 0 6.477 0 12" stroke="currentColor" strokeWidth="2"></path>
    </g>
    <animateTransform
      attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 0 0"
      to="360 0 0"
      dur="0.5s"
      repeatCount="indefinite"
    />
  </svg>
))

const CopyIcon = memo(() => (
  <svg viewBox="0 0 24 24" style={{ width: '26px' }} className="icon">
    <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
  </svg>
))

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} className="icon">
    <path strokeWidth="2" fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
  </svg>
)

const CheckIcon = memo(() => (
  <svg viewBox="0 0 14 14" style={{ width: '26px' }} className="icon">
    <g fill="currentColor">
      <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
    </g>
  </svg>
))

const ChevronDownIcon = () => (
  <svg viewBox="0 0 40 40" style={{ width: '22px', height: '22px' }} className="icon animate-bounce">
    <g fill="currentColor">
      <path d="M35.3 12L20 21.8893L4.7 12L0 15.0445L20 28L40 15.0445L35.3 12Z" />
    </g>
  </svg>
)

const ChevronRightIcon = memo(() => (
  <svg viewBox="0 0 24 24" className="icon">
    <path fill="currentColor" d="M8.90283 4L7 5.88L13.1808 12L7 18.12L8.90283 20L17 12L8.90283 4Z" />
  </svg>
))

const ChevronLeftIcon = memo(() => (
  <svg viewBox="0 0 24 24" className="icon">
    <path fill="currentColor" d="M17 5.88L15.0972 4L7 12L15.0972 20L17 18.12L10.8192 12L17 5.88Z" />
  </svg>
))

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: '26px' }} className="icon">
    <g fill="currentColor">
      <path d="M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zM22 4h-4.75a.25.25 0 01-.25-.25V2.5A2.5 2.5 0 0014.5 0h-5A2.5 2.5 0 007 2.5v1.25a.25.25 0 01-.25.25H2a1 1 0 000 2h20a1 1 0 000-2zM9 3.75V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1.25a.25.25 0 01-.25.25h-5.5A.25.25 0 019 3.75z"></path>
    </g>
  </svg>
)

LoadingIcon.displayName = 'LoadingIcon'
CopyIcon.displayName = 'CopyIcon'
CheckIcon.displayName = 'CheckIcon'
ChevronRightIcon.displayName = 'ChevronRightIcon'
ChevronLeftIcon.displayName = 'ChevronLeftIcon'

export {
  LoadingIcon,
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  DeleteIcon
}