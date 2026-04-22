import Link from "next/link";
import { Activity } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="https://www.hems-workshop.org/Logos/HEMSLogo3.jpg" alt="HEMS Logo" className="h-10 w-auto mix-blend-multiply" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <div className="relative group">
                <button className="text-foreground hover:text-primary transition-colors flex items-center gap-1 font-medium">
                  Home Prototypes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-foreground/10 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="/" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary">Layout: Split Hero</Link>
                    <Link href="/layout-expo" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary">Layout A: Expo</Link>
                    <Link href="/layout-editorial" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary">Layout B: Editorial</Link>
                  </div>
                </div>
              </div>
              <Link href="/layout-portal" className="text-foreground hover:text-primary transition-colors font-medium">Portal</Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">About Us</Link>
              <Link href="/archive" className="text-foreground hover:text-primary transition-colors font-medium">Archive</Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</Link>
              <Link href="/join" className="bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-background px-4 py-2 rounded-md font-bold transition-all">
                Join HEMS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
