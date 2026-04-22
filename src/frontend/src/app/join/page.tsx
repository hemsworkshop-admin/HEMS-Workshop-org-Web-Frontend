import { Rocket, GraduationCap, Building2, CheckCircle2 } from "lucide-react";

export default function Join() {
  return (
    <div className="flex flex-col flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-foreground">
          Join the <span className="text-primary border-b-4 border-primary">Society</span>
        </h1>
        <p className="text-xl text-foreground/70">
          Become a member of the HEMS Society to access the premier network of scientists and engineers building analytical instrumentation for the extreme.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Tier 1 */}
        <div className="bg-surface border border-foreground/10 rounded-lg p-8 relative hover:border-primary/50 transition-colors flex flex-col">
          <div className="mb-6">
            <GraduationCap className="text-foreground/50 w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Student</h2>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-mono font-bold">$25</span>
              <span className="text-foreground/50 mb-1">/year</span>
            </div>
            <p className="text-sm text-foreground/70">For currently enrolled undergraduate and graduate students.</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Full archive access</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Workshop registration discount</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Student poster session eligibility</span>
            </li>
          </ul>
          
          <button className="w-full bg-background border border-foreground/20 text-foreground py-3 rounded font-bold uppercase hover:bg-foreground/5 transition-colors">
            Select Plan
          </button>
        </div>

        {/* Tier 2 */}
        <div className="bg-surface border-2 border-primary rounded-lg p-8 relative flex flex-col transform md:-translate-y-4 shadow-xl shadow-primary/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-background px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
            Most Common
          </div>
          <div className="mb-6">
            <Rocket className="text-primary w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Professional</h2>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-mono font-bold text-primary">$100</span>
              <span className="text-foreground/50 mb-1">/year</span>
            </div>
            <p className="text-sm text-foreground/70">For academic researchers, engineers, and government officials.</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Full archive access</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Workshop registration discount</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Voting rights in Society elections</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Abstract submission eligibility</span>
            </li>
          </ul>
          
          <button className="w-full bg-primary text-background py-3 rounded font-bold uppercase hover:bg-primary/90 transition-colors">
            Select Plan
          </button>
        </div>

        {/* Tier 3 */}
        <div className="bg-surface border border-foreground/10 rounded-lg p-8 relative hover:border-secondary/50 transition-colors flex flex-col">
          <div className="mb-6">
            <Building2 className="text-secondary w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Corporate</h2>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-mono font-bold">$500</span>
              <span className="text-foreground/50 mb-1">/year</span>
            </div>
            <p className="text-sm text-foreground/70">For organizations supporting the HEMS mission.</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
              <span>Includes 3 Professional Memberships</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
              <span>Logo on website sponsors page</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
              <span>Priority exhibition booth selection</span>
            </li>
          </ul>
          
          <button className="w-full bg-background border border-foreground/20 text-foreground py-3 rounded font-bold uppercase hover:bg-foreground/5 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
