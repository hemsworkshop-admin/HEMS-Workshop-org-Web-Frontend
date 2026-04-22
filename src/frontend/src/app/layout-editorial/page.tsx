import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function LayoutEditorial() {
  return (
    <div className="flex flex-col flex-grow bg-background">
      {/* Clean, narrative hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative w-full pt-20">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-8 leading-tight">
          Exploring the universe through <span className="text-primary italic">precision measurement</span>.
        </h1>
        <p className="text-2xl text-foreground/70 mb-12 max-w-3xl leading-relaxed">
          The 15th Harsh-Environment Mass Spectrometry Workshop is an intimate gathering of scientists dedicated to deploying complex analytical instruments where human intervention is impossible.
        </p>
        <Link href="#dates" className="text-foreground/50 hover:text-primary transition-colors flex flex-col items-center gap-2 mt-12 animate-bounce">
          <span className="text-sm font-bold uppercase tracking-widest">Discover the Workshop</span>
          <ChevronDown size={24} />
        </Link>
      </section>

      {/* Narrative Section 1: Dates & Location */}
      <section id="dates" className="py-32 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest">01 / The Event</h2>
              <h3 className="text-4xl font-bold text-foreground">September 15-18, 2025</h3>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Join us in Virginia Beach for four days of intensive technical sessions, poster presentations, and collaborative networking by the ocean.
              </p>
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                Plan your trip <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex-1 w-full aspect-square bg-background border border-foreground/10 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Why Attend */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-widest">02 / The Science</h2>
              <h3 className="text-4xl font-bold text-foreground">Beyond the Laboratory</h3>
              <p className="text-xl text-foreground/70 leading-relaxed">
                From abyssal ocean vents to the surface of Mars. We focus on the engineering challenges of miniaturization, autonomous sampling, and data telemetry.
              </p>
              <button className="flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all">
                Submit an abstract <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex-1 w-full aspect-square bg-surface border border-foreground/10 rounded-2xl overflow-hidden p-8 flex flex-col justify-center">
               <blockquote className="text-2xl font-serif text-foreground/90 italic leading-relaxed border-l-4 border-secondary pl-6">
                 "The HEMS workshop is the only place where I can discuss vacuum pump failures in microgravity with people who have actually solved the problem."
               </blockquote>
               <p className="mt-6 text-foreground/50 font-bold uppercase tracking-widest text-sm">— Dr. S. Collins, NASA JPL</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
