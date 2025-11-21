import { memo } from "react"
import Link from 'next/link'

function HeaderComponent() {
  return (
    <div className="w-full flex justify-center items-center">
      <Link href={"/"} className="text-3xl font-medium font-commissioner">ECODEMO</Link>
    </div>
  )
}

export const Header = memo(HeaderComponent)