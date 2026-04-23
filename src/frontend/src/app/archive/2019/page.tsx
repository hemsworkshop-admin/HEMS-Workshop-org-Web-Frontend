import Link from "next/link";
import { Calendar, MapPin, Users, FileText, Download, Building, ArrowLeft } from "lucide-react";

export default function Workshop2019() {
  return (
    <div className="flex flex-col flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <Link href="/archive" className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors mb-8 w-fit">
        <ArrowLeft size={16} /> Back to Archives
      </Link>

      <div className="bg-surface border border-foreground/10 rounded-lg p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 font-mono">
          13th Annual Workshop
        </span>
        
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
          2019 HEMS Workshop
        </h1>
        
        <p className="text-xl text-foreground/80 max-w-3xl mb-8 leading-relaxed">
          The 13th Workshop on Harsh-Environment Mass Spectrometry gathered leading scientists and engineers to discuss the latest advancements in ruggedized instrumentation and field-deployable analytical systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 text-foreground/70 font-medium border-b border-foreground/10 pb-8 mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="text-secondary" size={20} />
            <span>September 16-19, 2019</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-secondary mt-1 flex-shrink-0" size={20} />
            <span>
              Myrtle Beach, South Carolina<br/>
              <span className="text-sm font-normal text-foreground/50">Hosted by Collins Aerospace</span>
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Workshop Resources</h3>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://www.hems-workshop.org/13thWS/quicklinkalpha.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md hover:border-secondary hover:text-secondary transition-colors text-sm font-bold"
            >
              <Download size={16} /> Abstracts & Presentations
            </a>
            <a 
              href="https://www.hems-workshop.org/13thWS/2019%20HEMS%20Workshop%20Attendees.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md hover:border-primary hover:text-primary transition-colors text-sm font-bold"
            >
              <Users size={16} /> Participant List (PDF)
            </a>
            <a 
              href="https://www.hems-workshop.org/13thWS/13thSponsors.html" 
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
              <h3 className="font-bold text-lg">Monday, September 16, 2019: Travel Day</h3>
            </div>
            <div className="divide-y divide-foreground/5">
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">5:30 p.m.</div>
                <div>
                  <h4 className="font-bold">Registration and Welcome Reception</h4>
                  <p className="text-sm text-foreground/70 mt-1">Coastal Grill Bar - Manager's Reception</p>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="border-b border-foreground/10 last:border-0">
            <div className="bg-surface px-6 py-4 border-b border-foreground/10">
              <h3 className="font-bold text-lg">Tuesday, September 17, 2019: HEMS Workshop</h3>
            </div>
            <div className="divide-y divide-foreground/5">
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">8:00 a.m.</div>
                <div>
                  <h4 className="font-bold">Set-up of vendor tables and registration</h4>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">8:30 a.m.</div>
                <div>
                  <h4 className="font-bold">Welcome Remarks</h4>
                </div>
              </div>
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">8:40 a.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session I</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">8:40 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/01%20Lauritsen.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">On-site Applications of MIMS and the Importance of Interface Design as Exemplified by Highly Unusual "Fragments" in MIMS Mass Spectra of Chloramines and Bromamines</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Frants R. Lauritsen</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Lauritsen.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:30 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/02%20Amsden.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Use of Computational Sensing Techniques to Improve the Performance of Mass Spectrometers in Harsh Environments</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Jason J. Amsden</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Amsden.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:00 a.m.</div>
                <div>
                  <h4 className="font-bold text-foreground/60">Mid-morning Break</h4>
                </div>
              </div>
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:30 a.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session II</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">10:30 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/03%20Progent.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Development of Micro-Time-Of-Flight Mass Spectrometer with Orthogonal Injection for In situ Gas Analysis</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Frédéric Progent</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Progent.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:00 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/04%20Danell.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The Dragonfly Mission to Titan and the Enabling Technologies of the DraMS Mass Spectrometer Onboard</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">R. M. Danell</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Danell.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:30 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/05%20Aloui.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Evaluation of Aperture Materials for Coded Apertures Used in a Portable Cycloidal Miniature Mass Spectrometer</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Tanouir Aloui</span>, 2019 Student Award Winner</p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Aloui.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">12:00 p.m.</div>
                <div>
                  <h4 className="font-bold">Lunch Provided</h4>
                  <p className="text-sm text-foreground/70 mt-1">Palladium Terrace</p>
                </div>
              </div>
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">2:00 p.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session III</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">2:00 p.m.</span>Vendor Presentations</p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">3:30 p.m.</span>Poster Presenter Lightning Round</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-secondary/5 border-l-4 border-secondary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">4:00 p.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-secondary text-lg">Poster/Vendor Session <span className="text-sm font-normal text-foreground/60">(Palladium Foyer, Refreshments served)</span></h4>
                  <div className="mt-3 divide-y divide-secondary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold">Determination of the Presence of Biological Compounds in Aerosol Particles with a Linear Ion Trap</p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Nathan Grimes</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Grimes.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><a href="https://www.hems-workshop.org/13thWS/Presentations/23%20van%20Ameron.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Overview of the MOMA Mass Spectrometer and Examination of Some Mineral Matrices as Learning Curve for MOMA Return Data</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">F. H. W. van Amerom</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/van%20Ameron.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><a href="https://www.hems-workshop.org/13thWS/Presentations/24%20Vyas.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">A Comparison of Thermionic Filament and Carbon Nanotube Field Emitter Array-based Ion Sources in Coded Aperture Miniature Mass Spectrometers</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Raul Vyas</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Vyas.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><a href="https://www.hems-workshop.org/13thWS/Presentations/25%20Wieman.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">In-situ Measurements of δ13C and δ18O of Dissolved CO2 using an Underwater Mass Spectrometer</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Scott T. Wieman</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Wieman.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">7:00 p.m.</div>
                <div>
                  <h4 className="font-bold">Evening Free</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="border-b border-foreground/10 last:border-0">
            <div className="bg-surface px-6 py-4 border-b border-foreground/10">
              <h3 className="font-bold text-lg">Wednesday, September 18, 2019: HEMS Workshop</h3>
            </div>
            <div className="divide-y divide-foreground/5">
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">8:30 a.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session IV</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">8:30 a.m.</span>Electric Field Fragmentation of Mobility Selected Ions Using Tandem Ion Mobility Spectrometry at Ambient Pressure with Molecular Identification through Neural Network Analysis</p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Gary A. Eiceman</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Eiceman.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:00 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/07%20Vazquez.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chemical Ionization of Xenon and Detection Utilizing a High Precision Digital Ion Trap (DIT)</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Timothy Vazquez</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Vazquez.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:30 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/08%20Berkout.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Portable Mass Spectrometer for Explosives and Narcotics Detection</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Vadym Berkout</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Berkout.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:00 a.m.</div>
                <div>
                  <h4 className="font-bold text-foreground/60">Group Photo / Mid-morning Break</h4>
                </div>
              </div>
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:30 a.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session V</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">10:30 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/09%20Virgen.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Detection and Analysis of Simulated Chemical Warfare Agents using Portable Mass Spectrometry</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Camila Anguiano Virgen</span>, 2019 Student Award Winner</p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Virgen.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:00 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/10%20Horvath.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Designing a Coded Aperture Cycloidal Mass Analyzer to Detect Perfluorocarbon Tracers</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Kathleen L. Horvath</span>, 2019 Student Award Winner</p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Horvath.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:30 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/11%20Jackson.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SIMION Beyond Ion Simulation: Field Analysis, Synthesis, and Harmonic Analysis for MS Design</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Robert H. Jackson</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Jackson.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">12:00 p.m.</div>
                <div>
                  <h4 className="font-bold">Lunch on your own</h4>
                </div>
              </div>
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">1:30 p.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session VI</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">1:30 p.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/12%20Madzunkov.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Spacecraft Atmosphere Monitor (S.A.M.) First Operational Data</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Stojan Madzunkov</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Madzunkov.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">2:00 p.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/13%20Kaplan.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The Future of Linear Ion Trap Mass Spectrometer Systems for Planetary Exploration</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">D. A. Kaplan</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Kaplan.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">2:30 p.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/14%20Schmidt.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Onsite Analysis of Illicit Drugs by Portable Ion Trap Gas Chromatography-Mass Spectrometry (GCMS)</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Charlie Schmidt</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Schmidt.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">3:00 p.m.</div>
                <div>
                  <h4 className="font-bold text-foreground/60">Mid-Afternoon Break</h4>
                </div>
              </div>
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">3:30 p.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session VII</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">3:30 p.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/15%20Short.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Membrane Inlet Mass Spectrometry for Ocean Worlds</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">R. Timothy Short</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Short.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">4:00 p.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/16%20Lasi.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Evolution of a Compact TOF Mass Spectrometer from Space Exploration to the Internet of Things</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">D. Lasi</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Lasi.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">4:30 p.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/17%20Christian.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Development of a Low-Cost, Low-Power, Miniature Sector Mass Spectrometer with IonCCD Detection</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Noah Christian</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Christian.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">7:00 p.m.</div>
                <div>
                  <h4 className="font-bold">Workshop Dinner</h4>
                  <p className="text-sm text-foreground/70 mt-1">Lands End</p>
                </div>
              </div>
            </div>
          </div>

          {/* Day 4 */}
          <div className="border-b border-foreground/10 last:border-0">
            <div className="bg-surface px-6 py-4 border-b border-foreground/10">
              <h3 className="font-bold text-lg">Thursday, September 19, 2019: HEMS Workshop</h3>
            </div>
            <div className="divide-y divide-foreground/5">
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">9:00 a.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session VIII</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:00 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/18%20Verbeck.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Smart City Initiatives and Where HEMS Can Play a Role</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Guido Verbek</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Verbeck.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">9:30 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/19%20Sheridan.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LUVMI Rover to Characterise Volatile Content in Lunar Polar Regions</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Simon Sheridan</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Sheridan.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:00 a.m.</div>
                <div>
                  <h4 className="font-bold text-foreground/60">Mid-morning Break</h4>
                </div>
              </div>
              <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">10:30 a.m.</div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-lg">Technical Session IX</h4>
                  <div className="mt-3 divide-y divide-primary/10">
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">10:30 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/20%20Taghioskoui.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Low-Pressure ICP-MS for Planetary Trace Elemental Analysis</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Mazdak Taghioskoui</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Taghioskoui.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
                    </div>
                    <div className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold"><span className="text-foreground/50 font-mono font-normal mr-2">11:00 a.m.</span><a href="https://www.hems-workshop.org/13thWS/Presentations/21%20Maiwald.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">QIT-Mass Spectrometer for Lunar and Planetary Applications</a></p>
                      <p className="text-sm text-foreground/70 mt-1"><span className="underline">Frank Maiwald</span></p>
                      <p className="text-xs mt-1"><a href="https://www.hems-workshop.org/13thWS/Abstracts/Maiwald.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a></p>
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
                <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">12:00 p.m.</div>
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
