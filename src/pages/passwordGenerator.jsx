/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import adjectivesPkg from 'adjectives'
import nounsPkg from 'nouns'

// Compatibility: some CommonJS packages export via `module.exports` or as a default.
const adjectives = adjectivesPkg && (adjectivesPkg.default || adjectivesPkg)
const nouns = nounsPkg && (nounsPkg.nouns || nounsPkg.default || nounsPkg)

export default function PasswordGenerator() {
  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '')

  function choose(pkg) {
    const arr = typeof pkg === 'function' ? pkg() : Array.isArray(pkg) ? pkg : Object.values(pkg)
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function makeOne() {
    const adj = capitalize(choose(adjectives))
    const noun = capitalize(choose(nouns))
    const num = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
    return `${adj}${noun}${num}`
  }

  const [list, setList] = useState(() => Array.from({ length: 10 }, () => makeOne()))
  const [copied, setCopied] = useState(null)

  function generate() {
    const out = Array.from({ length: 10 }, () => makeOne())
    setList(out)
    setCopied(null)
    return out
  }

  async function handleClick(pw) {
    try {
      await navigator.clipboard.writeText(pw)
      setCopied(pw)
      // close only if this window was opened by script
      setTimeout(() => {
        try { window.close() } catch (e) { /* ignore */ }
      }, 350)
    } catch (err) {
      console.error('copy failed', err)
      alert('Failed to copy to clipboard: ' + (err && err.message ? err.message : err))
    }
  }

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(list.join('\n'))
      setCopied('all')
    } catch (err) {
      alert('Failed to copy: ' + err.message)
    }
  }

  const containerStyle = {
    padding: 24,
    maxWidth: 640,
    margin: '40px auto',
    color: '#e6eef8',
    background: 'linear-gradient(180deg, rgba(7,16,26,1) 0%, rgba(12,22,34,1) 100%)',
    borderRadius: 12,
    boxShadow: '0 8px 30px rgba(2,6,23,0.6)',
    minHeight: '60vh',
  }

  const headingStyle = { marginTop: 0, marginBottom: 12, fontSize: '1.4rem' }
  const controlsStyle = { display: 'flex', gap: 12, marginBottom: 18 }
  const btnStyle = {
    background: '#0b1220',
    color: '#e6eef8',
    border: '1px solid #253244',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'transform 120ms ease, box-shadow 120ms ease',
  }
  const listStyle = { listStyle: 'none', paddingLeft: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: 10 }
  const itemBtn = {
    width: '100%',
    textAlign: 'left',
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.03)',
    background: 'rgba(255,255,255,0.02)',
    cursor: 'pointer',
    transition: 'background 150ms ease, transform 120ms ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace',
    fontSize: '1rem',
  }
  const codeStyle = { fontSize: '1rem', color: '#dbe9ff' }
  const copiedStyle = { marginTop: 12, color: '#9be6a1' }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Password Generator</h1>

      <div style={controlsStyle}>
        <button style={btnStyle} onClick={generate} onKeyDown={(e)=>e.key==='Enter' && generate()}>
          Regenerate 10
        </button>
        <button style={btnStyle} onClick={copyAll} onKeyDown={(e)=>e.key==='Enter' && copyAll()}>
          Copy All
        </button>
      </div>

      <ul style={listStyle}>
        {list.map((pw, i) => (
          <li key={i}>
            <button
              onClick={() => handleClick(pw)}
              style={{ ...itemBtn }}
              onMouseOver={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
              onMouseOut={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
              onFocus={(e)=>e.currentTarget.style.boxShadow='0 4px 20px rgba(11,20,32,0.6)'}
              onBlur={(e)=>e.currentTarget.style.boxShadow='none'}
              aria-label={`Copy password ${pw}`}>
              <code style={codeStyle}>{pw}</code>
              {copied === pw ? <span style={{ color: '#9be6a1', marginLeft: 12 }}>Copied ✓</span> : <span style={{ color: '#8fb6ff', opacity: 0.9, marginLeft: 12 }}>Click to copy</span>}
            </button>
          </li>
        ))}
      </ul>

      {copied ? (
        <div style={copiedStyle}>
          {copied === 'all' ? 'All copied to clipboard.' : `Copied ${copied}. Closing window...`}
        </div>
      ) : null}

      <p style={{ marginTop: 20, opacity: 0.9 }}>
        Click a password to copy it to your clipboard and close this window. Use "Regenerate 10" to create a new set.
      </p>
    </div>
  )
}
