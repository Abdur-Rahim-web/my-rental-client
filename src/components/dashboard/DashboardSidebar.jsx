
import { CirclePlus, Calendar, Factory, Briefcase, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard } from "@gravity-ui/icons";
import { Building, Users } from "lucide-react";
import Link from "next/link";
import { MobileSidebar } from "./MobileSidebar"; 
import { useSession } from "@/lib/auth-client";

export  function DashboardSidebar() {
  const { data: session } = useSession();
  const user = session?.user;

  const ownerNavLinks = [
    { icon: House, href: "/dashboard/owner", label: "Overview" },
    { icon: CirclePlus, href: "/dashboard/owner/add-property", label: "Add Property" },
    { icon: Factory, href: "/dashboard/owner/my-properties", label: "My Properties" },
    { icon: Calendar, href: "/dashboard/owner/booking-requests", label: "Booking Requests" },
    { icon: Person, href: "/dashboard/owner/profile", label: "Profile" },
];

  const tenantNavLinks = [
    { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
    { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
    { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
    { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Users, href: "/dashboard/admin/users", label: "Users" },
    { icon: Building, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navLinksMap = {
    tenant: tenantNavLinks,
    owner: ownerNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "tenant"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      {/* Mobile Sidebar */}
      <div className="p-4 lg:hidden">
        <MobileSidebar navContent={navContent} />
      </div>
    </>
  );
}