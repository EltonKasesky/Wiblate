import { LoginForm } from '@/components/account/LoginForm';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Copyright from '@/components/footer/copyright';


export default function LoginPage() {
  return (
    <>
      <Header />
      <LoginForm />
      <Footer />
      <Copyright />
    </>
  )
}