import Portfolio from '@/components/Portfolio'
import MaintenancePage from '@/components/MaintenancePage'

export default function Home() {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return <MaintenancePage />
  }

  return <Portfolio />
}
