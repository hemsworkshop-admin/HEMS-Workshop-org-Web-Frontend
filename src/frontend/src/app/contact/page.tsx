import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-foreground">
          Contact <span className="text-primary border-b-4 border-primary">HEMS</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl">
          Get in touch with the society organizers regarding workshop details, sponsorships, or general inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-surface border border-foreground/10 p-8 shadow-lg">
          <h2 className="text-2xl font-bold uppercase mb-6">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 uppercase">First Name</label>
                <input type="text" className="w-full bg-background border border-foreground/20 rounded p-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 uppercase">Last Name</label>
                <input type="text" className="w-full bg-background border border-foreground/20 rounded p-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/80 uppercase">Email Address</label>
              <input type="email" className="w-full bg-background border border-foreground/20 rounded p-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/80 uppercase">Subject</label>
              <select className="w-full bg-background border border-foreground/20 rounded p-3 focus:outline-none focus:border-primary transition-colors text-foreground">
                <option>General Inquiry</option>
                <option>15th Workshop Registration</option>
                <option>Sponsorship Opportunities</option>
                <option>Abstract Submission Help</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/80 uppercase">Message</label>
              <textarea rows={5} className="w-full bg-background border border-foreground/20 rounded p-3 focus:outline-none focus:border-primary transition-colors text-foreground"></textarea>
            </div>
            
            <button type="button" className="w-full bg-primary text-background font-bold uppercase py-4 rounded hover:bg-primary/90 transition-colors">
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Info & Map */}
        <div className="space-y-8">
          <div className="bg-surface border border-foreground/10 p-8 shadow-lg">
            <h2 className="text-2xl font-bold uppercase mb-6">Direct Channels</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Email</h3>
                  <p className="text-foreground/70 mb-1">For immediate assistance</p>
                  <a href="mailto:info@hems-workshop.org" className="text-primary font-mono hover:underline">info@hems-workshop.org</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">15th Workshop Location</h3>
                  <p className="text-foreground/70 mb-1">September 15-18, 2025</p>
                  <p className="font-mono text-foreground">Virginia Beach, VA, USA</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="aspect-video bg-background border border-foreground/10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-surface/50"></div>
            <div className="text-center z-10 p-4">
              <MapPin size={48} className="text-foreground/30 mx-auto mb-2 group-hover:text-primary transition-colors" />
              <p className="font-mono text-sm font-bold text-foreground/50 uppercase tracking-widest">[Interactive Map Integration pending]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
