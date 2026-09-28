import { useState } from 'react'

export function LoginMobile({ onSuccess }: { onSuccess?: (email: string) => void } = {}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passFocused, setPassFocused] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [recoveryMessage, setRecoveryMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit() {
    if (!email.includes('@')) {
      setEmailError('Ingresa un correo electrónico válido')
      return
    }
    if (!password) {
      setEmailError('Ingresa tu contraseña')
      return
    }
    setEmailError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => onSuccess?.(email), 350)
    }, 700)
  }

  return (
    <div style={{
      width: '100%',
      height: 844,
      backgroundColor: '#F4F7FA',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', ui-sans-serif, sans-serif",
    }}>

      {/* iOS Status bar */}
      <div style={{
        height: 54,
        backgroundColor: '#F4F7FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px 0 24px',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em' }}>9:41</span>
        {/* Dynamic island */}
        <div style={{ width: 126, height: 34, backgroundColor: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Signal */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="#1A1A1A">
            <rect x="0" y="7" width="3" height="5" rx="0.5"/>
            <rect x="4.5" y="5" width="3" height="7" rx="0.5"/>
            <rect x="9" y="2.5" width="3" height="9.5" rx="0.5"/>
            <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 4.5C3.6 2.2 6.6 1 8 1s4.4 1.2 7 3.5"/>
            <path d="M3 7C4.6 5.5 6.3 4.7 8 4.7s3.4.8 5 2.3"/>
            <path d="M5.5 9.5C6.2 8.9 7.1 8.5 8 8.5s1.8.4 2.5 1"/>
            <circle cx="8" cy="11.5" r="0.5" fill="#1A1A1A" stroke="none"/>
          </svg>
          {/* Battery */}
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#1A1A1A" strokeWidth="1"/>
            <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#1A1A1A"/>
            <path d="M23 4v4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '0 32px',
        overflowY: 'auto',
      }}>

        {/* Top spacer */}
        <div style={{ flex: '0 0 48px' }} />

        {/* Brand block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {/* App icon */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            backgroundColor: '#1B365D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(27,54,93,0.28), 0 1px 4px rgba(27,54,93,0.15)',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#1B365D',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}>
              Nuevos Horizontes
            </h1>
            <p style={{
              fontSize: 16,
              fontWeight: 400,
              color: '#6B7280',
              margin: '6px 0 0',
              lineHeight: 1.4,
            }}>
              Gestión de gastos comunes
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: '0 0 40px' }} />

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Email field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{
              fontSize: 14,
              fontWeight: 500,
              color: emailError ? '#C24141' : emailFocused ? '#2E75B6' : '#1B365D',
              transition: 'color 0.15s',
            }}>
              Correo electrónico
            </label>
            <div style={{
              height: 52,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              border: `1.5px solid ${emailError ? '#C24141' : emailFocused ? '#2E75B6' : '#E2E8F0'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '0 14px',
              boxShadow: emailFocused ? '0 0 0 3px rgba(46,117,182,0.12)' : 'none',
              transition: 'all 0.15s',
            }}>
              <span style={{ display: 'flex', color: emailError ? '#C24141' : emailFocused ? '#2E75B6' : '#9CA3AF', flexShrink: 0, transition: 'color 0.15s' }}>
                <MailIcon />
              </span>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="tu.correo@ejemplo.cl"
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 16,
                  color: '#1A1A1A',
                  fontFamily: 'inherit',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
            </div>
            {emailError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#C24141' }}>
                <ErrorDot /> {emailError}
              </div>
            )}
          </div>

          {/* Password field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{
              fontSize: 14,
              fontWeight: 500,
              color: passFocused ? '#2E75B6' : '#1B365D',
              transition: 'color 0.15s',
            }}>
              Contraseña
            </label>
            <div style={{
              height: 52,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              border: `1.5px solid ${passFocused ? '#2E75B6' : '#E2E8F0'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '0 14px',
              boxShadow: passFocused ? '0 0 0 3px rgba(46,117,182,0.12)' : 'none',
              transition: 'all 0.15s',
            }}>
              <span style={{ display: 'flex', color: passFocused ? '#2E75B6' : '#9CA3AF', flexShrink: 0, transition: 'color 0.15s' }}>
                <LockIcon />
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                placeholder="Ingresa tu contraseña"
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 16,
                  color: '#1A1A1A',
                  fontFamily: 'inherit',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 4,
                  cursor: 'pointer',
                  color: '#9CA3AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  flexShrink: 0,
                  minWidth: 36,
                  minHeight: 36,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1B365D')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
              >
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div style={{ marginTop: 4 }}>
            <button
              onClick={handleSubmit}
              disabled={loading || success}
              style={{
                width: '100%',
                height: 52,
                borderRadius: 10,
                backgroundColor: success ? '#2F9E6B' : '#1B365D',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 600,
                border: 'none',
                cursor: loading || success ? 'default' : 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: success
                  ? '0 2px 8px rgba(47,158,107,0.28)'
                  : '0 2px 8px rgba(27,54,93,0.22), 0 1px 2px rgba(27,54,93,0.12)',
                transition: 'background-color 0.25s, box-shadow 0.25s',
              }}
            >
              {loading && (
                <span style={{
                  width: 18, height: 18,
                  border: '2px solid rgba(255,255,255,0.35)',
                  borderTopColor: '#FFFFFF',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'nh-spin 0.7s linear infinite',
                }} />
              )}
              {success && <CheckIcon />}
              {loading ? 'Iniciando sesión…' : success ? 'Sesión iniciada' : 'Iniciar sesión'}
            </button>
          </div>

          {/* Forgot password */}
          <div style={{ textAlign: 'center' }}>
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              color: '#2E75B6',
              cursor: 'pointer',
              fontFamily: 'inherit',
              padding: '4px 0',
              minHeight: 44,
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            onClick={() => setRecoveryMessage('Para recuperar tu contraseña, comunícate con la administración de tu comunidad.')}
            >
              ¿Olvidaste tu contraseña?
            </button>
            {recoveryMessage && (
              <p role="status" style={{ fontSize: 12, color: '#6B7280', margin: '4px 0 0', lineHeight: 1.5 }}>
                {recoveryMessage}
              </p>
            )}
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer note */}
        <div style={{ paddingBottom: 40, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{ height: 1, flex: 1, backgroundColor: '#E2E8F0' }} />
            <LockTinyIcon />
            <div style={{ height: 1, flex: 1, backgroundColor: '#E2E8F0' }} />
          </div>
          <p style={{
            fontSize: 12,
            color: '#6B7280',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 400,
          }}>
            El sistema asigna el rol según tu cuenta.
          </p>
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes nh-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function ErrorDot() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}

function LockTinyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}
