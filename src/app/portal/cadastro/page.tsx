import SignUpForm from '@/components/account/SignUpForm';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Copyright from '@/components/footer/copyright';

export default function SignUpPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center py-16">
        <SignUpForm />
      </main>
      <Footer />
      <Copyright />
    </>
  );
}
