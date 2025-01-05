"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// Simple Loader Component
const Loader = () => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-600 w-8 h-8"></div>
  </div>
);

const menuItems = [
  { name: "Search Flight", href: "/pages/search-flight" },
  { name: "Passenger Details", href: "/pages/passenger-detail" },
  { name: "Select Seat", href: "/pages/select-seat" },
   { name: "Boarding Pass", href: "/pages/b" },
  { name: "Self Check-in", href: "/pages/self-checkin" },
  { name: "Conclusion", href: "/pages/conclusion" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter(); // For navigation
  const pathname = usePathname(); // Current path

  // Navigate to "Search Flight" on initial load if no path is set
  useEffect(() => {
    if (!pathname || pathname === "/") {
      router.push(menuItems[0].href); // Redirect to "Search Flight"
    }
  }, [pathname, router]);

  // Simulate loading for demonstration purposes (replace this with real async logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (simulate loading)
    }, 2000); // 2-second delay for example

    return () => clearTimeout(timer);
  }, []);

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
        aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
      </Button>

      {/* Sidebar Content */}
      <div className="p-4 bg-white h-full m-3 mr-7 pt-10 rounded-xl">
        <ScrollArea className="h-[calc(100%-4rem)] px-4">
          {loading ? (
            <Loader /> // Show loader while loading
          ) : (
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
                          ? "bg-gradient-to-r from-[#f374b8] to-[#f28259] text-white"
                          : "text-gray-700 hover:bg-gradient-to-r from-[#f374b8] to-[#f28259] hover:text-white transition duration-500"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default AppSidebar;
