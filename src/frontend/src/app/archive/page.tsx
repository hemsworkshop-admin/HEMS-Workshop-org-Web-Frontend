import { Search, FileText, Filter, Download } from "lucide-react";

export default function Archive() {
  return (
    <div className="flex flex-col flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-foreground">
          Workshop <span className="text-primary border-b-4 border-primary">Archives</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl">
          Search over 25 years of HEMS proceedings, posters, and technical papers across all environments.
        </p>
      </div>

      {/* Search Interface Prototype */}
      <div className="bg-surface border border-foreground/10 p-6 rounded-lg shadow-lg mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" />
            <input 
              type="text" 
              placeholder="Search by keyword, author, or environment... (e.g. 'Mars Rover Quadrupole')" 
              className="w-full bg-background border border-foreground/20 rounded-md py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="bg-surface border border-foreground/20 text-foreground px-6 py-3 rounded-md flex items-center gap-2 hover:bg-foreground/5 transition-colors">
            <Filter size={18} /> Filters
          </button>
          <button className="bg-primary text-background px-8 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
            Search
          </button>
        </div>
        
        <div className="flex gap-2 flex-wrap text-sm">
          <span className="text-foreground/50 font-mono py-1">SUGGESTED:</span>
          <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-background transition-colors">Miniaturization</span>
          <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-background transition-colors">Oceanic</span>
          <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-background transition-colors">Spacecraft</span>
          <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-background transition-colors">Quadrupole</span>
        </div>
      </div>

      {/* Results Placeholder */}
      <div className="space-y-6">
        <h3 className="font-mono text-sm text-foreground/50 border-b border-foreground/10 pb-2">SHOWING LATEST PROCEEDINGS (PROTOTYPE VIEW)</h3>
        
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col md:flex-row gap-6 p-6 border border-foreground/10 bg-background hover:border-primary/50 transition-colors group">
            <div className="w-full md:w-48 aspect-video bg-surface flex items-center justify-center relative overflow-hidden flex-shrink-0">
               <FileText className="text-foreground/20 w-12 h-12" />
               <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 text-xs font-mono text-foreground/70 backdrop-blur-sm border border-foreground/10">PDF</div>
            </div>
            
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-secondary/20 text-secondary px-2 py-1 text-xs font-bold uppercase tracking-wider">14th Workshop (2023)</span>
                  <span className="text-foreground/50 text-sm font-mono">ID: HEMS-23-{item}04</span>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Development of a Ruggedized Ion Trap for Deep Sea Vents</h4>
                <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                  This paper discusses the engineering challenges and solutions for maintaining pressure integrity while operating a miniaturized ion trap mass spectrometer near abyssal hydrothermal vents.
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-foreground/10 pt-4 mt-2">
                <span className="text-sm text-foreground/80 font-medium">Dr. J. Smith, et al.</span>
                <button className="flex items-center gap-2 text-primary hover:text-primary/80 font-mono text-sm font-bold transition-colors">
                  <Download size={16} /> DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
