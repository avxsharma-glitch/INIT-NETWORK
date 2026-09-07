import { mockIdentity, mockBuilds, mockBuilders, mockEvents, mockActivity, mockOpportunities } from "@/data/mock";
import { ArrowRight, Plus, ExternalLink, Activity, Users, Calendar, Folder } from "lucide-react";
import { Link } from "wouter";

export function DashboardOverview() {
  return (
    <div className="space-y-10 pb-10">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Welcome back, <span className="font-serif italic text-[#89AACC]">{mockIdentity.name.split(' ')[0]}</span>.
        </h1>
        <p className="text-[#878787] font-mono text-sm uppercase tracking-widest">
          {mockIdentity.membership} // {mockIdentity.campus}
        </p>
      </section>

      {/* Quick Stats / Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#1F1F1F] flex flex-col justify-between">
          <Folder className="h-5 w-5 text-[#89AACC] mb-4" />
          <div className="text-2xl font-semibold">{mockBuilds.length}</div>
          <div className="text-xs text-[#878787] font-mono mt-1">ACTIVE BUILDS</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#1F1F1F] flex flex-col justify-between">
          <Users className="h-5 w-5 text-[#89AACC] mb-4" />
          <div className="text-2xl font-semibold">12</div>
          <div className="text-xs text-[#878787] font-mono mt-1">CONNECTIONS</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#1F1F1F] flex flex-col justify-between">
          <Calendar className="h-5 w-5 text-[#89AACC] mb-4" />
          <div className="text-2xl font-semibold">{mockEvents.length}</div>
          <div className="text-xs text-[#878787] font-mono mt-1">UPCOMING EVENTS</div>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#141414] to-[#1A1A1A] border border-[#1F1F1F] flex flex-col justify-center items-center text-center cursor-pointer hover:border-[#89AACC] transition-colors group">
          <div className="w-10 h-10 rounded-full bg-[#1F1F1F] flex items-center justify-center mb-3 group-hover:bg-[#89AACC]/10 transition-colors">
            <Plus className="h-5 w-5 text-[#89AACC]" />
          </div>
          <div className="text-sm font-medium">Start a Build</div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Question 1: What am I building? */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#89AACC]"></span>
                What am I building?
              </h2>
              <Link href="/app/builds" className="text-xs font-mono text-[#878787] hover:text-[#F5F5F5] flex items-center gap-1 transition-colors">
                VIEW ALL <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockBuilds.map(build => (
                <div key={build.id} className="p-5 rounded-2xl bg-[#141414] border border-[#1F1F1F] hover:border-[#333] transition-colors flex flex-col h-full group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4 text-[#878787]" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono bg-[#1F1F1F] px-2 py-1 rounded text-[#89AACC] tracking-wider uppercase">
                      {build.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{build.title}</h3>
                  <p className="text-sm text-[#878787] mb-6 flex-1 line-clamp-2">{build.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#1F1F1F]/50">
                    <div className="flex -space-x-2">
                      {[...Array(build.contributors)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-[#1F1F1F] border border-[#141414]" />
                      ))}
                    </div>
                    <div className="flex gap-1.5">
                      {build.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-[#878787] font-mono border border-[#1F1F1F] rounded px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Question 2: Who am I building with? */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#89AACC]"></span>
                Who am I building with?
              </h2>
              <Link href="/app/network" className="text-xs font-mono text-[#878787] hover:text-[#F5F5F5] flex items-center gap-1 transition-colors">
                NETWORK <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockBuilders.map(builder => (
                <div key={builder.id} className="p-4 rounded-2xl bg-[#141414] border border-[#1F1F1F] flex flex-col items-center text-center group cursor-pointer hover:border-[#333] transition-colors">
                  <img src={builder.avatar} alt={builder.name} className="w-16 h-16 rounded-full mb-3 grayscale group-hover:grayscale-0 transition-all border border-[#1F1F1F]" />
                  <div className="font-medium text-sm mb-1">{builder.name}</div>
                  <div className="text-[10px] font-mono text-[#878787] mb-1">{builder.role}</div>
                  <div className="text-xs text-[#555]">{builder.campus}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
        
        {/* Right Column (Sidebar) */}
        <div className="space-y-10">
          
          {/* Question 3: What's happening next? */}
          <section className="space-y-5">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#89AACC]"></span>
              What's happening next?
            </h2>
            
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-1">
              <div className="px-4 py-3 border-b border-[#1F1F1F]">
                <h3 className="text-xs font-mono tracking-widest text-[#878787]">UPCOMING EVENTS</h3>
              </div>
              <div className="divide-y divide-[#1F1F1F]">
                {mockEvents.map(event => (
                  <div key={event.id} className="p-4 hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded border border-[#1F1F1F] bg-[#0A0A0A] flex flex-col items-center justify-center shrink-0 group-hover:border-[#89AACC]/50 transition-colors">
                        <span className="text-[10px] text-[#878787] font-mono">{event.date.split(' ')[0]}</span>
                        <span className="text-sm font-bold">{event.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1 group-hover:text-[#89AACC] transition-colors">{event.title}</div>
                        <div className="text-xs text-[#878787] font-mono">{event.type}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-1">
              <div className="px-4 py-3 border-b border-[#1F1F1F]">
                <h3 className="text-xs font-mono tracking-widest text-[#878787]">RECENT ACTIVITY</h3>
              </div>
              <div className="p-4 space-y-4">
                {mockActivity.map(activity => (
                  <div key={activity.id} className="flex gap-3 items-start">
                    <div className="mt-1"><Activity className="h-3.5 w-3.5 text-[#555]" /></div>
                    <div>
                      <p className="text-sm text-[#ccc] leading-snug">{activity.message}</p>
                      <span className="text-[10px] text-[#555] font-mono mt-1 block">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-1">
              <div className="px-4 py-3 border-b border-[#1F1F1F]">
                <h3 className="text-xs font-mono tracking-widest text-[#878787]">OPPORTUNITIES</h3>
              </div>
              <div className="divide-y divide-[#1F1F1F]">
                {mockOpportunities.map(opp => (
                  <div key={opp.id} className="p-4 hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
                    <div className="text-[10px] text-[#89AACC] font-mono mb-1">{opp.type}</div>
                    <div className="text-sm font-medium mb-1 group-hover:text-white transition-colors">{opp.title}</div>
                    <div className="text-xs text-[#878787]">{opp.organization}</div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  );
}
