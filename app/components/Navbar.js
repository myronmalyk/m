export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur border-b border-white/20 shadow-lg px-8 h-16 flex items-center justify-between z-[1000]">
            <div id="logo" className="flex items-center">
                <img src="/logo.png" alt="Logo" width={140} height={140} className="mr-10" />
            </div>
            <ul className="flex list-none m-0 p-0">
                <li className="mx-4">
                    <a href="#about-me" className="text-white no-underline hover:underline">About Us</a>
                </li>
                {/*<li className="mx-4">
                    <a href="#services" className="text-white no-underline hover:underline">Services</a>
                </li>*/}
                <li className="mx-4">
                    <a href="#projects" className="text-white no-underline hover:underline">Projects</a>
                </li>
                <li className="mx-4">
                    <a href="#contact" className="text-white no-underline hover:underline">Contact Us</a>
                </li>
            </ul>
        </nav>
    );
}