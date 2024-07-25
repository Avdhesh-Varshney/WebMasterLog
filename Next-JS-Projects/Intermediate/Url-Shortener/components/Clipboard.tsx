import React, { useState, useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { CheckIcon, CopyIcon } from './Icons'

interface ClipboardProps {
  text: string
  className?: string
}

const Clipboard: React.FC<ClipboardProps> = ({ text, className }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    if (!copied) {
      setCopied(true)
    }
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <CopyToClipboard
      text={text}
      onCopy={onCopy}
    >
      <button className={className}>
        {copied ?
          <CheckIcon /> :
          <CopyIcon />
        }
      </button>
    </CopyToClipboard>
  )
}

export default Clipboard