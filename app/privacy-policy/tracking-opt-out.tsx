'use client'

import { useEffect, useState } from 'react'

const KEY = 'apos_track_disabled'

type DntSource = {
  doNotTrack?: string | boolean | null
  msDoNotTrack?: string | null
}

function detectDnt(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as DntSource
  const win = (typeof window !== 'undefined' ? window : {}) as DntSource
  const raw = nav.doNotTrack ?? win.doNotTrack ?? nav.msDoNotTrack
  return raw === '1' || raw === 'yes' || raw === true
}

export default function TrackingOptOut() {
  const [disabled, setDisabled] = useState<boolean | null>(null)
  const [dnt, setDnt] = useState(false)

  useEffect(() => {
    setDnt(detectDnt())
    try {
      setDisabled(localStorage.getItem(KEY) === '1')
    } catch {
      setDisabled(false)
    }
  }, [])

  if (disabled === null) return null

  function toggle() {
    try {
      if (disabled) {
        localStorage.removeItem(KEY)
        setDisabled(false)
      } else {
        localStorage.setItem(KEY, '1')
        setDisabled(true)
      }
    } catch {
      /* unavailable */
    }
  }

  const effectivelyOff = dnt || disabled

  return (
    <div>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
        Aktueller Status:{' '}
        <strong style={{ color: effectivelyOff ? '#4A7C4E' : '#1C1A17' }}>
          {effectivelyOff ? 'Tracking auf dieser Seite deaktiviert' : 'Tracking aktiv'}
        </strong>
        {dnt && (
          <span style={{ display: 'block', fontSize: '0.82rem', color: '#7A756B', marginTop: '4px' }}>
            Ihr Browser sendet einen Do-Not-Track-Header &mdash; das Tracking ist bereits automatisch
            deaktiviert.
          </span>
        )}
      </p>
      {!dnt && (
        <button
          type="button"
          onClick={toggle}
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            marginTop: '10px',
            borderRadius: '6px',
            border: '1px solid #E8E3D8',
            backgroundColor: '#fff',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#1C1A17',
            cursor: 'pointer',
          }}
        >
          {disabled ? 'Tracking wieder aktivieren' : 'Tracking auf dieser Seite deaktivieren'}
        </button>
      )}
    </div>
  )
}
