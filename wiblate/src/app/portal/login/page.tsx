import { LoginForm } from '@/components/Account/login-form'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'


export default function LoginPage() {
  return (
    <div>
    <Header />
    <main className="flex flex-col items-center py-16">
    <LoginForm />
    </main>
    <Footer />
    </div>
  )
}