import AuthenticatedHome from '@/components/Home/AuthenticatedHome'
import LandingPage from '@/components/Home/LandingPage'
import { getAuthSession } from '@/lib/auth'

export default async function Home() {
  const session = await getAuthSession()

  return <>{session ? <AuthenticatedHome /> : <LandingPage />}</>
}
