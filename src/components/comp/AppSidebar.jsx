"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const menuItems = [
  { name: "Search Flight", href: "/pages/search-flight" },
  { name: "Passenger Details", href: "/pages/passenger-detail" },
  { name: "Select Seat", href: "/pages/select-seat" },
  { name: "Boarding Pass", href: "/pages/boarding-pass" },
  { name: "Self Check-in", href: "/pages/self-checkin" },
  { name: "Conclusion", href: "/pages/conclusion" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter(); // For navigation
  const pathname = usePathname(); // Current path

  // Navigate to "Search Flight" on initial load if no path is set
  useEffect(() => {
    if (pathname === "/") {
      router.push(menuItems[0].href); // Redirect to "Search Flight"
    }
  }, [pathname, router]);

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-96"
      } min-h-screen bg-gray-300/50 shadow-md transition-all duration-300 relative`}
    >
      {/* Trigger Button */}
      <Button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute right-2 top-16 bg-white hover:bg-white w-8 h-8 border border-gray-300 text-gray-700 rounded-full focus:outline-none"
      >
        {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
      </Button>

      {/* Sidebar Content */}
      <div className="p-4 bg-white h-full m-3 mr-7 pt-10 rounded-xl">
        <ScrollArea className="h-[calc(100%-4rem)] px-4">
          <nav>
            <ul className={`space-y-2 ${collapsed ? "text-center" : ""}`}>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`block ${
                      collapsed ? "py-2 text-sm" : "px-6 py-2 text-base"
                    } text-lg rounded-lg ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-[#f374b8] to-[#f28259] text-white "
                        : "text-gray-700 hover:bg-gradient-to-r from-[#f374b8] to-[#f28259] hover:text-white transition duration-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AppSidebar;
