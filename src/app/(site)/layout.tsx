"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { Header } from "@/components/header"

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      const script = document.createElement("script")
      script.src = `https://www.mercadopago.com/v2/security.js?view=home`
      script.async = true

      document.body.appendChild(script)


      return () => {
        document.body.removeChild(script)
      }
    }
  }, [pathname])

  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default MainLayout