import { FaLinkedin, FaGithub } from "react-icons/fa";

export function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="border-t py-4 md:py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Budget Tracker. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-center text-sm text-muted-foreground">
            <span>Prepared by Vruti Joshi</span>
            <a 
              href="https://www.linkedin.com/in/vruti-joshi-47121aa8/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BdP6XVM2jRHmwz5DiI21gBg%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline flex items-center gap-1"
            >
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a 
              href="https://github.com/Vrutijoshi/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline flex items-center gap-1"
            >
               <FaGithub className="h-4 w-4" /> {/* Updated to GitHub icon */}
              Github
            </a>
          </div>
        </div>
      </footer>
    );
  }