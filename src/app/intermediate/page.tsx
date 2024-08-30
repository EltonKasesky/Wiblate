"use client";

import Intermediate from "@/components/intermediate";
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Copyright from '@/components/footer/copyright';
import ProtectedPage from "@/components/ProtectedPage";

export default function IntermediatePage(){
    return (
        // <ProtectedPage allowedCargos={['Membro', 'Produtor']}>
        <div>
        <Header />
        <Intermediate />
        <Footer />
        <Copyright />
        </div>
        // </ProtectedPage>
    )
}