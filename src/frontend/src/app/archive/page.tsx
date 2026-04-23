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

      {/* Legacy Workshops List */}
      <div className="space-y-4">
        <h3 className="font-mono text-sm text-foreground/50 border-b border-foreground/10 pb-2 mb-6">BROWSE PAST WORKSHOPS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 14, year: 2022, title: "14th HEMS Workshop", url: "/archive/2022", isInternal: true },
            { id: 13, year: 2019, title: "13th HEMS Workshop", url: "/archive/2019", isInternal: true },
            { id: 12, year: 2018, title: "12th HEMS Workshop", url: "https://www.hems-workshop.org/12thWS_EUROHEMS/12thWS.html" },
            { id: 11, year: 2017, title: "11th HEMS Workshop", url: "https://www.hems-workshop.org/11thWS/11thWS.html" },
            { id: 10, year: 2015, title: "10th HEMS Workshop", url: "https://www.hems-workshop.org/10thWS/10thWS.html" },
            { id: 9, year: 2013, title: "9th HEMS Workshop", url: "https://www.hems-workshop.org/9thWS/9thWS.html" },
            { id: 8, year: 2011, title: "8th HEMS Workshop", url: "https://www.hems-workshop.org/8thWS/8thWS.html" },
            { id: 7, year: 2009, title: "7th HEMS Workshop", url: "https://www.hems-workshop.org/7thWS/7thWS.html" },
            { id: 6, year: 2007, title: "6th HEMS Workshop", url: "https://www.hems-workshop.org/6thWS/6thWS.html" },
            { id: 5, year: 2005, title: "5th HEMS Workshop", url: "https://www.hems-workshop.org/5thWS/5thWS.html" },
            { id: 4, year: 2003, title: "4th HEMS Workshop", url: "https://www.hems-workshop.org/4thWS/4thWS.html" },
            { id: 3, year: 2002, title: "3rd HEMS Workshop", url: "https://www.hems-workshop.org/3rdWS/3rdWS.html" },
            { id: 2, year: 2001, title: "2nd HEMS Workshop", url: "https://www.hems-workshop.org/2ndWS/2ndWS.html" },
            { id: 1, year: 1999, title: "1st HEMS Workshop", url: "https://www.hems-workshop.org/1stWS/1stWS.html" }
          ].map((workshop) => (
            <a 
              key={workshop.id} 
              href={workshop.url}
              target={workshop.isInternal ? "_self" : "_blank"}
              rel={workshop.isInternal ? "" : "noopener noreferrer"}
              className="flex flex-col p-6 border border-foreground/10 bg-surface hover:border-primary/50 transition-colors group rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-lg font-bold font-mono">
                  {workshop.year}
                </div>
                <FileText className="text-foreground/20 group-hover:text-primary/50 transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{workshop.title}</h4>
              <p className="text-foreground/60 text-sm mt-auto">
                View legacy archive program, materials, and participants list.
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
