
import { CirclePlus, Calendar, Factory, Gear, House, Person, Persons, Bookmark, CreditCard } from "@gravity-ui/icons";
import { Building, Users } from "lucide-react";
import Link from "next/link";
import { MobileSidebar } from "./MobileSidebar";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
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
    { icon: House, href: "/dashboard/tenant", label: "Overview" },
    { icon: Calendar, href: "/dashboard/tenant/my-bookings", label: "My Bookings" },
    { icon: Bookmark, href: "/dashboard/tenant/favorites", label: "Favorites" },
    { icon: Person, href: "/dashboard/tenant/profile", label: "Profile" },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Overview" },
    { icon: Persons, href: "/dashboard/admin/all-users", label: "All Users" },
    { icon: Factory, href: "/dashboard/admin/all-properties", label: "All Properties" },
    { icon: Calendar, href: "/dashboard/admin/all-bookings", label: "All Bookings" },
    { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
    { icon: Person, href: "/dashboard/admin/profile", label: "Profile" },
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