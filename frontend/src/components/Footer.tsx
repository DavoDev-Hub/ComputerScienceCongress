import { siGithub, siInstagram, siFacebook } from "simple-icons"
export default function Footer() {
    return (
        <footer className="relative z-10 bg-[#002E5D]/90 backdrop-blur-md text-white py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="text-sm">
                        Creado por Juan Pablo Jimenez Martin - &copy; {new Date().getFullYear()} Universidad Autónoma de Aguascalientes. Todos los derechos reservados.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" aria-label="GitHub" className="hover:text-blue-300 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                                fill="currentColor"
                            >
                                <title>GitHub</title>
                                <path d={siGithub.path} />
                            </svg>
                        </a>

                        <a href="#" aria-label="Instagram" className="hover:text-blue-300 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                                fill="currentColor"
                            >
                                <title>Instagram</title>
                                <path d={siInstagram.path} />
                            </svg>
                        </a>

                        <a href="#" aria-label="Facebook" className="hover:text-blue-300 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                                fill="currentColor"
                            >
                                <title>Facebook</title>
                                <path d={siFacebook.path} />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

