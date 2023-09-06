const BoardContainer = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  return (
    <div className="min-h-[600px] w-[350px] space-y-8 rounded-md bg-secondary/10 p-4">
      <h1 className="text-3xl font-bold capitalize text-secondary ">{title}</h1>
      {children}
    </div>
  )
}

export default BoardContainer
