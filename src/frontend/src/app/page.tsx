import Link from "next/link";
import { ArrowRight, Globe, Database, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex-grow flex items-center py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-background pointer-events-none" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Next Workshop: Sept 15-18, 2025 • Virginia Beach
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tighter mb-6 uppercase">
                Science at the <br />
                <span className="text-primary border-b-4 border-primary pb-2">Extremes</span>
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8 max-w-lg leading-relaxed">
                In situ mass spectrometry in the most punishing environments known to science—from deep space and abyssal oceans to battlefield scenarios.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/archive" className="flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                  Explore Archives
                  <ArrowRight size={18} />
                </Link>
                <Link href="/about" className="flex items-center gap-2 bg-surface text-foreground border border-foreground/20 px-6 py-3 rounded-md font-medium hover:border-primary/50 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-end">
              <div className="relative w-full aspect-square max-w-md">
                {/* Abstract visualization placeholder */}
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-4 border border-secondary/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                <div className="absolute inset-8 border-2 border-dashed border-primary/40 rounded-full animate-[spin_20s_linear_infinite]" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-surface/80 backdrop-blur-md p-8 border border-primary/30 rounded-2xl shadow-2xl">
                    <div className="font-mono text-xs text-primary mb-4 flex justify-between">
                      <span>SYS.STAT: ONLINE</span>
                      <span>ENV: HARSH</span>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-2 w-48 bg-foreground/10 rounded overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${Math.random() * 60 + 20}%` }} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-surface/50 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-bold uppercase tracking-tight">Core Disciplines</h2>
            <div className="w-20 h-1 bg-primary mt-4 mx-auto md:mx-0" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background border border-foreground/10 p-8 hover:border-primary/50 transition-colors group">
              <Globe className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3 uppercase">Autonomous Sampling</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Strategies for unattended operations and adaptive sampling in isolated environments where human intervention is impossible.
              </p>
            </div>
            
            <div className="bg-background border border-foreground/10 p-8 hover:border-primary/50 transition-colors group">
              <Cpu className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3 uppercase">Miniaturization</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Enabling technologies for making mass spectrometer components rugged, portable, and low-power without sacrificing analytical precision.
              </p>
            </div>
            
            <div className="bg-background border border-foreground/10 p-8 hover:border-primary/50 transition-colors group">
              <Database className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3 uppercase">Data telemetry</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Advanced data processing and communications protocols for transmitting complex spectral data across low-bandwidth channels.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
