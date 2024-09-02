import Link from 'next/link';

export default function AccessDenied() {
  return (
    <section className="box-border flex items-center justify-center px-4 sm:px-0 min-h-screen bg-gradient-to-r from-gray-100 to-white antialiased">
      <div className="flex flex-col items-center justify-center p-8 w-full max-w-md text-center bg-box-bg border border-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Seu acesso foi restrito!</h1>
        <div className="flex flex-col gap-4 w-full">
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all duration-200">
            <i className='bx bxs-home text-xl'></i>Pagina Inícial
          </Link>
        </div>
      </div>
    </section>
  );
}