'use client'

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButtonTermsPrivacy() {
    const router = useRouter();

    const handleClick = () => {
        if (router.back) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-20 left-4 flex items-center justify-center w-12 h-12 bg-main-color rounded-full transition duration-500 hover:bg-white"
        >
            <div className='flex justify-center items-center text-white w-12 h-12 hover:text-main-color'>
                <ArrowLeft className="w-6 h-6" />
            </div>
        </button>
    );
}