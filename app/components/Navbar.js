export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur border-b border-white/20 shadow-lg px-8 h-16 flex items-center justify-between z-[1000]">
            <div id="logo" className="flex items-center">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                >
                    <circle cx="20" cy="20" r="18" stroke="#000" strokeWidth="2" fill="#fff" />
                    <text x="50%" y="55%" textAnchor="middle" fill="#000" fontSize="14" fontFamily="Arial" dy=".3em">M</text>
                </svg>
                <span className="text-white font-bold text-lg">Myron's Agency</span>
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