export default function Layout({ children }:{ children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}