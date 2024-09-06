"use client";

import Intermediate from "@/components/intermediate/Intermediate";
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Copyright from '@/components/footer/copyright';

export default function IntermediatePage() {
    return (
        <>
            <Header />
            <Intermediate />
            <Footer />
            <Copyright />
        </>
    )
}