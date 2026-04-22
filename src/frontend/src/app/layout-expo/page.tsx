import Link from "next/link";
import { ArrowRight, Ticket, Users, Mic2 } from "lucide-react";

export default function LayoutExpo() {
  return (
    <div className="flex flex-col flex-grow bg-background">
      {/* Massive Hero Section */}
      <section className="relative overflow-hidden bg-surface py-24 lg:py-32 border-b border-foreground/10">
        <div className="absolute inset-0 opacity-10">
           {/* Placeholder for bustling expo hall image */}
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6">
            15th Annual Workshop
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight mb-6 uppercase">
            Innovate at the <span className="text-primary">Extremes</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            The premier global networking and technology expo for mass spectrometry in harsh environments. Join 500+ professionals pushing the boundaries of analytical chemistry.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-primary text-background px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Register Now
            </button>
            <button className="bg-background border border-foreground/20 text-foreground px-8 py-4 rounded font-bold uppercase tracking-wider hover:border-primary/50 transition-colors">
              View Program
            </button>
          </div>
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="py-16 relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background border border-foreground/10 rounded-lg p-8 shadow-xl hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Ticket size={24} />
            </div>
            <h3 className="text-xl font-bold uppercase mb-2">Early Bird Tickets</h3>
            <p className="text-foreground/70 mb-6">Secure your spot before July 1st and save $150 on full access passes.</p>
            <Link href="/join" className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Buy Pass <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="bg-background border border-foreground/10 rounded-lg p-8 shadow-xl hover:border-secondary/50 transition-colors group">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mic2 size={24} />
            </div>
            <h3 className="text-xl font-bold uppercase mb-2">Call for Speakers</h3>
            <p className="text-foreground/70 mb-6">Submit your abstract for the upcoming poster sessions and plenary talks.</p>
            <Link href="/contact" className="text-secondary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Submit Abstract <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="bg-background border border-foreground/10 rounded-lg p-8 shadow-xl hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 bg-surface text-foreground rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold uppercase mb-2">Sponsorships</h3>
            <p className="text-foreground/70 mb-6">Showcase your latest mass specs to the world's leading field researchers.</p>
            <Link href="/contact" className="text-foreground font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              View Packages <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Logos/Trust bar */}
      <section className="py-12 border-t border-foreground/5 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-8">Trusted by leading institutions</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Placeholder for corporate logos */}
            <div className="h-8 w-32 bg-foreground/20 rounded"></div>
            <div className="h-8 w-32 bg-foreground/20 rounded"></div>
            <div className="h-8 w-32 bg-foreground/20 rounded"></div>
            <div className="h-8 w-32 bg-foreground/20 rounded"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
