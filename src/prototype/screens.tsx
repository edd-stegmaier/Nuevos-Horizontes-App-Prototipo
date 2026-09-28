import { useState } from 'react'
import { LoginMobile } from '../components/ds/LoginScreen'
import {
  AppHeader, C, NavyHeader, Phone, PrimaryBtn, SecondaryBtn,
  StatusBar, StatusChip, TabBar,
} from './ui'
export type Role = 'admin' | 'residente'
export type Screen =
  | 'login'
  | 'cuotas'
  | 'confirmar'
  | 'exito'
  | 'alertas'
  | 'perfil'
  | 'residentes'
  | 'nuevo-residente'
  | 'admin-alertas'

const RES_TABS = [
  { id: 'cuotas', label: 'Cuotas' },
  { id: 'alertas', label: 'Alertas' },
  { id: 'perfil', label: 'Perfil' },
]
const ADM_TABS = [
  { id: 'residentes', label: 'Residentes' },
  { id: 'admin-alertas', label: 'Alertas' },
]

export type Resident = {
  id: string
  name: string
  depto: string
  tipo: 'Propietario' | 'Arrendatario'
  phone: string
  status: 'aldia' | 'moroso' | 'pendiente'
}

export function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  return <LoginMobile onSuccess={onLogin} />
}

export function CuotasScreen({
  paid, onPay, onTab,
}: {
  paid: boolean
  onPay: () => void
  onTab: (s: Screen) => void
}) {
  return (
    <Phone>
      <StatusBar />
      <AppHeader title="Mis cuotas" right={<span style={{ fontSize: 18 }}>🔔</span>} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px' }}>
        <div style={{
          backgroundColor: C.white, borderRadius: 12, padding: 20,
          boxShadow: '0 1px 4px rgba(27,54,93,0.06)', marginBottom: 12,
        }}>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>Cuota vigente · Septiembre 2026</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.primary, letterSpacing: '-0.03em' }}>$45.000</div>
            <StatusChip variant={paid ? 'pagado' : 'pendiente'} />
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
            {paid ? 'Pagada el 10 de septiembre' : 'Vence el 10 de septiembre'}
          </div>
        </div>
        {!paid && <PrimaryBtn label="Pagar ahora" onClick={onPay} />}
        <div style={{ height: 16 }} />
        <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 8 }}>Historial de pagos</div>
        {[
          paid ? { m: 'Septiembre 2026', v: '$45.000', ok: true } : null,
          { m: 'Agosto 2026', v: '$45.000', ok: true },
          { m: 'Julio 2026', v: '$42.000', ok: true },
          { m: 'Junio 2026', v: '$42.000', ok: true },
        ].filter(Boolean).map((row) => (
          <div key={row!.m} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: C.white, borderRadius: 12, padding: '14px 16px', marginBottom: 8,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{row!.m}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusChip variant="pagado" />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{row!.v}</span>
            </div>
          </div>
        ))}
      </div>
      <TabBar items={RES_TABS} active="cuotas" onChange={(id) => onTab(id as Screen)} alertId="alertas" />
    </Phone>
  )
}

export function ConfirmarScreen({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <Phone>
      <StatusBar />
      <NavyHeader title="Confirmar pago" onBack={onCancel} />
      <div style={{ flex: 1, padding: 20 }}>
        <div style={{ backgroundColor: C.white, borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <Row k="Departamento" v="1101" />
          <Row k="Período" v="Septiembre 2026" />
          <Row k="Estado" v="Pendiente" />
          <div style={{ marginTop: 12, fontSize: 13, color: C.muted }}>Monto</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: C.primary }}>$45.000</div>
        </div>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
          Serás redirigido al servicio de pago externo. El comprobante quedará en tu historial si la transacción es aprobada.
        </p>
        <PrimaryBtn label="Pagar $45.000" onClick={onConfirm} />
        <div style={{ height: 10 }} />
        <SecondaryBtn label="Cancelar" onClick={onCancel} />
      </div>
    </Phone>
  )
}

export function ExitoScreen({ onCuotas, onAlertas }: { onCuotas: () => void; onAlertas: () => void }) {
  return (
    <Phone>
      <StatusBar />
      <div style={{ flex: 1, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', backgroundColor: '#EDFAF4',
          color: C.success, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
        }}>✓</div>
        <h2 style={{ margin: 0, fontSize: 22, color: C.primary }}>Pago registrado</h2>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.5 }}>
          Tu cuota de septiembre 2026 por $45.000 fue confirmada. El recibo quedó en tu historial.
        </p>
        <PrimaryBtn label="Ver mis cuotas" onClick={onCuotas} />
        <button onClick={onAlertas} style={{
          marginTop: 12, border: 'none', background: 'none', color: C.accent,
          fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', minHeight: 44,
        }}>
          Ir a alertas
        </button>
      </div>
    </Phone>
  )
}

export function AlertasResidente({
  paid, onPay, onTab,
}: {
  paid: boolean
  onPay: () => void
  onTab: (s: Screen) => void
}) {
  return (
    <Phone>
      <StatusBar />
      <AppHeader title="Alertas" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!paid && (
          <AlertCard
            tone="warning"
            title="Tu cuota vence en 3 días"
            sub="Cuota septiembre 2026 · $45.000"
            action="Pagar"
            onAction={onPay}
          />
        )}
        {paid && (
          <AlertCard tone="success" title="Pago recibido" sub="Cuota septiembre 2026 · confirmado" />
        )}
        <AlertCard tone="success" title="Pago recibido" sub="Cuota agosto 2026 · confirmado" />
        <AlertCard tone="info" title="Nuevo aviso de la administración" sub="Corte de agua programado 12/09" />
      </div>
      <TabBar items={RES_TABS} active="alertas" onChange={(id) => onTab(id as Screen)} />
    </Phone>
  )
}

export function PerfilScreen({ email, onTab, onLogout }: { email: string; onTab: (s: Screen) => void; onLogout: () => void }) {
  return (
    <Phone>
      <StatusBar />
      <AppHeader title="Perfil" />
      <div style={{ flex: 1, padding: 20 }}>
        <div style={{ backgroundColor: C.white, borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <Row k="Nombre" v="Juan Pérez" />
          <Row k="Departamento" v="1101" />
          <Row k="Tipo" v="Propietario" />
          <Row k="Correo" v={email} />
        </div>
        <SecondaryBtn label="Cerrar sesión" onClick={onLogout} />
      </div>
      <TabBar items={RES_TABS} active="perfil" onChange={(id) => onTab(id as Screen)} alertId="alertas" />
    </Phone>
  )
}

export function ResidentesScreen({
  list, onNew, onTab,
}: {
  list: Resident[]
  onNew: () => void
  onTab: (s: Screen) => void
}) {
  const [q, setQ] = useState('')
  const filtered = list.filter((r) =>
    (r.name + r.depto).toLowerCase().includes(q.toLowerCase()),
  )
  return (
    <Phone>
      <StatusBar />
      <AppHeader title="Residentes" right={<span style={{
        width: 32, height: 32, borderRadius: '50%', backgroundColor: '#EDF2F8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, color: C.primary,
      }}>M</span>} />
      <div style={{ padding: '0 20px 12px' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar residente o depto"
          style={{
            width: '100%', height: 44, borderRadius: 10, border: `1.5px solid ${C.border}`,
            padding: '0 14px', fontSize: 14, fontFamily: 'inherit', marginBottom: 10,
          }}
        />
        <PrimaryBtn label="+ Registrar residente" onClick={onNew} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 12px' }}>
        {filtered.map((r) => (
          <div key={r.id} style={{
            backgroundColor: C.white, borderRadius: 12, padding: 14, marginBottom: 8,
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', backgroundColor: '#EDF2F8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: C.primary, flexShrink: 0,
            }}>
              {r.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: C.muted }}>Depto. {r.depto} · {r.tipo}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{r.phone}</div>
            </div>
            <StatusChip variant={r.status === 'pendiente' ? 'pendiente' : r.status} />
          </div>
        ))}
      </div>
      <TabBar items={ADM_TABS} active="residentes" onChange={(id) => onTab(id as Screen)} alertId="admin-alertas" />
    </Phone>
  )
}

export function NuevoResidenteScreen({
  onSave, onCancel,
}: {
  onSave: (r: Omit<Resident, 'id'>) => void
  onCancel: () => void
}) {
  const [name, setName] = useState('')
  const [depto, setDepto] = useState('')
  const [tipo, setTipo] = useState<'Propietario' | 'Arrendatario'>('Propietario')
  const [phone, setPhone] = useState('')
  const can = name.trim() && depto.trim()

  return (
    <Phone>
      <StatusBar />
      <NavyHeader title="Nuevo residente" onBack={onCancel} />
      <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Nombre completo *" value={name} onChange={setName} placeholder="Nombre y apellido" />
        <Field label="Departamento *" value={depto} onChange={setDepto} placeholder="Ejemplo: 1203" />
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: C.primary, marginBottom: 6 }}>Tipo de residencia *</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['Propietario', 'Arrendatario'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTipo(t)}
                style={{
                  flex: 1, height: 44, borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                  border: tipo === t ? 'none' : `1.5px solid ${C.border}`,
                  backgroundColor: tipo === t ? C.primary : C.white,
                  color: tipo === t ? C.white : C.text,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <Field label="Teléfono" value={phone} onChange={setPhone} placeholder="+56 9 ..." />
        <div style={{ height: 8 }} />
        <PrimaryBtn
          label="Guardar residente"
          disabled={!can}
          onClick={() => can && onSave({ name, depto, tipo, phone: phone || '—', status: 'aldia' })}
        />
        <SecondaryBtn label="Cancelar" onClick={onCancel} />
      </div>
    </Phone>
  )
}

export function AlertasAdmin({
  list, sent, onRemind, onTab,
}: {
  list: Resident[]
  sent: string[]
  onRemind: (id: string) => void
  onTab: (s: Screen) => void
}) {
  const morosos = list.filter((r) => r.status === 'moroso' || r.status === 'pendiente')
  return (
    <Phone>
      <StatusBar />
      <AppHeader title="Alertas y morosidad" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {morosos.map((r) => (
          <AlertCard
            key={r.id}
            tone="danger"
            title={`Cuota vencida · Depto. ${r.depto}`}
            sub={`${r.name} · $42.000`}
            action={sent.includes(r.id) ? 'Enviado' : 'Enviar recordatorio'}
            onAction={sent.includes(r.id) ? undefined : () => onRemind(r.id)}
          />
        ))}
        <AlertCard tone="info" title="Nuevo aviso de la administración" sub="Corte de agua programado 12/09" />
      </div>
      <TabBar items={ADM_TABS} active="admin-alertas" onChange={(id) => onTab(id as Screen)} />
    </Phone>
  )
}

export function roleFromEmail(email: string): Role {
  const e = email.toLowerCase()
  if (e.includes('maria') || e.includes('admin')) return 'admin'
  return 'residente'
}

function Field({
  label, value, onChange, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: C.primary }}>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          height: 52, borderRadius: 10, border: `1.5px solid ${C.border}`,
          padding: '0 14px', fontSize: 16, fontFamily: 'inherit',
        }}
      />
    </label>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{v}</span>
    </div>
  )
}

function AlertCard({
  tone, title, sub, action, onAction,
}: {
  tone: 'warning' | 'success' | 'danger' | 'info'
  title: string
  sub: string
  action?: string
  onAction?: () => void
}) {
  const map = {
    warning: { bg: '#FEF3E2', fg: '#D97706' },
    success: { bg: '#EDFAF4', fg: '#2F9E6B' },
    danger: { bg: '#FAEAEA', fg: '#C24141' },
    info: { bg: '#EBF3FB', fg: '#2E75B6' },
  }[tone]
  return (
    <div style={{ backgroundColor: C.white, borderRadius: 12, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 18, backgroundColor: map.bg, color: map.fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700,
      }}>
        {tone === 'success' ? '✓' : tone === 'danger' ? '!' : 'i'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{title}</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{sub}</div>
        {action && (
          <button
            onClick={onAction}
            disabled={!onAction}
            style={{
              marginTop: 8, border: 'none', background: 'none', padding: 0,
              color: map.fg, fontSize: 13, fontWeight: 600, cursor: onAction ? 'pointer' : 'default',
              fontFamily: 'inherit', minHeight: 32,
            }}
          >
            {action}
          </button>
        )}
      </div>
    </div>
  )
}
