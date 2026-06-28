
import { CirclePlus, Calendar, Factory, Gear, House, Person, Persons, Bookmark, CreditCard } from "@gravity-ui/icons";
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
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm hover:bg-gray-100 transition-all"
          href={item.href}
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-default bg-white p-4 h-screen sticky top-0">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-100">
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden w-full bg-white border-b border-default p-3 flex items-center justify-between sticky top-0 z-40">
        <MobileSidebar navContent={navItems} />
        <span className="font-bold">Dashboard</span>
      </div>
    </>
  );
}