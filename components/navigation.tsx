"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Cpu, Menu, X, Sparkles } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Cpu className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <Sparkles className="h-3 w-3 text-emerald-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              AI Import Exports
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href) ? "text-blue-400 font-semibold" : "text-white hover:text-blue-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900/95 border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-6 w-6 text-blue-400" />
                    <span className="text-lg font-bold text-white">AI Import Exports</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg transition-colors ${
                        isActive(item.href) ? "text-blue-400 font-semibold" : "text-white hover:text-blue-400"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsOpen(false)}>
                    Contact
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
