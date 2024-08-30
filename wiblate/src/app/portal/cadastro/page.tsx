import SignUpForm from '@/components/account/SignUpForm';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function SignUpPage() {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center py-10">
      <SignUpForm />
      </main>
      <Footer />
      </div>
  );
}
