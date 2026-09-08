import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { currentUser } from "@/data/mock";
import {
  LayoutDashboard,
  Compass,
  Users,
  FolderOpen,
  UserPlus,
  Star,
  UserCircle,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

const navItems = [
  { title: "Home", url: "/app", icon: LayoutDashboard, exact: true },
  { title: "Discover", url: "/app/discover", icon: Compass },
  { title: "Builders", url: "/app/builders", icon: Users },
  { title: "Projects", url: "/app/projects", icon: FolderOpen },
  { title: "Teams", url: "/app/teams", icon: UserPlus },
  { title: "Showcase", url: "/app/showcase", icon: Star },
];

const bottomItems = [
  { title: "Profile", url: "/app/profile", icon: UserCircle },
];

function NavItem({
  item,
  location,
  onClick,
}: {
  item: (typeof navItems)[0];
  location: string;
  onClick?: () => void;
}) {
  const isActive = item.exact
    ? location === item.url
    : location === item.url || location.startsWith(item.url + "/");

  return (
    <Link
      href={item.url}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
        isActive
          ? "bg-[#141414] text-[#F5F5F5] border border-[#2A2A2A]"
          : "text-[#878787] hover:text-[#F5F5F5] hover:bg-[#141414]/70"
      }`}
    >
      <item.icon
        className={`h-4 w-4 shrink-0 transition-colors ${
          isActive ? "text-[#89AACC]" : "text-[#555] group-hover:text-[#878787]"
        }`}
      />
      <span>{item.title}</span>
      {isActive && (
        <ChevronRight className="h-3 w-3 ml-auto text-[#555]" />
      )}
    </Link>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-4 pt-5 pb-4 border-b border-[#1F1F1F] shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              background: "linear-gradient(135deg, #89AACC, #4E85BF)",
              color: "#0A0A0A",
            }}
          >
            I
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] font-bold text-[#F5F5F5] block leading-none">
              INIT
            </span>
            <span className="font-mono text-[9px] tracking-[0.1em] text-[#555] block leading-none mt-0.5">
              PLATFORM
            </span>
          </div>
        </Link>
      </div>

      {/* Primary Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-[9px] font-mono tracking-[0.18em] text-[#444] px-3 mb-3">
          NAVIGATE
        </p>
        {navItems.map((item) => (
          <NavItem
            key={item.url}
            item={item}
            location={location}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-[#1F1F1F] pt-3 space-y-0.5 shrink-0">
        {bottomItems.map((item) => (
          <NavItem
            key={item.url}
            item={item}
            location={location}
            onClick={() => setMobileOpen(false)}
          />
        ))}
        {/* User card */}
        <div className="mt-3 px-3 py-3 rounded-xl bg-[#141414] border border-[#1F1F1F] flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full border border-[#2A2A2A] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#F5F5F5] truncate leading-none mb-0.5">
              {currentUser.name}
            </p>
            <p className="text-[9px] font-mono text-[#555] truncate leading-none">
              {currentUser.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-[#1F1F1F] bg-[#0D0D0D] sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0D0D0D] border-r border-[#1F1F1F] transform transition-transform duration-200 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center h-14 px-4 md:px-6 border-b border-[#1F1F1F] bg-[#0A0A0A]/90 backdrop-blur-md shrink-0">
          <button
            className="md:hidden mr-3 text-[#878787] hover:text-[#F5F5F5] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#555]">
            <span>INIT</span>
            {location !== "/app" && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="text-[#878787]">
                  {location.replace("/app/", "").toUpperCase()}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-medium text-[#F5F5F5] leading-none">
                {currentUser.name}
              </p>
              <p className="text-[9px] font-mono text-[#555] mt-0.5 leading-none">
                {currentUser.campus}
              </p>
            </div>
            <Link href="/app/profile">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border border-[#2A2A2A] hover:border-[#89AACC] transition-colors cursor-pointer"
              />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
