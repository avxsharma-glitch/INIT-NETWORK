import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { mockIdentity } from "@/data/mock";
import { LayoutDashboard, Users, FolderOpen, Calendar, Map, Briefcase, UserCircle, Settings, LogOut } from "lucide-react";

const navItems = [
  { title: "Overview", url: "/app", icon: LayoutDashboard },
  { title: "Network", url: "/app/network", icon: Users },
  { title: "Builds", url: "/app/builds", icon: FolderOpen },
  { title: "Events", url: "/app/events", icon: Calendar },
  { title: "Chapters", url: "/app/chapters", icon: Map },
  { title: "Opportunities", url: "/app/opportunities", icon: Briefcase },
];

const secondaryItems = [
  { title: "Profile", url: "/app/profile", icon: UserCircle },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] font-sans">
        <Sidebar className="border-r border-[#1F1F1F] bg-[#0A0A0A]">
          <SidebarHeader className="p-4 border-b border-[#1F1F1F]">
            <Link href="/" className="flex items-center gap-2 px-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#89AACC] to-[#4E85BF] flex items-center justify-center text-[#0A0A0A] font-bold text-xs">
                I
              </div>
              <span className="font-mono text-xs tracking-widest font-bold">INIT</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[#878787] text-xs font-mono tracking-wider">PLATFORM</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const isActive = location === item.url || (item.url !== '/app' && location.startsWith(item.url));
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive} className={isActive ? "bg-[#141414] text-[#F5F5F5]" : "text-[#878787] hover:bg-[#141414] hover:text-[#F5F5F5]"}>
                          <Link href={item.url} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span className="font-medium text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="mt-auto">
              <SidebarGroupLabel className="text-[#878787] text-xs font-mono tracking-wider">ACCOUNT</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {secondaryItems.map((item) => {
                    const isActive = location.startsWith(item.url);
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive} className={isActive ? "bg-[#141414] text-[#F5F5F5]" : "text-[#878787] hover:bg-[#141414] hover:text-[#F5F5F5]"}>
                          <Link href={item.url} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span className="font-medium text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-[#878787] hover:bg-[#141414] hover:text-[#F5F5F5] w-full flex items-center gap-3">
                      <LogOut className="h-4 w-4" />
                      <span className="font-medium text-sm">Sign Out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <header className="flex items-center h-16 px-4 border-b border-[#1F1F1F] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
            <SidebarTrigger className="md:hidden mr-4 text-[#F5F5F5] hover:bg-[#141414]" />
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-medium">{mockIdentity.name}</span>
                <span className="text-xs text-[#878787] font-mono">{mockIdentity.role}</span>
              </div>
              <img src={mockIdentity.avatar} alt={mockIdentity.name} className="w-8 h-8 rounded-full border border-[#1F1F1F]" />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
