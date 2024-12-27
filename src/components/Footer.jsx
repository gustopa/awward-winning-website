import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from "react-icons/fa"

const links = [
    {href : 'https://discord.com',icon : <FaDiscord/>},
    {href : 'https://twitter.com',icon : <FaTwitter/>},
    {href : 'https://github.com',icon : <FaGithub/>},
    {href : 'https://twitch.com',icon : <FaTwitch/>},
]
const Footer = ()=>{
    return (
        <footer className="w-screen bg-violet-300 py-4 text-black">
            <div className="container mx-auto flex flex-col items-center">
                <p className="text-center text-white text-sm md:text-left">
                    &copy; 2024. All rights reserved
                </p>
                <div className="flex justify-center gap-4 md:justify-center mt-1">
                    {links.map(link=>
                        <a href={link.href} className="text-white" target="_blank" key={link.href}>{link.icon}</a>
                    )}
                </div>
                <a href="#privacypolicy" className="text-center text-sm text-white mt-1">Privacy Policy</a>
            </div>
        </footer>
    )
}

export default Footer