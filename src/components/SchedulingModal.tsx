import React, { useState } from 'react';
import { X, Search, ChevronLeft, ChevronRight, User, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehiclePlate: string;
}

export const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose, vehiclePlate }) => {
  const [selectedShift, setSelectedShift] = useState<'morning' | 'evening' | 'special'>('morning');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">{vehiclePlate} 新增更數</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="col-span-7 space-y-6">
              {/* Search Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">切換搜尋司機/打理人/車主</label>
                <div className="flex gap-2">
                  <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>司機</option>
                  </select>
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="請輸入司機姓名" 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  *找不到司機/打理人資料? 請點擊 <span className="text-blue-600 cursor-pointer hover:underline">新增司機/新增管理公司/打理人</span>
                </p>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: '司機姓名(中文)', placeholder: '' },
                  { label: '司機姓名(英文)', placeholder: '' },
                  { label: '出生日期', placeholder: '' },
                  { label: '性別', placeholder: '' },
                  { label: '風險評分', placeholder: '' },
                  { label: '累積租用更數', placeholder: '' },
                  { label: '司機證到期日', placeholder: '' },
                  { label: '駕駛執照到期日', placeholder: '' },
                ].map((field, i) => (
                  <div key={i} className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">{field.label}</label>
                    <input 
                      type="text" 
                      placeholder={field.placeholder}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Deposit Info */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: '租金按金餘額通知', value: '$' },
                  { label: '車票按金餘額通知', value: '$' },
                  { label: '意外按金餘額通知', value: '$' },
                ].map((field, i) => (
                  <div key={i} className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">{field.label}</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none text-right"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">$</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rental Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">已選租用更數</h3>
                  <span className="text-blue-600 font-bold">0更</span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">更數類型</label>
                    <div className="py-1.5 bg-slate-50 border border-slate-200 rounded text-xs">-</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">數量</label>
                    <div className="py-1.5 bg-slate-50 border border-slate-200 rounded text-xs">-</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">每更租金</label>
                    <div className="py-1.5 bg-slate-50 border border-slate-200 rounded text-xs">-</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase text-right">租金小計</label>
                    <div className="py-1.5 text-xs font-bold text-right">$0</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-5 space-y-6">
              {/* Photo Placeholders */}
              <div className="grid grid-cols-1 gap-4">
                <div className="aspect-[4/3] bg-slate-50 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <User size={32} />
                  </div>
                  <p className="text-[10px] font-bold uppercase">暫無數據</p>
                  <p className="text-[10px]">的士司機證</p>
                </div>
                <div className="aspect-[4/3] bg-slate-50 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <FileText size={32} />
                  </div>
                  <p className="text-[10px] font-bold uppercase">暫無數據</p>
                  <p className="text-[10px]">駕駛執照</p>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={16} /></button>
                  <span className="text-sm font-bold text-slate-700">2026年2月</span>
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={16} /></button>
                </div>
                <div className="flex items-center justify-between mb-4 px-2">
                  <label className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    <input type="checkbox" className="rounded" /> 全選
                  </label>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-orange-400"><div className="w-2 h-2 rounded-full bg-orange-400" /> 早更</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-400" /> 晚更</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-400" /> 特更</span>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center mb-2">
                  {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                    <span key={d} className="text-[10px] font-bold text-slate-400">{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty slots for previous month */}
                  {Array.from({ length: 0 }).map((_, i) => <div key={i} />)}
                  {/* Current month days */}
                  {Array.from({ length: 28 }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === 24;
                    return (
                      <div 
                        key={day} 
                        className={`aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors relative
                          ${isToday ? 'bg-blue-600 text-white' : 'hover:bg-slate-50 text-slate-600'}
                        `}
                      >
                        <span className="text-[10px] font-bold">{day}</span>
                        <span className={`text-[8px] ${isToday ? 'text-white/70' : 'text-slate-400'}`}>$0</span>
                        {isToday && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-red-500 cursor-pointer">
                <input type="checkbox" className="rounded border-red-500 text-red-500 focus:ring-red-500" />
                已閱讀 (號碼確認開通和車輛更通知)
              </label>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">合共租金</p>
                <p className="text-2xl font-bold text-red-500">$0</p>
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div className="text-[10px] text-slate-400 space-y-0.5">
                <p className="font-bold text-slate-500">一日租金起步為 0，系統將自動：</p>
                <p>• 認定您採用線下租金協商</p>
                <p>• 將訂單狀態設為「已支付」</p>
                <p>• 立即開通司機對應更數的電子車鑰匙通過智能終端</p>
                <p className="text-red-400">請務必在確認已完成線下租金協商後，再使用此設定。</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-500 hover:bg-white transition-colors"
                >
                  取消
                </button>
                <button className="px-8 py-2 bg-primary-blue text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                  更新更表並創建訂單
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
