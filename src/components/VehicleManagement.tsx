import React, { useState } from 'react';
import { Plus, Download, Edit2, Shield, Settings, Users, Link, Unlink, FileText, Eye } from 'lucide-react';
import { DataTable } from './DataTable';
import { Vehicle, RentSetting } from '../types';

interface VehicleManagementProps {
  initialView?: 'basic' | 'rent';
  readOnly?: boolean;
}

export const VehicleManagement: React.FC<VehicleManagementProps> = ({ initialView = 'basic', readOnly = false }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'rent'>(initialView);
  const [isLoading, setIsLoading] = useState(false);

  // Sync internal state if prop changes
  React.useEffect(() => {
    setActiveTab(initialView);
  }, [initialView]);

  const vehicles: Vehicle[] = [
    { id: '1', plate: 'AAA123', owner: '星空車行有限公司', company: '星空車行有限公司', remark: '新增備註', model: '石油氣', make: '豐田Comfort LPG', taxiType: 'Blue', riskScore: 0, status: 'Active' },
    { id: '2', plate: 'ABC123', owner: '星空車行有限公司', company: '星空車行有限公司', remark: '新增備註', model: '混能', make: '日產NV200', taxiType: 'Green', riskScore: 0, status: 'Active' },
    { id: '3', plate: 'ABC111', owner: '星空車行有限公司', company: '星空車行有限公司', remark: '新增備註', model: '混能', make: '豐田Comfort Hybrid', taxiType: 'Red', riskScore: 0, status: 'Active' },
    { id: '4', plate: 'T11221', owner: '星空車行有限公司', company: '星空車行有限公司', remark: '新增備註', model: '混能', make: '五菱EQ100R LV2', taxiType: 'Red', riskScore: 0, status: 'Active' },
    { id: '5', plate: 'T15155', owner: '星空車行有限公司', company: '星空車行有限公司', remark: '新增備註', model: '新能源', make: 'BYD e6', taxiType: 'Red', riskScore: 0, status: 'Active' },
  ];

  const rentSettings: RentSetting[] = [
    { listingStatus: 'Unlisted', rentalStatus: 'Available', plate: 'AAA123', owner: '星空車行有限公司', company: '星空車行有限公司', model: '石油氣', taxiType: 'Blue', make: '豐田Comfort LPG', morningRent: 0, eveningRent: 0, specialRent: 0 },
    { listingStatus: 'Unlisted', rentalStatus: 'Available', plate: 'ABC123', owner: '星空車行有限公司', company: '星空車行有限公司', model: '混能', taxiType: 'Green', make: '日產NV200', morningRent: 0, eveningRent: 0, specialRent: 0 },
    { listingStatus: 'Unlisted', rentalStatus: 'Available', plate: 'ABC111', owner: '星空車行有限公司', company: '星空車行有限公司', model: '混能', taxiType: 'Red', make: '豐田Comfort H...', morningRent: 0, eveningRent: 0, specialRent: 0 },
    { listingStatus: 'Unlisted', rentalStatus: 'Available', plate: 'T11221', owner: '星空車行有限公司', company: '星空車行有限公司', model: '混能', taxiType: 'Red', make: '五菱EQ100R LV2', morningRent: 1, eveningRent: 1, specialRent: 1 },
    { listingStatus: 'Unlisted', rentalStatus: 'Available', plate: 'T15155', owner: '星空車行有限公司', company: '星空車行有限公司', model: '新能源', taxiType: 'Red', make: 'BYD e6', morningRent: 1, eveningRent: 1, specialRent: 1 },
    { listingStatus: 'Listed', rentalStatus: 'Available', plate: 'T22222', owner: 'AllenCheng', company: '星空車行有限公司', model: '混能', taxiType: 'Red', make: 'BYD e6', morningRent: 1, eveningRent: 1, specialRent: 1 },
    { listingStatus: 'Unlisted', rentalStatus: 'Available', plate: 'T1111', owner: '星空車行有限公司', company: '星空車行有限公司', model: '混能', taxiType: 'Red', make: '豐田Comfort LPG', morningRent: 0, eveningRent: 0, specialRent: 0 },
    { listingStatus: 'Listed', rentalStatus: 'Available', plate: 'T15153', owner: '星空車行有限公司', company: '星空車行有限公司', model: '新能源', taxiType: 'Red', make: 'BYD e6', morningRent: 1, eveningRent: 1, specialRent: 1 },
    { listingStatus: 'Listed', rentalStatus: 'Available', plate: 'HT3388', owner: '星空車行有限公司', company: '星空車行有限公司', model: '混能', taxiType: 'Red', make: '豐田Comfort H...', morningRent: 1, eveningRent: 1, specialRent: 1 },
    { listingStatus: 'Listed', rentalStatus: 'Available', plate: 'T15152', owner: '星空車行有限公司', company: '星空車行有限公司', model: '新能源', taxiType: 'Red', make: 'BYD e6', morningRent: 1, eveningRent: 1, specialRent: 1 },
  ];

  const basicColumns = [
    { key: 'id', label: '序號' },
    { key: 'plate', label: '車牌號碼' },
    { key: 'owner', label: '所屬車主' },
    { key: 'company', label: '管理公司名稱' },
    { key: 'remark', label: '備註', render: (val: string) => <span className="text-blue-500 flex items-center gap-1 cursor-pointer"><Edit2 size={12} /> {val}</span> },
    { key: 'model', label: '車型' },
    { key: 'make', label: '廠名' },
    { 
      key: 'taxiType', 
      label: '的士類型', 
      render: (val: string) => (
        <span className={`flex items-center gap-1 font-medium ${val === 'Red' ? 'text-red-500' : val === 'Green' ? 'text-green-600' : 'text-blue-500'}`}>
          <CarIcon color={val} /> {val === 'Red' ? '紅的' : val === 'Green' ? '綠的' : '藍的'}
        </span>
      )
    },
    { key: 'riskScore', label: '風險評分' },
    ...(!readOnly ? [{ 
      key: 'actions', 
      label: '操作', 
      render: () => (
        <div className="flex gap-1.5">
          <button className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded hover:bg-emerald-100 transition-colors">
            <Edit2 size={12} /> 編輯
          </button>
          <button className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition-colors">
            <Eye size={12} /> 查看
          </button>
        </div>
      )
    }] : [])
  ];

  const rentColumns = [
    { 
      key: 'listingStatus', 
      label: '上架狀態', 
      render: (val: string) => (
        <span className={val === 'Listed' ? 'text-emerald-600' : 'text-red-500'}>
          {val === 'Listed' ? '已上架' : '未上架'}
        </span>
      )
    },
    { 
      key: 'rentalStatus', 
      label: '出租狀態', 
      render: (val: string) => (
        <span className="px-2 py-0.5 rounded-full border border-slate-200 text-[10px] text-slate-500">
          {val === 'Available' ? '未出租' : '已出租'}
        </span>
      )
    },
    { key: 'plate', label: '車牌號碼' },
    { key: 'owner', label: '所屬車主' },
    { key: 'company', label: '管理公司名稱' },
    { key: 'model', label: '車型' },
    { 
      key: 'taxiType', 
      label: '的士類型', 
      render: (val: string) => (
        <span className={`flex items-center gap-1 font-medium ${val === 'Red' ? 'text-red-500' : val === 'Green' ? 'text-green-600' : 'text-blue-500'}`}>
          <CarIcon color={val} /> {val === 'Red' ? '紅的' : val === 'Green' ? '綠的' : '藍的'}
        </span>
      )
    },
    { key: 'make', label: '廠名' },
    { key: 'morningRent', label: '早更租金' },
    { key: 'eveningRent', label: '晚更租金' },
    { key: 'specialRent', label: '特更租金' },
    ...(!readOnly ? [{ 
      key: 'actions', 
      label: '操作', 
      render: () => (
        <div className="flex gap-1.5">
          <button className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded hover:bg-emerald-100 transition-colors">
            <Edit2 size={12} /> 編輯
          </button>
          <button className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition-colors">
            <Eye size={12} /> 查看
          </button>
        </div>
      )
    }] : [])
  ];

  return (
    <div className="space-y-4">
      <div className="filter-box">
        {activeTab === 'basic' ? (
          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">車牌號碼</label>
              <input type="text" placeholder="車牌號碼" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">車主姓名</label>
              <input type="text" placeholder="車主姓名" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">管理公司名稱</label>
              <input type="text" placeholder="公司名稱" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">保險公司名稱</label>
              <input type="text" placeholder="保險公司名稱" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">車型</label>
              <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>車型</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">廠名</label>
              <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>請輸入廠名</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">的士類型</label>
              <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>的士類型</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">服務到期日</label>
              <input type="date" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="flex items-end gap-2 col-span-2">
              <button className="px-6 py-1.5 bg-primary-blue text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors">查詢</button>
              <button className="px-6 py-1.5 bg-orange-400 text-white rounded text-xs font-bold hover:bg-orange-500 transition-colors">重置</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">車牌號碼</label>
              <input type="text" placeholder="請輸入車牌號碼" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">車主姓名</label>
              <input type="text" placeholder="請輸入車主姓名" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">座名</label>
              <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>請選擇座名</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">車型</label>
              <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>請選擇車型</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">的士類型</label>
              <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>請選擇的士類型</option>
              </select>
            </div>
            <div className="flex items-end gap-2 col-span-5 justify-start mt-2">
              <button className="px-6 py-1.5 bg-primary-blue text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors">查詢</button>
              <button className="px-6 py-1.5 bg-orange-400 text-white rounded text-xs font-bold hover:bg-orange-500 transition-colors">重置</button>
            </div>
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeTab === 'basic' ? (
            <>
              <button className="btn-primary"><Plus size={14} /> 新增</button>
              <button className="btn-secondary"><Settings size={14} /> 分配安裝公司</button>
              <button className="btn-secondary"><Shield size={14} /> 安裝視覺</button>
              <button className="btn-secondary"><Users size={14} /> 車輛委託</button>
              <button className="px-4 py-1.5 bg-white text-red-500 border border-red-500 rounded-full text-sm font-medium hover:bg-red-50 transition-colors flex items-center gap-1">
                <Unlink size={14} /> 解除委託關係
              </button>
              <button className="btn-secondary"><Download size={14} /> 導出</button>
              <button className="btn-secondary"><FileText size={14} /> 批量導入新車資料</button>
            </>
          ) : (
            <>
              <button className="btn-primary"><Plus size={14} /> 新增車輛</button>
              <button className="btn-secondary"><Settings size={14} /> 租車規則管理</button>
              <button className="px-4 py-1.5 bg-white text-slate-400 border border-slate-200 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1">
                <Settings size={14} /> 取車/還車點設置
              </button>
              <button className="px-4 py-1.5 bg-white text-slate-400 border border-slate-200 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1">
                <Settings size={14} /> 配置信息設置
              </button>
              <button className="px-4 py-1.5 bg-white text-slate-400 border border-slate-200 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1">
                <Settings size={14} /> 交更拍照設置
              </button>
              <button className="px-4 py-1.5 bg-white text-emerald-500 border border-emerald-500 rounded-full text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center gap-1">
                <Plus size={14} className="rotate-45" /> 上架
              </button>
              <button className="px-4 py-1.5 bg-white text-orange-500 border border-orange-500 rounded-full text-sm font-medium hover:bg-orange-50 transition-colors flex items-center gap-1">
                <Plus size={14} className="rotate-45" /> 下架
              </button>
              <button className="btn-secondary"><Download size={14} /> 導出</button>
            </>
          )}
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <DataTable 
          columns={activeTab === 'basic' ? basicColumns : rentColumns} 
          data={activeTab === 'basic' ? vehicles : rentSettings} 
          isLoading={isLoading}
        />
        
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>前往</span>
              <input type="text" defaultValue="1" className="w-8 h-6 border border-slate-200 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <span>頁</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>&lt;</button>
              <button className="w-6 h-6 bg-primary-blue text-white rounded">1</button>
              <button className="w-6 h-6 hover:bg-slate-50 rounded">2</button>
              <button className="w-6 h-6 hover:bg-slate-50 rounded">3</button>
              <button className="p-1 border border-slate-200 rounded hover:bg-slate-50">&gt;</button>
            </div>
            <select className="h-6 border border-slate-200 rounded bg-white px-1">
              <option>10項/頁</option>
              <option>20項/頁</option>
              <option>50項/頁</option>
            </select>
          </div>
          <div>共 23 項</div>
        </div>
      </div>
    </div>
  );
};

const CarIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={color === 'Red' ? '#ef4444' : color === 'Green' ? '#16a34a' : '#3b82f6'} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 7H17.5L19 11H5Z" />
  </svg>
);

