const Footer = () => {
  return (
    <footer className="bottom-0 z-50 flex h-[4%] w-screen items-center justify-center gap-2  bg-primary py-4 text-sm">
      <p className="text-tertiary duration-300 hover:text-secondary">
        ⚡&nbsp;Built with &nbsp;
        <a href="https://nextjs.org/" className="underline">
          Next.js
        </a>
        ,&nbsp;
        <a href="https://ui.shadcn.com/" className="underline">
          shadcn/ui
        </a>
        &nbsp;and&nbsp;
        <a href="https://orm.drizzle.team/" className="underline">
          Drizzle
        </a>
      </p>
    </footer>
  )
}

export default Footer
