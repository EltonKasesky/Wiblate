import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    return (
        <>
            <Link href="/" className="absolute top-20 left-4">
                <button className="flex items-center justify-center w-12 h-12 bg-box-bg rounded-full transition duration-500 hover:bg-main-color">
                    <ArrowLeft className='text-white w-6 h-6' />
                </button>
            </Link>
        </>
    )
}