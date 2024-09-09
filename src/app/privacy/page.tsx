import Header from "@/components/header/header";
import Privacy from "@/components/privacy/Privacy";
import Footer from "@/components/footer/footer";
import Copyright from "@/components/footer/copyright";
import Link from "next/link";

export default function PrivacyPage(){
    return (
        <>
            <Header />
            <Privacy />
            <Footer />
            <Copyright />
        </>
    )
}