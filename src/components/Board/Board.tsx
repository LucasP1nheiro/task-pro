const Board = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-10 md:w-3/4 lg:justify-between">
      {children}
    </div>
  )
}

export default Board
