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
      // Redirecionar para a página de login se o usuário não estiver autenticado
      window.location.href = '/portal/login'
    } else if (session.user?.cargo && !allowedCargos.includes(session.user.cargo)) {
      // Redirecionar para a página de acesso negado se o usuário não tiver um cargo permitido
      window.location.href = '/denied'
    }
  }, [session, status, allowedCargos])

  // Enquanto a sessão está carregando, mostrar um indicador de carregamento
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  // Renderizar o conteúdo da página se o usuário tiver acesso permitido
  if (session && session.user?.cargo && allowedCargos.includes(session.user.cargo)) {
    return <>{children}</>
  }

  return null
}

export default ProtectedPage
