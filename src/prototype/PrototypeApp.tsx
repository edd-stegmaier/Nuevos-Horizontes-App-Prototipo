import { useState } from 'react'
import {
  AlertasAdmin, AlertasResidente, ConfirmarScreen, CuotasScreen, ExitoScreen,
  LoginScreen, NuevoResidenteScreen, PerfilScreen, ResidentesScreen,
  roleFromEmail, type Resident,
} from './screens'
import { PhoneFrame } from './ui'

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

const SEED: Resident[] = [
  { id: '1', name: 'M. Herrera', depto: '1203', tipo: 'Propietario', phone: '+56 9 1234 5678', status: 'aldia' },
  { id: '2', name: 'J. Soto', depto: '905', tipo: 'Arrendatario', phone: '+56 9 8765 4321', status: 'moroso' },
  { id: '3', name: 'R. Fuentes', depto: '1207', tipo: 'Propietario', phone: '+56 9 1122 3344', status: 'aldia' },
  { id: '4', name: 'Juan Pérez', depto: '1101', tipo: 'Propietario', phone: '+56 9 5555 1101', status: 'pendiente' },
]

export default function PrototypeApp() {
  const [screen, setScreen] = useState<Screen>('login')
  const [role, setRole] = useState<Role | null>(null)
  const [email, setEmail] = useState('')
  const [paid, setPaid] = useState(false)
  const [residents, setResidents] = useState<Resident[]>(SEED)
  const [sent, setSent] = useState<string[]>([])

  function login(mail: string) {
    const r = roleFromEmail(mail)
    setEmail(mail)
    setRole(r)
    setScreen(r === 'admin' ? 'residentes' : 'cuotas')
  }

  function logout() {
    setRole(null)
    setEmail('')
    setPaid(false)
    setScreen('login')
  }

  function goTab(id: Screen) {
    setScreen(id)
  }

  const view = (() => {
    switch (screen) {
      case 'login':
        return <LoginScreen onLogin={login} />
      case 'cuotas':
        return <CuotasScreen paid={paid} onPay={() => setScreen('confirmar')} onTab={goTab} />
      case 'confirmar':
        return (
          <ConfirmarScreen
            onCancel={() => setScreen('cuotas')}
            onConfirm={() => { setPaid(true); setScreen('exito') }}
          />
        )
      case 'exito':
        return <ExitoScreen onCuotas={() => setScreen('cuotas')} onAlertas={() => setScreen('alertas')} />
      case 'alertas':
        return <AlertasResidente paid={paid} onPay={() => setScreen('confirmar')} onTab={goTab} />
      case 'perfil':
        return <PerfilScreen email={email} onTab={goTab} onLogout={logout} />
      case 'residentes':
        return <ResidentesScreen list={residents} onNew={() => setScreen('nuevo-residente')} onTab={goTab} />
      case 'nuevo-residente':
        return (
          <NuevoResidenteScreen
            onCancel={() => setScreen('residentes')}
            onSave={(r) => {
              setResidents((prev) => [{ ...r, id: String(Date.now()) }, ...prev])
              setScreen('residentes')
            }}
          />
        )
      case 'admin-alertas':
        return (
          <AlertasAdmin
            list={residents}
            sent={sent}
            onRemind={(id) => setSent((s) => [...s, id])}
            onTab={goTab}
          />
        )
      default:
        return <LoginScreen onLogin={login} />
    }
  })()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '28px 16px 48px', gap: 16,
    }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1B365D' }}>Prototipo de alta fidelidad</div>
        <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
          {role === 'admin' ? 'Sesión administradora (María)' : role === 'residente' ? 'Sesión residente (Juan)' : 'Inicia sesión para recorrer el flujo'}
        </div>
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>
          Demo admin: maria@nuevoshorizontes.cl · Demo residente: juan@nuevoshorizontes.cl
        </div>
      </div>
      <PhoneFrame>{view}</PhoneFrame>
    </div>
  )
}
