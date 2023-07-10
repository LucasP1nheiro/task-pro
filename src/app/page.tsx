import LandingPage from "@/components/LandingPage"
import { getAuthSession } from "@/lib/auth"



export default async function Home() {
  const session = await getAuthSession()


  return (
    <main className='min-h-screen w-screen flex items-center justify-center'>
     {session?.user ? (
       <h1 className="text-secondary">{session?.user ? session.user.email : session?.user.name}</h1>
     ) : (
      <LandingPage />
     )}
    </main>
  )
}
