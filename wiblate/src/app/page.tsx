'use client';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Copyright from '@/components/footer/copyright';
import Main from './main/main';

export default function Home() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
      <Copyright />
    </div>
  );
}
