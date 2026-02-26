import React from 'react';
import { Bell, Grid, Calendar, ChevronDown, Menu } from 'lucide-react';

interface NavbarProps {
  activeModule: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeModule }) => {
  return (
    <header className="h-14 bg-primary-blue text-white flex items-center justify-between px-4 sticky top-0 z-30 shadow-md">
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-primary-blue font-bold text-xl">e</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight">租的e 的士車隊管理ERP系統</h1>
          <button className="ml-2 p-1 hover:bg-blue-500 rounded transition-colors">
            <Menu size={20} />
          </button>
        </div>

        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <button className="hover:text-blue-100 transition-colors">實時定位</button>
          <button className="hover:text-blue-100 transition-colors">歷史軌跡</button>
          <button className="hover:text-blue-100 transition-colors">事故與保險</button>
          <button className="text-blue-100 border-b-2 border-white pb-0.5">車輛數據</button>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-1.5 hover:bg-blue-500 rounded-md transition-colors">
          <Calendar size={20} />
        </button>
        <button className="p-1.5 hover:bg-blue-500 rounded-md transition-colors">
          <Grid size={20} />
        </button>
        <button className="p-1.5 hover:bg-blue-500 rounded-md transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-primary-blue" />
        </button>
        
        <div className="flex items-center space-x-2 pl-4 border-l border-blue-400 cursor-pointer hover:bg-blue-500 p-1 rounded transition-colors">
          <span className="text-sm font-medium">allencheng</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
};

