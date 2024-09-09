import Link from "next/link";
import Image from "next/image";

export default function NavFooter() {
    return (
        <div className="row">
            <div className="col-3 col-md-6 col-sm-6">
                <div className="mt-5">
                    <p><b>RoyalTV</b></p>
                    <ul className="footer-menu">
                        <li>
                            <Link href="/" className="nav-footer">
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link href="/portal/login" className="nav-footer">
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="nav-footer">
                                Sobre
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="nav-footer">
                                Contato
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-3 col-md-6 col-sm-6">
                <div className="mt-5">
                    <p><b>Browse</b></p>
                    <ul className="footer-menu">
                        <li>
                            <Link href="#" className="nav-footer">
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-footer">
                                My profile
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-footer">
                                Pricing plans
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-footer">
                                Contacts
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-3 col-md-6 col-sm-6">
                <div className="mt-5">
                    <p><b>Browse</b></p>
                    <ul className="footer-menu">
                        <li>
                            <Link href="#" className="nav-footer">
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-footer">
                                My profile
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-footer">
                                Pricing plans
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="nav-footer">
                                Contacts
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-3 col-md-6 col-sm-6">
                <div className="mt-5">
                    <p><b>Download</b></p>
                    <ul className="flex flex-col gap-2 footer-menu">
                        <li>
                            <Link href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer">
                                <Image 
                                    src="/footer/google-play.png" 
                                    alt="Google Play" 
                                    width={200}
                                    height={60}
                                    className="inline-block transition-transform duration-200 ease-in-out hover:translate-x-1"
                                    priority
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.apple.com/br/app-store" target="_blank" rel="noopener noreferrer">
                                <Image 
                                    src="/footer/app-store.png" 
                                    alt="App Store" 
                                    width={200}
                                    height={60} 
                                    className="inline-block transition-transform duration-200 ease-in-out hover:translate-x-1"
                                    priority
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
