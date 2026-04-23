import Link from "next/link";
import { Calendar, MapPin, Users, FileText, Download, Building, ArrowLeft } from "lucide-react";

export default function Workshop2022() {
  return (
    <div className="flex flex-col flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <Link href="/archive" className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors mb-8 w-fit">
        <ArrowLeft size={16} /> Back to Archives
      </Link>

      <div className="bg-surface border border-foreground/10 rounded-lg p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 font-mono">
          14th Annual Workshop
        </span>
        
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
          2022 HEMS Workshop
        </h1>
        
        <p className="text-xl text-foreground/80 max-w-3xl mb-8 leading-relaxed">
          The 14th Workshop on Harsh-Environment Mass Spectrometry gathered leading scientists and engineers to discuss the latest advancements in ruggedized instrumentation and field-deployable analytical systems.
        </p>

          <div className="flex flex-col sm:flex-row gap-6 text-foreground/70 font-medium border-b border-foreground/10 pb-8 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="text-secondary" size={20} />
              <span>September 26-29, 2022</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-secondary mt-1 flex-shrink-0" size={20} />
              <span>
                Courtyard Cocoa Beach Cape Canaveral<br/>
                <span className="text-sm font-normal text-foreground/50">3435 N. Atlantic Ave, Cocoa Beach, FL 32931</span>
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Workshop Resources</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.hems-workshop.org/14thWS/quicklinkalpha.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md hover:border-secondary hover:text-secondary transition-colors text-sm font-bold"
              >
                <Download size={16} /> Abstracts & Presentations
              </a>
              <a 
                href="https://www.hems-workshop.org/14thWS/2022%20HEMS%20Workshop%20Attendees.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md hover:border-primary hover:text-primary transition-colors text-sm font-bold"
              >
                <Users size={16} /> Participant List (PDF)
              </a>
              <a 
                href="https://www.hems-workshop.org/14thWS/14thSponsors.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md hover:border-primary hover:text-primary transition-colors text-sm font-bold"
              >
                <Building size={16} /> Corporate Sponsors
              </a>
            </div>
          </div>
        </div>

        {/* Technical Program Inline */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <FileText className="text-primary" /> Technical Program
          </h2>
          
          <div className="bg-background border border-foreground/10 rounded-lg overflow-hidden">
            {/* Day 1 */}
            <div className="border-b border-foreground/10 last:border-0">
              <div className="bg-surface px-6 py-4 border-b border-foreground/10">
                <h3 className="font-bold text-lg">Monday, September 26, 2022: Travel Day</h3>
              </div>
              <div className="divide-y divide-foreground/5">
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">6:00 p.m.</div>
                  <div>
                    <h4 className="font-bold">Welcome Reception</h4>
                    <p className="text-sm text-foreground/70 mt-1">Location: Sandbar Sports Grill, 4301 Ocean Beach Blvd, Cocoa Beach, FL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="border-b border-foreground/10 last:border-0">
              <div className="bg-surface px-6 py-4 border-b border-foreground/10">
                <h3 className="font-bold text-lg">Tuesday, September 27, 2022: HEMS Workshop</h3>
              </div>
              <div className="divide-y divide-foreground/5">
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">7:30 a.m.</div>
                  <div>
                    <h4 className="font-bold">Set-up of vendor tables & registration</h4>
                    <p className="text-sm text-foreground/70 mt-1">Mars Room</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">8:00 a.m.</div>
                  <div>
                    <h4 className="font-bold">Breakfast</h4>
                    <p className="text-sm text-foreground/70 mt-1">Lobby</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">8:45 a.m.</div>
                  <div>
                    <h4 className="font-bold">Welcome Remarks</h4>
                    <p className="text-sm text-foreground/70 mt-1">Mercury Room</p>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-secondary/5 border-l-4 border-secondary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">9:00 a.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-secondary text-lg">Plenary Lecture <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3">
                      <div className="py-2 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold">Giving Humanity a Platform in Space to Improve Life on Earth</p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Nate Wood</span></p>
                        <p className="text-xs text-foreground/60 mt-1">Abstract</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:00 a.m.</div>
                  <div>
                    <h4 className="font-bold text-foreground/60">Mid-morning Break (Lobby)</h4>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:30 a.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">Technical Session I <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">10:30 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Tuesday/Verbeck.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Breath Markers of Disease Identifiers for Portable Mass Spectrometry</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Guido Verbeck</span></p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Verbeck.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:00 a.m.</span>Development of mass spectrometer for organic molecule detection in the future space life search missions</p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Dejan Maletic</span>, Victor Abrahamsson, Jurij Simcic, Dragan Nikolic, Stojan Madzunkov</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Maletic.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:30 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Tuesday/Li.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Development of the Dragonfly Mass Spectrometer (DraMS) and Cryogenic Sample Testing in Laser Desorption Mass Spectrometry (LDMS) Mode</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Xiang Li</span>, Friso van Amerom, Andrej Grubisic, Jacob Graham, Ryan Danell, Desmond Kaplan, Marco Castillo, Matthew Francom, Peter Barfknecht, William Brinckerhoff, Melissa Trainer</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Li.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">12:00 noon</div>
                  <div>
                    <h4 className="font-bold">Lunch</h4>
                    <p className="text-sm text-foreground/70 mt-1">Sponsored by Pfeiffer (Lobby)</p>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">1:00 p.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">Technical Session II <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">1:00 p.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Tuesday/Lauritsen.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Investigation of disinfection byproduct formation during advanced water treatment using a transportable chemical reactor membrane inlet mass spectrometer</a></p>
                        <p className="text-sm text-foreground/70 mt-1">James N. McPherson, Freja T. Larsen, Christine J. McKenzie, <span className="underline">Frants R. Lauritsen</span></p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Lauritsen.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">1:30 p.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Tuesday/McBride.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Multi-dimensional Portable Mass Spectrometry for Biological Detection</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Ethan McBride</span>, Zachary Sasiene, William Hlavacek, Nileena Velappan, Erick LeBrun, Nathan Patterso3, Martin Dufresne, Melissa Farrow, Jeremy Norris, Richard Caprioli, Trevor Glaros</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/McBride.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">2:00 p.m.</div>
                  <div>
                    <h4 className="font-bold text-foreground/60">Coffee & Sponsor Introductions</h4>
                    <p className="text-sm text-foreground/70 mt-1">Mercury Room</p>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">3:00 p.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">Technical Session III <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">3:00 p.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Tuesday/Sams.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Two-Dimensional Tandem Mass Spectrometry as a Method for Bacterial Profiling</a></p>
                        <p className="text-sm text-foreground/70 mt-1">Lucas Szalwinski, L. Edwin Gonzalez, <span className="underline">Thomas Sams</span>, Eric Dziekonski, Graham Cooks</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Szalwinski,.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">3:30 p.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Tuesday/Nazarov.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Planar Design Differential Ion Mobility Spectrometer (DMS) as a Prefilter for Portable Atmospheric Pressure Ionization Mass Spectrometers</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Erkinjon Nazarov</span>, James Alberti, Peter Fowler, Gary Eiceman, Bradley Schneider, Thomas Covey</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Nazarov.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">4:00 p.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Tuesday/Panchagnula.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MT Explorer 30: A Portable Tandem Mass Spectrometer - Development and Applications</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Venkateswarlu Panchagnula</span>, Konstantin Novoselov, Victor Laiko, Caleigh O'Connor, Madhuri Gupta, Vishal Mahale, Vladimir Doroshenko</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Panchagnula.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">6:00 p.m.</div>
                  <div>
                    <h4 className="font-bold">Workshop Dinner</h4>
                    <p className="text-sm text-foreground/70 mt-1">Sponsored by IMI Adaptas, Fishlips Waterfront Bar and Grill, 610 Glen Cheek Dr, Port Canaveral, FL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 3 */}
            <div className="border-b border-foreground/10 last:border-0">
              <div className="bg-surface px-6 py-4 border-b border-foreground/10">
                <h3 className="font-bold text-lg">Wednesday, September 28, 2022: HEMS Workshop</h3>
              </div>
              <div className="divide-y divide-foreground/5">
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">7:45 a.m.</div>
                  <div>
                    <h4 className="font-bold">Breakfast</h4>
                    <p className="text-sm text-foreground/70 mt-1">Lobby</p>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">9:00 a.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">Technical Session IV <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:00 a.m.</span>MS field applications in CBSA operations</p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Marie-Josée Binette</span></p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Binette%20.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:30 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Wednesday/Eiceman.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Structural Content in Field Induced Fragmentation Spectra from Tandem Ion Mobility Spectrometry toward Molecular Identification</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Gary Eiceman</span>, Peter Fowler, Hossein Shokri, Erkin Nazarov, Ben Gardner</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Eiceman.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:00 a.m.</div>
                  <div>
                    <h4 className="font-bold text-foreground/60">Mid-morning Break (Lobby)</h4>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:30 a.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">Technical Session V <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">10:30 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Wednesday/van%20Amerom.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Overview and Testing of the Mars Organic Molecule Analyzer (MOMA), a Gas Chromatograph and Laser Desorption Mass Spectrometer</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Friso van Amerom</span>, Andrej Grubisic, Marco Castillo, Desmond A. Kaplan, Xiang Li, Ryan M. Danell, Stephanie A. Getty, William B. Brinckerhoff, Arnaud Buch, Fabien Stalport, Naila Chaouche, Clara Azemard, François Raulin, Noel Grand, Caroline Freissinet, Melissa Guzman, Cyril Szopa, Teresa Fornaro, John Robert Brucato, Sandra Siljeström, Walter Goetz, Fred Goesmann, and the MOMA team</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/van%20Amerom%20.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:00 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Wednesday/Alberti.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Plasma Ion Source for Atmospheric Pressure Ionization Mass - Spectrometry</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Jim Alberti</span>, Erkin Nazarov, Peter Fowler, Gary Eiceman</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Alberti.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:30 a.m.</span>A Ruggedized, Portable Triple Quadrupole Mass Spectrometer for Mobile Detection of Chemical Threats in Urban Environments</p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Alexandra Wrobel</span>, Kevin Tangen, Geoffrey Geurtsen, Jeffrey Werlich, Anthony Castellanos, Vladimir Kekukh, Alla Ostrinskaya, Ta-Hsuan Ong, Ken Ribeiro, Roderick Kunz</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Wrobel.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">12:00 noon</div>
                  <div>
                    <h4 className="font-bold">Lunch</h4>
                    <p className="text-sm text-foreground/70 mt-1">Lobby</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">3:00 p.m.</div>
                  <div>
                    <h4 className="font-bold text-foreground/60">Mid-Afternoon Break (Lobby)</h4>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">3:30 p.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">Technical Session VI <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">3:30 p.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Wednesday/Chaudhary.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chip-Scale Mass Spectrometry: Yet another contender for Harsh Environments? OR can it help redefine Harsh Environments?</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Ashish Chaudhary</span></p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Chaudhary%20.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">4:00 p.m.</span>Europan Molecular Indicators of Life Investigation (EMILI)</p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Desmond Kaplan</span>, M. Fernanda Mora, Tomas Drevinskas, Ryan Danell, Andrej Grubisic, Aaron Noell, Bethany Theiling, Friso van Amerom, Marco Castillo, Xiang Li, Antonio Ricco, Richard Quinn, Cyril Szopa, Caroline Freissinet, Arnaud Buch, Fabien Stalport, Peter Willis, William Brinckerhoff</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Kaplan.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">Evening</div>
                  <div>
                    <h4 className="font-bold">Dinner on your own</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 4 */}
            <div className="border-b border-foreground/10 last:border-0">
              <div className="bg-surface px-6 py-4 border-b border-foreground/10">
                <h3 className="font-bold text-lg">Thursday, September 29, 2022: HEMS Workshop</h3>
              </div>
              <div className="divide-y divide-foreground/5">
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">7:30 a.m.</div>
                  <div>
                    <h4 className="font-bold">Breakfast</h4>
                    <p className="text-sm text-foreground/70 mt-1">Lobby</p>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">8:30 a.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">Technical Session VII <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">8:30 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Wednesday/Jackson.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instrument Modeling: Simulation, Field Analysis, Synthesis, and Space-Charge</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Robert Jackson</span>, Mark Osgood</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Jackson.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:00 a.m.</span>Lunar Cube Sat Mass Spectrometer</p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Stojan Madzunkov</span>, Dragan Nikolic</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Madzunkov.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:30 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Thursday/Gentz.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">An optimized membrane inlet system (MIS) for underwater sensors. - From idea to product</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Torben Gentz</span>, Malte Höhn</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Gentz.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:00 a.m.</div>
                  <div>
                    <h4 className="font-bold text-foreground/60">Mid-morning Break (Lobby)</h4>
                  </div>
                </div>
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:30 a.m.</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">Technical Session VIII <span className="text-sm font-normal text-foreground/60">(Mercury Room)</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">10:30 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Thursday/Berkout.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Portable MALDI-TOF Mass Spectrometer for Bioaerosol Detection</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Vadym Berkout</span>, Stuart Collymore, Scott Ecelberger, Mike McLoughlin, Wayne Bryden, et al.</p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Berkout.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:00 a.m.</span><a href="https://www.hems-workshop.org/14thWS/Talks/Thursday/Pedder.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RF-Only Quadrupole Mass Spectrometry for High Sensitivity at High Mass Resolution</a></p>
                        <p className="text-sm text-foreground/70 mt-1"><span className="underline">Randy Pedder</span></p>
                        <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/14thWS/Abstracts/Pedder.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">11:30 a.m.</div>
                  <div>
                    <h4 className="font-bold">Closing Remarks</h4>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">12:00 noon</div>
                  <div>
                    <h4 className="font-bold">Workshop Ends</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
