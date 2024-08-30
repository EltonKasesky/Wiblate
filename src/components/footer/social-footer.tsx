import Link from "next/link"

export default function SocialFooter() {
    return (
        <div className="flex items-center mt-5">
            <Link href="https://pt-br.facebook.com" target="_blank" className="social-item">
                <i className="bx bxl-facebook"></i>
            </Link>

            <Link href="https://x.com" target="_blank" className="social-item ml-5">
                <i className="bx bxl-twitter"></i>
            </Link>
            
            <Link href="https://www.instagram.com" target="_blank" className="social-item ml-5">
                <i className="bx bxl-instagram"></i>
            </Link>
        </div>
    )
}