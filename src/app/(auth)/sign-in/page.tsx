import SignIn from '../../../components/Sign/SignIn'

const page = () => {
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20 p-4">
        <SignIn />
      </div>
    </div>
  )
}

export default page
