import React from 'react';
import { LayoutDashboard, Car, Video, Calendar, DollarSign, Shield, Settings, ChevronDown, FileText, BarChart2, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  collapsed: boolean;
  activeModule: string;
  setActiveModule: (val: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, activeModule, setActiveModule }) => {
  const menuItems = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
    { id: 'video', label: '視頻管理', icon: Video },
    { id: 'scheduling', label: '智能編更', icon: Calendar },
    { id: 'finance', label: '租車與財務管理', icon: DollarSign, subItems: [
      { id: 'finance-settings', label: '設置', subItems: [
        { id: 'finance-driver-renewal', label: '自動編更規則' },
        { id: 'finance-vehicle-rent', label: '車輛租金規則' },
      ]}
    ]},
    { id: 'rent', label: '彈性租金管理', icon: FileText },
    { id: 'insurance', label: '事故與保險', icon: Shield },
    { id: 'settings', label: '我的管理設置', icon: Settings, subItems: [
      { id: 'vehicle-mgmt', label: '車輛管理', subItems: [
        { id: 'vehicle-basic', label: '基本資料' },
        { id: 'vehicle-rent', label: '租車規則' },
      ]},
      { id: 'driver-mgmt', label: '司機管理', subItems: [
        { id: 'driver-basic', label: '基本資料' },
        { id: 'driver-renewal', label: '自動續約規則' },
      ]},
      { id: 'owners', label: '車主數據' },
      { id: 'contractors', label: '打理人數據' },
    ]},
    { id: 'reports', label: '報表中心', icon: BarChart2 },
  ];

  const isItemActive = (item: any): boolean => {
    if (activeModule === item.id) return true;
    if (item.subItems) {
      return item.subItems.some((sub: any) => isItemActive(sub));
    }
    return false;
  };

  const renderSubItems = (subItems: any[], level: number = 1) => {
    return (
      <div className={`mt-1 space-y-1 ${level === 1 ? 'ml-4 border-l border-white/10 pl-2' : 'ml-3 border-l border-white/5 pl-2'}`}>
        {subItems.map((sub) => {
          const active = isItemActive(sub);
          return (
            <div key={sub.id}>
              <button
                onClick={() => setActiveModule(sub.id)}
                className={`w-full text-left p-2 text-xs rounded transition-colors flex items-center justify-between ${
                  active ? 'bg-active-blue text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{sub.label}</span>
                {sub.subItems && <ChevronDown size={12} className={`transition-transform ${active ? '' : '-rotate-90'} opacity-50`} />}
              </button>
              {sub.subItems && active && renderSubItems(sub.subItems, level + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      animate={{ width: collapsed ? 60 : 240 }}
      className="h-screen bg-sidebar-dark text-white flex flex-col relative z-20 shadow-xl"
    >
      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const active = isItemActive(item);
            return (
              <div key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center p-2.5 rounded transition-all group ${
                    active
                      ? 'bg-active-blue text-white' 
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon size={18} className="min-w-[20px]" />
                  {!collapsed && (
                    <>
                      <span className="ml-3 text-sm font-medium flex-1 text-left">{item.label}</span>
                      {item.subItems && <ChevronDown size={14} className={`transition-transform ${active ? '' : '-rotate-90'} opacity-50`} />}
                    </>
                  )}
                </button>
                
                {!collapsed && item.subItems && active && renderSubItems(item.subItems)}
              </div>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};


