import Sidebar from "./SideBar";
import SideBarMobile from "./SideBarMobile";
import Navbar from "./Navbar";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function MainLayout({ title, children }: Props) {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col md:flex-row">
      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64">
        <Navbar title={title} />
        <div className="p-4 mt-2 md:p-6 mt-1">{children}</div>
      </div>

      {/* SIDEBAR MOBILE */}
      <div className="md:hidden">
        <SideBarMobile />
      </div>
    </div>
  );
}
