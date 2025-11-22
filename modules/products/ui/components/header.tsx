"use client"

import { memo } from "react"
import Link from 'next/link'
import { LayoutDashboard, Package, Settings } from "lucide-react"
import { AddProduct } from "./add-product"

function HeaderComponent() {
  return (
    <header className="w-full border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-light hover:opacity-80 transition-opacity"
          >
            ECODEMO
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground bg-accent rounded-md"
            >
              <Package className="w-4 h-4" />
              Produtos
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              <Settings className="w-4 h-4" />
              Configurações
            </Link>
          </nav>
        </div>
        <AddProduct />
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)