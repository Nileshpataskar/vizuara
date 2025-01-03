import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/comp/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vizuara",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <main className="w-full h-screen flex ">
            <AppSidebar />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
