import type { ReactNode } from 'react'

export const C = {
  primary: '#1B365D',
  accent: '#2E75B6',
  success: '#2F9E6B',
  warning: '#D97706',
  danger: '#C24141',
  bg: '#F4F7FA',
  text: '#1A1A1A',
  muted: '#6B7280',
  white: '#FFFFFF',
  border: '#E2E8F0',
}

export function StatusBar() {
  return (
    <div style={{
      height: 54, backgroundColor: C.bg, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px 0 24px', flexShrink: 0, position: 'relative',
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>9:41</span>
      <div style={{ width: 126, height: 34, backgroundColor: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 10 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#1A1A1A">
          <rect x="0" y="7" width="3" height="5" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
      </div>
    </div>
  )
}

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div style={{
      width: '100%', height: 844, backgroundColor: C.bg,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: "'Inter', ui-sans-serif, sans-serif", position: 'relative',
    }}>
      {children}
    </div>
  )
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{
      borderRadius: 52, border: '10px solid #1A1A1A', overflow: 'hidden',
      width: 'min(410px, calc(100vw - 32px))',
      boxShadow: '0 24px 80px rgba(27,54,93,0.22)',
    }}>
      {children}
    </div>
  )
}

type ChipV = 'aldia' | 'pendiente' | 'pagado' | 'vencida' | 'moroso'

const CHIP: Record<ChipV, { label: string; color: string; bg: string; border: string }> = {
  aldia: { label: 'Al día', color: '#1E7D52', bg: '#EDFAF4', border: '#A7E3C8' },
  pendiente: { label: 'Pendiente', color: '#92580A', bg: '#FEF3E2', border: '#F6D18A' },
  pagado: { label: 'Pagado', color: '#1E7D52', bg: '#EDFAF4', border: '#A7E3C8' },
  vencida: { label: 'Vencida', color: '#992D2D', bg: '#FAEAEA', border: '#F0ABAB' },
  moroso: { label: 'Moroso', color: '#7A1E1E', bg: '#F5DADA', border: '#E8A3A3' },
}

export function StatusChip({ variant }: { variant: ChipV }) {
  const s = CHIP[variant]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, height: 28,
      padding: '0 10px', borderRadius: 20, backgroundColor: s.bg,
      border: `1px solid ${s.border}`, color: s.color, fontSize: 12, fontWeight: 600,
    }}>
      {s.label}
    </span>
  )
}

export function PrimaryBtn({ label, onClick, disabled }: { label: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%', height: 52, borderRadius: 10, border: 'none',
        backgroundColor: C.primary, color: C.white, fontSize: 16, fontWeight: 600,
        fontFamily: 'inherit', cursor: disabled ? 'default' : 'pointer',
        boxShadow: '0 2px 8px rgba(27,54,93,0.22)',
      }}
    >
      {label}
    </button>
  )
}

export function SecondaryBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', height: 52, borderRadius: 10,
        border: `1.5px solid ${C.primary}`, backgroundColor: C.white,
        color: C.primary, fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

type TabItem = { id: string; label: string }

export function TabBar({
  items, active, onChange, alertId,
}: {
  items: TabItem[]
  active: string
  onChange: (id: string) => void
  alertId?: string
}) {
  return (
    <div style={{
      display: 'flex', backgroundColor: C.white, borderTop: `1px solid ${C.border}`,
      height: 72, paddingBottom: 8, flexShrink: 0,
    }}>
      {items.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              flex: 1, border: 'none', background: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 4, minHeight: 44, position: 'relative',
              fontFamily: 'inherit',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 32, height: 3, borderRadius: '0 0 3px 3px', backgroundColor: C.primary,
              }} />
            )}
            <span style={{ fontSize: 16, color: isActive ? C.primary : '#9CA3AF' }}>
              {item.id === 'alertas' ? '🔔' : item.id === 'residentes' ? '👥' : item.id === 'perfil' ? '👤' : item.id === 'cuotas' ? '📄' : '🏠'}
            </span>
            <span style={{ fontSize: 11, fontWeight: isActive ? 600 : 400, color: isActive ? C.primary : '#9CA3AF' }}>
              {item.label}
            </span>
            {item.id === alertId && !isActive && (
              <span style={{
                position: 'absolute', top: 8, right: '28%',
                width: 8, height: 8, borderRadius: '50%', backgroundColor: C.danger,
              }} />
            )}
          </button>
        )
      })}
    </div>
  )
}

export function AppHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div style={{
      height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', flexShrink: 0,
    }}>
      <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: C.primary }}>{title}</h1>
      {right ?? <span />}
    </div>
  )
}

export function NavyHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div style={{
      height: 56, backgroundColor: C.primary, display: 'flex', alignItems: 'center',
      padding: '0 8px', flexShrink: 0, gap: 4,
    }}>
      <button
        onClick={onBack}
        aria-label="Volver"
        style={{
          width: 44, height: 44, border: 'none', background: 'none', color: C.white,
          fontSize: 22, cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        ←
      </button>
      <span style={{ color: C.white, fontSize: 17, fontWeight: 600 }}>{title}</span>
    </div>
  )
}
