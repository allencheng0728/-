import React, { useState } from 'react';
import { Search, Plus, Download, ChevronLeft, ChevronRight, Zap, CloudSun, Sun, Moon, Star } from 'lucide-react';
import { SchedulingModal } from './SchedulingModal';

export const Scheduling: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const metrics = [
    { label: '今日車輛總數', value: 40, color: 'text-blue-600' },
    { label: '出租中', value: 0, percentage: '0.00%', color: 'text-emerald-600' },
    { label: '空間中', value: 40, color: 'text-orange-500' },
    { label: '全日空間', value: 40, color: 'text-orange-500' },
    { label: '早空間', value: 0, color: 'text-orange-500' },
    { label: '晚空間', value: 0, color: 'text-orange-500' },
    { label: '吉車', value: 0, color: 'text-red-500' },
  ];

  const dates = [
    { day: '23/02', weekday: 'Mon' },
    { day: '24/02', weekday: 'Tue' },
    { day: '25/02', weekday: 'Wed' },
    { day: '26/02', weekday: 'Thu' },
    { day: '27/02', weekday: 'Fri' },
    { day: '28/02', weekday: 'Sat' },
    { day: '01/03', weekday: 'Sun' },
  ];

  const vehicles = [
    { plate: 'ABC111', type: '混能', color: 'bg-red-500' },
    { plate: 'ABC123', type: '混能', color: 'bg-emerald-500' },
    { plate: 'AAA123', type: '混能', color: 'bg-blue-500' },
    { plate: 'ZR317', type: '混能', color: 'bg-red-500' },
    { plate: 'NX351', type: '混能', color: 'bg-amber-500' },
    { plate: 'UZ690', type: '混能', color: 'bg-emerald-500' },
    { plate: 'T1111', type: '混能', color: 'bg-red-500' },
    { plate: 'RX1117', type: '混能', color: 'bg-amber-500' },
  ];

  const handlePlusClick = (plate: string) => {
    setSelectedVehicle(plate);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <SchedulingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vehiclePlate={selectedVehicle} 
      />
      
      <div className="grid grid-cols-7 gap-2">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-3 rounded border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-500 mb-1">{m.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-bold ${m.color}`}>{m.value}</span>
              {m.percentage && <span className="text-[10px] text-slate-400">({m.percentage})</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="card relative overflow-hidden">
        <div className="p-10 bg-gradient-to-r from-[#8e9eab] to-[#eef2f3] flex flex-col items-center justify-center text-center relative">
          <div className="z-10 space-y-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-md flex items-center gap-3">
              使用 <span className="text-blue-600">租的e</span> 智能編更服務，
            </h2>
            <h2 className="text-3xl font-bold text-white drop-shadow-md">提高管理效率。</h2>
            
            <div className="relative w-[500px] mt-6">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <select className="bg-transparent text-slate-600 text-sm font-bold focus:outline-none">
                  <option>車牌</option>
                </select>
                <div className="w-px h-4 bg-slate-300" />
              </div>
              <input 
                type="text" 
                placeholder="請輸入車牌、打理人、司機姓名" 
                className="w-full pl-24 pr-12 py-3 bg-white border-none rounded-full shadow-lg text-sm focus:outline-none"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary-blue text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
                搜尋
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white">
          <div className="filter-box !p-4 !mb-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">座名</label>
                <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs">
                  <option>請選擇座名</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">的士類型</label>
                <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs">
                  <option>請選擇的士類型</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">搜尋更表(起始日)</label>
                <input type="date" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs" />
              </div>
              <div className="flex items-end gap-2">
                <button className="px-6 py-1.5 bg-primary-blue text-white rounded text-xs font-bold">查詢</button>
                <button className="px-6 py-1.5 bg-orange-400 text-white rounded text-xs font-bold">重置</button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button className="btn-primary"><Plus size={14} /> 快速租車</button>
              <button className="btn-secondary"><Plus size={14} /> 車輛數據</button>
              <button className="btn-secondary"><Plus size={14} /> 司機數據</button>
              <button className="btn-secondary"><Plus size={14} /> 打理人/管理公司</button>
              <button className="btn-secondary"><Download size={14} /> 導出更表</button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-100 rounded-full p-1">
                <button className="px-4 py-1 text-[10px] font-bold bg-white rounded-full shadow-sm flex items-center gap-1">
                  <CloudSun size={12} /> 露天更
                </button>
                <button className="px-4 py-1 text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <Sun size={12} /> 早更
                </button>
                <button className="px-4 py-1 text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <Moon size={12} /> 晚更
                </button>
                <button className="px-4 py-1 text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <Star size={12} /> 特更
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4 text-sm font-bold text-slate-600">
            <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={20} /></button>
            <span>02月23日(星期一) - 03月01日(星期日)</span>
            <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={20} /></button>
            <button className="text-blue-600 ml-4">今天</button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-slate-200">
                  <th className="p-3 text-xs font-bold text-slate-600 text-left border-r border-slate-200 w-40">車輛號碼</th>
                  <th className="p-3 text-xs font-bold text-slate-600 text-center border-r border-slate-200 w-12">更</th>
                  {dates.map((d, i) => (
                    <th key={i} className="p-3 text-xs font-bold text-slate-600 text-center border-r border-slate-200 last:border-r-0">
                      <div className="flex flex-col">
                        <span>{d.day}</span>
                        <span className="text-[10px] opacity-60 font-normal">{d.weekday}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <React.Fragment key={i}>
                    <tr className="border-b border-slate-100">
                      <td rowSpan={3} className="p-4 border-r border-slate-200 align-top">
                        <div className="flex flex-col gap-1">
                          <span className={`w-fit px-1 py-0.5 rounded text-[8px] text-white font-bold ${v.color}`}>
                            {v.type}
                          </span>
                          <span className="text-base font-bold text-slate-800">{v.plate}</span>
                        </div>
                      </td>
                      <td className="p-2 text-[10px] font-bold text-slate-400 text-center border-r border-slate-100 bg-slate-50/50">早</td>
                      {dates.map((_, j) => (
                        <td 
                          key={j} 
                          onClick={() => handlePlusClick(v.plate)}
                          className="p-2 border-r border-slate-100 last:border-r-0 text-center text-slate-300 hover:bg-blue-50 cursor-pointer transition-colors"
                        >+</td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-2 text-[10px] font-bold text-slate-400 text-center border-r border-slate-100 bg-slate-50/50">晚</td>
                      {dates.map((_, j) => (
                        <td 
                          key={j} 
                          onClick={() => handlePlusClick(v.plate)}
                          className="p-2 border-r border-slate-100 last:border-r-0 text-center text-slate-300 hover:bg-blue-50 cursor-pointer transition-colors"
                        >+</td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-200 last:border-b-0">
                      <td className="p-2 text-[10px] font-bold text-slate-400 text-center border-r border-slate-100 bg-slate-50/50">特</td>
                      {dates.map((_, j) => (
                        <td 
                          key={j} 
                          onClick={() => handlePlusClick(v.plate)}
                          className="p-2 border-r border-slate-100 last:border-r-0 text-center text-slate-300 hover:bg-blue-50 cursor-pointer transition-colors"
                        >+</td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


