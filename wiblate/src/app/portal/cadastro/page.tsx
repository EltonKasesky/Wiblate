import SignUpForm from '@/components/Account/sign-up-form';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'

export default function SignUpPage() {
  
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center py-40">
      <SignUpForm />
      </main>
      <Footer />
      </div>
  );
}
