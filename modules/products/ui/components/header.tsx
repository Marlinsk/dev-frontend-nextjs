import { memo } from "react"

function HeaderComponent() {
  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-3xl font-medium font-commissioner">ECODEMO</h1>
    </div>
  )
}

export const Header = memo(HeaderComponent)