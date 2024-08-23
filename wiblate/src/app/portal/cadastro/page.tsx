import SignUpForm from '@/components/SignUpForm';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'

export default function SignUpPage() {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center p-10">
      <SignUpForm />
      </main>
      <Footer />
      </div>
  );
}
