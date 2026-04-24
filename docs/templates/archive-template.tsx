import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, FileText, Download, Building, ArrowLeft } from "lucide-react";

export default function Workshop[WORKSHOP_YEAR]() {
  return (
    <div className="flex flex-col flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <Link href="/archive" className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors mb-8 w-fit">
        <ArrowLeft size={16} /> Back to Archives
      </Link>

      <div className="bg-surface border border-foreground/10 rounded-lg p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 font-mono">
          [WORKSHOP_EDITION_NUMBER: e.g. 14th] Annual Workshop
        </span>
        
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
          [WORKSHOP_YEAR: e.g. 2022] HEMS Workshop
        </h1>
        
        <p className="text-xl text-foreground/80 max-w-3xl mb-8 leading-relaxed">
          [WORKSHOP_DESCRIPTION_PARAGRAPH: e.g. The 14th Workshop on Harsh-Environment Mass Spectrometry gathered leading scientists and engineers to discuss the latest advancements in ruggedized instrumentation and field-deployable analytical systems.]
        </p>

          <div className="flex flex-col sm:flex-row gap-6 text-foreground/70 font-medium border-b border-foreground/10 pb-8 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="text-secondary" size={20} />
              <span>[WORKSHOP_DATES: e.g. September 26-29, 2022]</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-secondary mt-1 flex-shrink-0" size={20} />
              <span>
                [WORKSHOP_VENUE_NAME: e.g. Courtyard Cocoa Beach Cape Canaveral]<br/>
                <span className="text-sm font-normal text-foreground/50">[WORKSHOP_VENUE_ADDRESS: e.g. 3435 N. Atlantic Ave, Cocoa Beach, FL 32931]</span>
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Workshop Resources</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="[LINK_URL_ABSTRACTS_AND_PRESENTATIONS: Provide absolute URL or relative path to PDF/HTML]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md hover:border-secondary hover:text-secondary transition-colors text-sm font-bold"
              >
                <Download size={16} /> Abstracts & Presentations
              </a>
              <a 
                href="[LINK_URL_PARTICIPANT_LIST: Provide absolute URL to PDF]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md hover:border-primary hover:text-primary transition-colors text-sm font-bold"
              >
                <Users size={16} /> Participant List (PDF)
              </a>
              <a 
                href="[LINK_URL_CORPORATE_SPONSORS: Provide absolute URL to sponsors HTML/PDF]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md hover:border-primary hover:text-primary transition-colors text-sm font-bold"
              >
                <Building size={16} /> Corporate Sponsors
              </a>
            </div>
          </div>

          {/* Legacy Corporate Sponsors Grid */}
          <div className="mt-8 border-t border-foreground/10 pt-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-6">Legacy Corporate Sponsors</h3>
            <div className="flex flex-wrap gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
              {/* [REPEAT FOR EACH SPONSOR LOGO] */}
              <Image 
                src="[IMAGE_SRC_RELATIVE_TO_PUBLIC: e.g. /images/sponsors/inficon.png]" 
                alt="[SPONSOR_NAME: e.g. INFICON]" 
                width={140} 
                height={40} 
                className="grayscale hover:grayscale-0 transition-all duration-300 object-contain h-10 w-auto" 
              />
              {/* [END REPEAT] */}
            </div>
          </div>
        </div>

        {/* Technical Program Inline */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <FileText className="text-primary" /> Technical Program
          </h2>
          
          <div className="bg-background border border-foreground/10 rounded-lg overflow-hidden">
            {/* [REPEAT THIS BLOCK FOR EACH DAY] */}
            <div className="border-b border-foreground/10 last:border-0">
              <div className="bg-surface px-6 py-4 border-b border-foreground/10">
                <h3 className="font-bold text-lg">[DAY_HEADER_TITLE: e.g. Monday, September 26, 2022: Travel Day]</h3>
              </div>
              <div className="divide-y divide-foreground/5">
                
                {/* [CHOOSE APPROPRIATE EVENT TYPE BLOCK BELOW AND REPEAT AS NEEDED] */}
                
                {/* TYPE 1: STANDARD/MISC EVENT (e.g., Breaks, Registration, Setup, Evening Free) */}
                <div className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">[TIME: e.g. 6:00 p.m.]</div>
                  <div>
                    <h4 className="font-bold">[EVENT_TITLE: e.g. Welcome Reception]</h4>
                    <p className="text-sm text-foreground/70 mt-1">[EVENT_SUBTITLE_OR_LOCATION: e.g. Location: Sandbar Sports Grill, Cocoa Beach]</p>
                  </div>
                </div>

                {/* TYPE 2: PLENARY LECTURE / KEYNOTE EVENT (Uses bg-secondary/5 and border-secondary) */}
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-secondary/5 border-l-4 border-secondary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">[TIME: e.g. 9:00 a.m.]</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-secondary text-lg">[SESSION_TITLE: e.g. Plenary Lecture] <span className="text-sm font-normal text-foreground/60">([SESSION_LOCATION: e.g. Mercury Room])</span></h4>
                    <div className="mt-3">
                      {/* [REPEAT FOR EACH TALK IN THE SESSION] */}
                      <div className="py-2 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold">
                          {/* [OPTIONAL TIME IF MULTIPLE TALKS PER SESSION] */}
                          <span className="text-foreground/50 font-mono font-normal mr-2">[OPTIONAL_TALK_TIME: e.g. 9:00 a.m.]</span>
                          {/* [OPTIONAL LINK TO PRESENTATION] */}
                          <a href="[LINK_TO_PRESENTATION_PDF]" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">[TALK_TITLE: e.g. Giving Humanity a Platform in Space]</a>
                        </p>
                        <p className="text-sm text-foreground/70 mt-1">[AUTHORS: Underline presenter, e.g. <span className="underline">Nate Wood</span>]</p>
                        <p className="text-xs mt-1">
                          <a href="[LINK_TO_ABSTRACT_PDF]" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a>
                        </p>
                      </div>
                      {/* [END REPEAT] */}
                    </div>
                  </div>
                </div>

                {/* TYPE 3: TECHNICAL SESSION (Uses bg-primary/5 and border-primary) */}
                <div className="px-4 py-4 flex flex-col md:flex-row gap-4 bg-primary/5 border-l-4 border-primary transition-colors">
                  <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">[TIME: e.g. 10:30 a.m.]</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">[SESSION_TITLE: e.g. Technical Session I] <span className="text-sm font-normal text-foreground/60">([SESSION_LOCATION: e.g. Mercury Room])</span></h4>
                    <div className="mt-3 divide-y divide-primary/10">
                      {/* [REPEAT FOR EACH TALK IN THE SESSION] */}
                      <div className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-bold">
                          <span className="text-foreground/50 font-mono font-normal mr-2">[TALK_TIME: e.g. 10:30 a.m.]</span>
                          <a href="[LINK_TO_PRESENTATION_PDF]" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">[TALK_TITLE: e.g. Breath Markers of Disease]</a>
                        </p>
                        <p className="text-sm text-foreground/70 mt-1">[AUTHORS: Underline presenter, e.g. <span className="underline">Guido Verbeck</span>]</p>
                        <p className="text-xs mt-1">
                          <a href="[LINK_TO_ABSTRACT_PDF]" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a>
                        </p>
                      </div>
                      {/* [END REPEAT] */}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* [END DAY REPEAT] */}
          </div>
        </div>
      </div>
    );
  }
