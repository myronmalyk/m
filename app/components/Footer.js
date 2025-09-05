export default function Footer() {
    return (
        <footer className="w-full bg-black text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 flex flex-col items-start">
            <span className="text-3xl font-bold mb-2">
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
                <span className="text-white font-bold text-lg">Myron&apos;s Agency</span>
            </div>
            </span>
            <span className="text-gray-400">Transforming spaces, exceeding expectations.</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <a href="#about-me" className="hover:text-yellow-400 transition">About</a>
            <a href="#what-we-do" className="hover:text-yellow-400 transition">Services</a>
            <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <a href="mailto:info@yourbrand.com" className="hover:text-yellow-400 transition">myronmalyk@gmail.com</a>
            <a href="#" className="hover:text-yellow-400 transition">
              <svg width="24" height="24" fill="currentColor" className="inline-block"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.36 0-4.28 1.92-4.28 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.2 1.64 4.16c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61a4.27 4.27 0 0 1-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.34 0-.67-.02-1-.06A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z"/></svg>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Myron&apos;s Agency. All rights reserved.
        </div>
      </footer>
    );
}