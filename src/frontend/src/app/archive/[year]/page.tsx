import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, FileText, Download, Building, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import path from "path";
import { promises as fs } from "fs";

export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), 'src', 'data', 'archives');
  let files = [];
  try {
    files = await fs.readdir(dataDir);
  } catch(e) {
    return [];
  }
  const years = files
    .filter((f: string) => f.endsWith('.json') && f !== 'template.json')
    .map((f: string) => f.replace('.json', ''));
    
  return years.map(year => ({ year }));
}

export default async function WorkshopArchive({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  
  const dataPath = path.join(process.cwd(), 'src', 'data', 'archives', `${year}.json`);
  let data;
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8');
    data = JSON.parse(fileContents);
  } catch (e) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <Link href="/archive" className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors mb-8 w-fit">
        <ArrowLeft size={16} /> Back to Archives
      </Link>

      <div className="bg-surface border border-foreground/10 rounded-lg p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 font-mono">
          {data.ordinal} Annual Workshop
        </span>
        
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
          {data.year} HEMS Workshop
        </h1>
        
        <p className="text-xl text-foreground/80 max-w-3xl mb-8 leading-relaxed">
          The {data.ordinal} Workshop on Harsh-Environment Mass Spectrometry.
        </p>

          <div className="flex flex-col sm:flex-row gap-6 text-foreground/70 font-medium border-b border-foreground/10 pb-8 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="text-secondary" size={20} />
              <span>{data.dates}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-secondary mt-1 flex-shrink-0" size={20} />
              <span>
                {data.venue}<br/>
                <span className="text-sm font-normal text-foreground/50">{data.address}</span>
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Workshop Resources</h3>
            <div className="flex flex-wrap gap-4">
              {data.resources?.map((res: any, idx: number) => (
                <a 
                  key={idx}
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 bg-surface border border-foreground/10 px-4 py-2 rounded-md transition-colors text-sm font-bold ${
                    idx === 0 ? 'hover:border-secondary hover:text-secondary' : 'hover:border-primary hover:text-primary'
                  }`}
                >
                  {res.icon === 'Download' && <Download size={16} />}
                  {res.icon === 'Users' && <Users size={16} />}
                  {res.icon === 'Building' && <Building size={16} />}
                  {!['Download', 'Users', 'Building'].includes(res.icon) && <Download size={16} />}
                  {res.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legacy Corporate Sponsors Grid */}
          {data.sponsors && data.sponsors.length > 0 && (
            <div className="mt-8 border-t border-foreground/10 pt-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-6">Legacy Corporate Sponsors</h3>
              <div className="flex flex-wrap gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                {data.sponsors.map((sponsor: any, idx: number) => (
                  <Image 
                    key={idx}
                    src={sponsor.image} 
                    alt={sponsor.name} 
                    width={140} 
                    height={40} 
                    className="grayscale hover:grayscale-0 transition-all duration-300 object-contain h-10 w-auto" 
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technical Program Inline */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <FileText className="text-primary" /> Technical Program
          </h2>
          
          <div className="bg-background border border-foreground/10 rounded-lg overflow-hidden">
            
            {data.schedule?.map((day: any, dIdx: number) => (
              <div key={dIdx} className="border-b border-foreground/10 last:border-0">
                <div className="bg-surface px-6 py-4 border-b border-foreground/10">
                  <h3 className="font-bold text-lg">{day.title}</h3>
                </div>
                <div className="divide-y divide-foreground/5">
                  
                  {day.items?.map((item: any, iIdx: number) => {
                    if (item.type === 'event') {
                      return (
                        <div key={iIdx} className="px-4 py-3 flex flex-col md:flex-row gap-4 hover:bg-surface/30 transition-colors border-l-4 border-transparent">
                          <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">{item.time}</div>
                          <div>
                            <h4 className="font-bold">{item.title}</h4>
                            <p className="text-sm text-foreground/70 mt-1">{item.subtitle}</p>
                          </div>
                        </div>
                      );
                    } else if (item.type === 'session') {
                      const isPlenary = item.title?.toLowerCase().includes('plenary');
                      const bgClass = isPlenary ? 'bg-secondary/5' : 'bg-primary/5';
                      const borderClass = isPlenary ? 'border-secondary' : 'border-primary';
                      const textClass = isPlenary ? 'text-secondary' : 'text-primary';

                      return (
                        <div key={iIdx} className={`px-4 py-4 flex flex-col md:flex-row gap-4 ${bgClass} border-l-4 ${borderClass} transition-colors`}>
                          <div className="md:w-32 font-mono text-sm font-bold text-foreground flex-shrink-0">{item.time}</div>
                          <div className="flex-1">
                            <h4 className={`font-bold ${textClass} text-lg`}>{item.title}</h4>
                            <div className="mt-3 divide-y divide-primary/10">
                              
                              {item.talks?.map((talk: any, tIdx: number) => {
                                const authorParts = talk.authors ? talk.authors.split(',') : [];
                                const firstAuthor = authorParts.length > 0 ? authorParts[0] : '';
                                const restAuthors = authorParts.length > 1 ? ',' + authorParts.slice(1).join(',') : '';

                                return (
                                  <div key={tIdx} className="py-3 first:pt-0 last:pb-0">
                                    <p className="text-sm font-bold">
                                      <span className="text-foreground/50 font-mono font-normal mr-2">{talk.time}</span>
                                      {talk.presentationUrl ? (
                                        <a href={talk.presentationUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{talk.title}</a>
                                      ) : (
                                        <span className="text-primary">{talk.title}</span>
                                      )}
                                    </p>
                                    <p className="text-sm text-foreground/70 mt-1">
                                      {firstAuthor && <span className="underline">{firstAuthor}</span>}
                                      {restAuthors}
                                    </p>
                                    {talk.abstractUrl && (
                                      <p className="text-xs mt-1">
                                        <a href={talk.abstractUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Abstract</a>
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                              
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                  
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
  );
}
