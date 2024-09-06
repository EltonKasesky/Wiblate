import { useSession } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

type ProtectedPageProps = {
  children: ReactNode
  allowedCargos: string[]
}

const ProtectedPage = ({ children, allowedCargos }: ProtectedPageProps) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return 

    if (!session) {
      
      window.location.href = '/portal/login'
    } else if (session.user?.cargo && !allowedCargos.includes(session.user.cargo)) {
      
      window.location.href = '/denied'
    }
  }, [session, status, allowedCargos])

  
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  
  if (session && session.user?.cargo && allowedCargos.includes(session.user.cargo)) {
    return <>{children}</>
  }

  
  return null
}

export default ProtectedPage
