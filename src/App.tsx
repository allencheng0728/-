import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { VehicleManagement } from './components/VehicleManagement';
import { DriverManagement } from './components/DriverManagement';
import { Scheduling } from './components/Scheduling';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('vehicles');
  const [openTabs, setOpenTabs] = useState<Tab[]>([
    { id: 'dashboard', label: '工作台' },
    { id: 'vehicles', label: '車輛數據' },
  ]);

  const handleModuleClick = (id: string) => {
    setActiveModule(id);
    const moduleLabels: Record<string, string> = {
      dashboard: '工作台',
      'vehicle-mgmt': '車輛管理',
      'vehicle-basic': '車輛管理 - 基本資料',
      'vehicle-rent': '車輛管理 - 租車規則',
      'driver-mgmt': '司機管理',
      'driver-basic': '司機管理 - 基本資料',
      'driver-renewal': '司機管理 - 自動續約規則',
      scheduling: '編更',
      video: '視頻中心',
      finance: '租車與財務管理',
      'finance-settings': '租車與財務管理 - 設置',
      'finance-driver-renewal': '自動編更規則',
      'finance-vehicle-rent': '車輛租金規則',
      insurance: '保險管理',
      reports: '報表中心',
      settings: '我的管理設置',
    };
    
    if (!openTabs.find(t => t.id === id)) {
      setOpenTabs([...openTabs, { id, label: moduleLabels[id] || id }]);
    }
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t.id !== id);
    setOpenTabs(newTabs);
    if (activeModule === id && newTabs.length > 0) {
      setActiveModule(newTabs[newTabs.length - 1].id);
    }
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'vehicle-mgmt':
      case 'vehicle-basic':
      case 'vehicle-rent':
      case 'finance-vehicle-rent':
        return (
          <VehicleManagement 
            initialView={activeModule === 'vehicle-rent' || activeModule === 'finance-vehicle-rent' ? 'rent' : 'basic'} 
            readOnly={activeModule === 'vehicle-rent'}
          />
        );
      case 'driver-mgmt':
      case 'driver-basic':
      case 'driver-renewal':
      case 'finance-driver-renewal':
        return (
          <DriverManagement 
            initialView={activeModule === 'driver-renewal' || activeModule === 'finance-driver-renewal' ? 'renewal' : 'basic'} 
            readOnly={activeModule === 'driver-renewal'}
          />
        );
      case 'scheduling':
        return <Scheduling />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h3 className="text-lg font-bold text-slate-800">模塊開發中</h3>
            <p className="text-slate-500">此功能模塊正在建設中，敬請期待。</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <Navbar activeModule={activeModule} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          collapsed={collapsed} 
          activeModule={activeModule} 
          setActiveModule={handleModuleClick} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Tabs */}
          <div className="h-10 bg-white border-b border-slate-200 flex items-center px-2 space-x-1 overflow-x-auto scrollbar-hide">
            {openTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id)}
                className={`h-8 px-4 flex items-center gap-2 rounded-t-lg text-xs font-medium transition-all relative group ${
                  activeModule === tab.id 
                    ? 'bg-primary-blue text-white' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {tab.label}
                <X 
                  size={12} 
                  className={`hover:bg-black/20 rounded-full p-0.5 transition-colors ${activeModule === tab.id ? 'text-white' : 'text-slate-400'}`}
                  onClick={(e) => closeTab(e, tab.id)}
                />
              </button>
            ))}
          </div>

          <main className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

