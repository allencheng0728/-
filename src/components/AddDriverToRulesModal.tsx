import React, { useState } from 'react';
import { X, Search, UserPlus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Driver } from '../types';

interface AddDriverToRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (driverNames: string[]) => void;
  availableDrivers: Driver[];
  existingDriverNames: string[];
}

export const AddDriverToRulesModal: React.FC<AddDriverToRulesModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  availableDrivers,
  existingDriverNames
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const filteredDrivers = availableDrivers.filter(d => 
    !existingDriverNames.includes(d.nameCn) &&
    (d.nameCn.includes(searchTerm) || d.driverId.includes(searchTerm))
  );

  const toggleSelect = (name: string) => {
    setSelectedNames(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleConfirm = () => {
    if (selectedNames.length > 0) {
      onAdd(selectedNames);
      setSelectedNames([]);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <UserPlus size={18} />
                </div>
                <h3 className="font-bold text-slate-800">新增司機至自動編更</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text"
                  placeholder="搜尋司機姓名或證號..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              <div className="max-h-[300px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {filteredDrivers.length > 0 ? (
                  filteredDrivers.map(driver => (
                    <button
                      key={driver.driverId}
                      onClick={() => toggleSelect(driver.nameCn)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                        selectedNames.includes(driver.nameCn)
                          ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200'
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">{driver.nameCn}</div>
                        <div className="text-[10px] text-slate-500">{driver.driverId} · {driver.phone}</div>
                      </div>
                      {selectedNames.includes(driver.nameCn) && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    沒有可添加的司機
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleConfirm}
                disabled={selectedNames.length === 0}
                className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedNames.length > 0
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                確認添加 ({selectedNames.length})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
