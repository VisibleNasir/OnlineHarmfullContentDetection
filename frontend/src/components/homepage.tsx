
import { useNavigate } from "react-router-dom";

import { 
    Menu, 
    X, 
} from "lucide-react";
import { useState } from "react";
import Detect from "./homepage/Detect";

const Homepage = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="bg-black min-h-screen w-screen flex flex-col">
                {/* Navbar */}
                <div className="grid-cols-1 bg-zinc-950 border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-10 py-3 outline ">
                    <div className="flex items-center gap-2  h-16">
                        <img src="./logo.png" alt="logo" className="w-10 h-8" />
                        <div className="logo text-white text-xl font-bold cursor-pointer">Harmfull Content Detector</div>
                    </div>
                    
                    {/* Mobile menu toggle button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-white p-2"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="nav-links hidden md:flex justify-between items-center w-1/2 pr-40 h-16">
                        <ul className="flex justify-between items-center w-full md:text-2xl lg:text-4x">
                            <div>
                                <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/")}>Home</li>
                            </div>
                            <div>
                                <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/detect")}>Detect</li>
                            </div>
                            <div>
                                <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/songs")}>Songs</li>
                            </div>
                            <div>
                                <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/contact")}>Contact</li>
                            </div>
                        </ul>
                    </div>
                </div>

                

                {/* Mobile Side Navigation */}
                <div className={`fixed top-0 right-0 h-full bg-black w-64 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMobileMenu} className="text-white">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <ul className="flex flex-col p-4 space-y-6">
                        <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/"); toggleMobileMenu();}}>
                            Home
                        </li>
                        <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/detect"); toggleMobileMenu();}}>
                            Detect
                        </li>
                        <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/songs"); toggleMobileMenu();}}>
                            Songs
                        </li>
                        <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/contact"); toggleMobileMenu();}}>
                            Contact
                        </li>
                        
                    </ul>
                </div>

                {/* Overlay when mobile menu is open */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={toggleMobileMenu}
                    ></div>
                )}

                <div className="flex flex-col grid-cols-2 items-center justify-center text-white" >
                    <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
                        Protect Minds From Harm ! <br />
                    </h1>
                    <Detect/>
                </div>
            </div>
        </>
    )
}

export default Homepage;