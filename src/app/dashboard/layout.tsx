'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SideNavbar from '@/components/dashboard/SideNavbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Carregando...</p>;
    }

    if (status === 'unauthenticated') {
        redirect('/portal/login');
        return null;
    }

    const userCargo = session?.user?.cargo || null;

    return (
        <div className="flex h-screen">
            <SideNavbar userCargo={userCargo} />
            <main className="flex-grow p-6 mt-8 lg:mt-0">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;