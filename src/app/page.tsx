import AuthenticatedHome from "@/components/AuthenticatedHome"
import LandingPage from "@/components/LandingPage"
import { getAuthSession } from "@/lib/auth"



export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      {session ? (
        <AuthenticatedHome />
      ) : (
        <LandingPage />
      )}
    </>
  )
}
