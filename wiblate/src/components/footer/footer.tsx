import Link from "next/link";
import NavFooter from "@/components/footer/nav-footer";
import SocialFooter from "@/components/footer/social-footer";

export default function Footer() {
    return (
        <footer className="py-20 relative bg-box-bg">
            <div className="px-4 md:container">
                <div className="row">
                    <div className="col-4 col-md-6 col-sm-12">
                        <div className="mt-5">
                            <div className="w-full max-w-150px">
                                <Link href="/" className="mt-footer-logo flex justify-start items-center text-logo-footer font-black" id="link_footer">
                                    <i className='bx bx-movie-play bx-tada text-main-color text-3xl'></i><span className="text-text-color">WIBL</span><span className="text-main-color">ATE</span>
                                </Link>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae blanditiis architecto sunt dignissimos doloremque. 
                                In ad obcaecati animi explicabo libero voluptas impedit, excepturi ratione cum. Esse iusto at quam minus!
                            </p>
                            <SocialFooter />
                        </div>
                    </div>
                    <div className="col-8 col-md-6 col-sm-12">
                        <NavFooter />
                    </div>
                </div>
            </div>
        </footer>
    );
}
