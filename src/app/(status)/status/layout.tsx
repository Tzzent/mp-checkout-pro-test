import { Suspense } from "react"

const StatusLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-svh bg-blue-100 flex items-center justify-center">
      <Suspense>
        {children}
      </Suspense>
    </div>
  )
}

export default StatusLayout