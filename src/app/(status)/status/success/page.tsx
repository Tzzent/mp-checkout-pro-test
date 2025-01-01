"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { QueryParam } from "../../types"

const SuccessPage = () => {
  const router = useRouter()

  const sp = useSearchParams()

  const qp: Partial<QueryParam> = {}

  sp.forEach((value, key) => {
    qp[key as keyof QueryParam] = value
  })

  return (
    <div className="w-full max-w-md bg-white shadow rounded-md p-8 space-y-3 flex flex-col">
      <div className="space-y-2">
        <h1 className="font-bold text-xl text-green-500">✅ Pago exitoso.</h1>
        <p className="text-gray-600">El pago se ha realizado con exito.</p>
      </div>

      <pre className="bg-gray-100 p-2">
        {Object.entries(qp).map(([key, value]) => (
          <p key={key} className="text-gray-600 text-sm text-wrap">
            {key}: {value}
          </p>
        ))}
      </pre>

      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 text-blue-50 px-2 py-1.5 hover:bg-blue-600/80 transition-colors rounded-md shadow self-end"
      >
        Ir a inicio 🏠
      </button>
    </div>
  )
}

export default SuccessPage