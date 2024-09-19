import Link from "next/link";
import NavFooter from "@/components/footer/nav-footer";
import SocialFooter from "@/components/footer/social-footer";

export default function Footer() {
    return (
        <footer className="py-20 relative bg-box-bg">
            <div className="px-4 md:container">
                <div className="row">
                    <div className="col-4 col-md-6 col-sm-12">
                        <div className="w-full max-w-150px">
                            <Link href="/" className="mt-footer-logo flex justify-start items-center text-logo-footer font-black group" id="link_footer">
                                <div className="relative flex flex-col items-center text-2xl font-bold cursor-pointer -mt-6">
                                    <div className="flex items-center mt-12">
<<<<<<< HEAD
                                        <i className="bx bx-movie-play bx-tada text-main-color group-hover:text-text-color"></i>
                                        <span className="text-text-color group-hover:text-main-color">ROYAL</span>
                                        <span className="text-main-color group-hover:text-text-color">TV</span>
=======
                                        <i className="bx bx-movie-play bx-tada text-main-color"></i>
                                        <span className="text-main-color">TIP</span>
                                        <span className="text-text-color">TV</span>
>>>>>>> b41e69b04c688c234ab262f90616fde1773dca81
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <p>
                            O TIPTV é uma plataforma de streaming que oferece filmes, séries e eventos ao vivo. Além de entretenimento,
                            trazemos informações sobre eventos, gastronomia, turismo e notícias, tudo focado em Petrópolis. Descubra o melhor da cidade com a gente!
                        </p>
                        <SocialFooter />
                    </div>
                    <div className="col-8 col-md-6 col-sm-12">
                        <NavFooter />
                    </div>
                </div>
            </div>
        </footer>
    );
}