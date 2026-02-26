import React, { useState } from 'react';
import { Plus, Download, Edit2, Eye, UserCheck, Calendar, Settings, Search, X, Play, Square, Trash2 as TrashIcon, UserPlus } from 'lucide-react';
import { DataTable } from './DataTable';
import { Driver, RenewalRule } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { AddDriverToRulesModal } from './AddDriverToRulesModal';

interface DriverManagementProps {
  initialView?: 'basic' | 'renewal';
  readOnly?: boolean;
}

export const DriverManagement: React.FC<DriverManagementProps> = ({ initialView = 'basic', readOnly = false }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'renewal'>(initialView);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [driverRules, setDriverRules] = useState<Record<string, RenewalRule[]>>({});
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
  const [editingDriverName, setEditingDriverName] = useState<string | null>(null);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  const checkUnsavedChanges = (action: () => void) => {
    if (editingDriverName) {
      setShowUnsavedWarning(true);
      return;
    }
    action();
  };

  // Sync internal state if prop changes
  React.useEffect(() => {
    setActiveTab(initialView);
    setSelectedRows([]); // Clear selection when tab changes
  }, [initialView]);

  const drivers: Driver[] = [
    { status: 'Rented', nameCn: '平板測試', nameEn: 'IPADTEST', nickname: '-', gender: 'Male', driverId: '999999', shift: '早更', rentedVehicle: 'AAA123', phone: '30624770', riskScore: 0, remark: '' },
    { status: 'Rented', nameCn: '租的正', nameEn: 'ZU DI ZHENG', nickname: '-', gender: 'Male', driverId: '556612', shift: '-', rentedVehicle: '-', phone: '55991212', riskScore: 0, remark: '' },
    { status: 'Rented', nameCn: '租的好', nameEn: 'ZU DI HAO', nickname: '-', gender: 'Male', driverId: '987654', shift: '-', rentedVehicle: '-', phone: '55994646', riskScore: 0, remark: '' },
    { status: 'Rented', nameCn: '租的易', nameEn: 'ZU DI YI', nickname: '-', gender: 'Male', driverId: '663459', shift: '-', rentedVehicle: '-', phone: '95436639', riskScore: 0, remark: '' },
    { status: 'Rented', nameCn: '婷姐宜', nameEn: 'Ting Zu Yi', nickname: '-', gender: 'Female', driverId: '123456', shift: '-', rentedVehicle: '-', phone: '31415926', riskScore: 0, remark: '' },
  ];

  const addNewRule = (driverName: string) => {
    const existingRules = driverRules[driverName] || [];
    const ruleCount = existingRules.length + 1;
    const newRule: RenewalRule = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${driverName}的規則 ${ruleCount}`,
      shift: 'Morning',
      vehicle: '',
      rent: 0,
      duration: '',
      effectiveDate: '',
      workDays: [],
      status: 'Active'
    };
    setDriverRules(prev => ({
      ...prev,
      [driverName]: [...(prev[driverName] || []), newRule]
    }));
  };

  const updateRuleField = (driverName: string, ruleId: string, field: keyof RenewalRule, value: any) => {
    setDriverRules(prev => {
      const rules = [...(prev[driverName] || [])];
      const index = rules.findIndex(r => r.id === ruleId);
      if (index !== -1) {
        rules[index] = { ...rules[index], [field]: value };
      }
      return { ...prev, [driverName]: rules };
    });
  };

  const handleRuleAction = (driverName: string, ruleId: string, action: 'start' | 'terminate' | 'delete') => {
    setDriverRules(prev => {
      const rules = [...(prev[driverName] || [])];
      const index = rules.findIndex(r => r.id === ruleId);
      if (index === -1) return prev;

      if (action === 'delete') {
        rules.splice(index, 1);
      } else if (action === 'start') {
        rules[index].status = 'Active';
      } else if (action === 'terminate') {
        rules[index].status = 'Terminated';
      }
      return { ...prev, [driverName]: rules };
    });
  };

  const handleAddDriversToRules = (driverNames: string[]) => {
    setDriverRules(prev => {
      const next = { ...prev };
      driverNames.forEach(name => {
        const existingRules = next[name] || [];
        const ruleCount = existingRules.length + 1;
        const newRule: RenewalRule = {
          id: Math.random().toString(36).substr(2, 9),
          name: `${name}的規則 ${ruleCount}`,
          shift: 'Morning',
          vehicle: '',
          rent: 0,
          duration: '',
          effectiveDate: '',
          workDays: [],
          status: 'Active'
        };
        next[name] = [...(next[name] || []), newRule];
      });
      return next;
    });
    setActiveTab('renewal');
  };

  const basicColumns = [
    { 
      key: 'status', 
      label: '狀態', 
      render: (val: string) => (
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">
          租用中
        </span>
      )
    },
    { key: 'nameCn', label: '司機姓名(中文)' },
    { key: 'nameEn', label: '司機姓名(英文)' },
    { key: 'nickname', label: '司機暱稱' },
    { 
      key: 'gender', 
      label: '性別', 
      render: (val: string) => (
        <span className={val === 'Male' ? 'text-blue-500' : 'text-pink-500'}>
          {val === 'Male' ? '♂ 男' : '♀ 女'}
        </span>
      )
    },
    { key: 'driverId', label: '司機證號碼' },
    { key: 'shift', label: '更數' },
    { key: 'rentedVehicle', label: '租用車輛' },
    { key: 'phone', label: '電話號碼' },
    { key: 'riskScore', label: '風險評分' },
    { key: 'remark', label: '備註' },
    ...(!readOnly ? [{ 
      key: 'actions', 
      label: '規則管理', 
      render: (val: any, row: any) => {
        const rules = driverRules[row.nameCn] || [];
        return (
          <div className="flex flex-col gap-2">
            {rules.length > 0 ? (
              rules.map((rule, idx) => (
                <div key={rule.id} className="flex flex-col gap-1 p-1.5 border border-slate-100 rounded-lg bg-slate-50/30">
                  <div className={`flex items-center gap-1 px-2 py-1 border rounded transition-colors text-[10px] font-bold text-left ${
                    rule.status === 'Active' 
                      ? 'bg-blue-50 text-blue-600 border-blue-100' 
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    <Calendar size={10} /> {rule.name}
                    {rule.status === 'Terminated' && <span className="ml-1 text-[8px] opacity-60">(已終止)</span>}
                  </div>
                  
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleRuleAction(row.nameCn, rule.id, 'start')}
                      disabled={rule.status === 'Active'}
                      className={`flex-1 py-0.5 rounded text-[9px] font-bold transition-colors border ${
                        rule.status === 'Active' 
                          ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                      }`}
                    >
                      生效開始
                    </button>
                    <button 
                      onClick={() => handleRuleAction(row.nameCn, rule.id, 'terminate')}
                      disabled={rule.status === 'Terminated'}
                      className={`flex-1 py-0.5 rounded text-[9px] font-bold transition-colors border ${
                        rule.status === 'Terminated' 
                          ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed' 
                          : 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100'
                      }`}
                    >
                      規則終止
                    </button>
                    <button 
                      onClick={() => handleRuleAction(row.nameCn, rule.id, 'delete')}
                      className="flex-1 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded hover:bg-red-100 transition-colors text-[9px] font-bold"
                    >
                      刪除規則
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-slate-400 italic text-[10px]">暫無規則</span>
            )}
            <button 
              onClick={() => addNewRule(row.nameCn)}
              className="text-[9px] text-blue-600 hover:underline font-bold mt-1"
            >
              + 添加新規則
            </button>
          </div>
        );
      }
    }] : [])
  ];

  const renewalColumns = [
    { 
      key: 'driverName', 
      label: '司機姓名',
      render: (val: string) => (
        <span className="text-[10px] font-bold text-slate-900">{val}</span>
      )
    },
    { 
      key: 'rules_name', 
      label: '規則名稱',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        return (
          <div className="flex flex-col gap-2">
            {(row.rules as RenewalRule[]).map(rule => (
              <div key={rule.id} className="h-8 flex items-center">
                {isRowEditing ? (
                  <input 
                    type="text" 
                    value={rule.name} 
                    onChange={(e) => updateRuleField(row.driverName, rule.id, 'name', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-[10px] focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <span className="text-[10px] font-medium text-slate-700">{rule.name}</span>
                )}
              </div>
            ))}
          </div>
        );
      }
    },
    { 
      key: 'rules_shift', 
      label: '更數',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        return (
          <div className="flex flex-col gap-2">
            {(row.rules as RenewalRule[]).map(rule => (
              <div key={rule.id} className="h-8 flex items-center">
                {isRowEditing ? (
                  <select 
                    value={rule.shift} 
                    onChange={(e) => updateRuleField(row.driverName, rule.id, 'shift', e.target.value)}
                    className="w-full px-1 py-1 border border-slate-200 rounded text-[10px] bg-white"
                  >
                    <option value="Morning">早更</option>
                    <option value="Evening">晚更</option>
                    <option value="Special">特更</option>
                  </select>
                ) : (
                  <span className="text-[10px]">{rule.shift === 'Morning' ? '早更' : rule.shift === 'Evening' ? '晚更' : '特更'}</span>
                )}
              </div>
            ))}
          </div>
        );
      }
    },
    { 
      key: 'rules_vehicle', 
      label: '綁定車輛',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        return (
          <div className="flex flex-col gap-2">
            {(row.rules as RenewalRule[]).map(rule => (
              <div key={rule.id} className="h-8 flex items-center">
                {isRowEditing ? (
                  <div className="relative w-full">
                    <input 
                      type="text"
                      list={`vehicle-list-${rule.id}`}
                      value={rule.vehicle} 
                      onChange={(e) => updateRuleField(row.driverName, rule.id, 'vehicle', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded text-[10px] focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="輸入或選擇"
                    />
                    <datalist id={`vehicle-list-${rule.id}`}>
                      <option value="AAA123" />
                      <option value="ABC123" />
                      <option value="ABC111" />
                    </datalist>
                  </div>
                ) : (
                  <span className="text-[10px] font-mono">{rule.vehicle || '-'}</span>
                )}
              </div>
            ))}
          </div>
        );
      }
    },
    { 
      key: 'rules_rent', 
      label: '租金',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        return (
          <div className="flex flex-col gap-2">
            {(row.rules as RenewalRule[]).map(rule => (
              <div key={rule.id} className="h-8 flex items-center">
                {isRowEditing ? (
                  <div className="relative w-full">
                    <input 
                      type="number" 
                      value={rule.rent || ''} 
                      onChange={(e) => updateRuleField(row.driverName, rule.id, 'rent', Number(e.target.value))}
                      className="w-full pl-2 pr-5 py-1 border border-slate-200 rounded text-[10px] focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] text-slate-400">HKD</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-600">${rule.rent}</span>
                )}
              </div>
            ))}
          </div>
        );
      }
    },
    { 
      key: 'rules_date', 
      label: '自動編更日',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        return (
          <div className="flex flex-col gap-2">
            {(row.rules as RenewalRule[]).map(rule => (
              <div key={rule.id} className="h-8 flex items-center">
                {isRowEditing ? (
                  <input 
                    type="date" 
                    value={rule.effectiveDate} 
                    onChange={(e) => updateRuleField(row.driverName, rule.id, 'effectiveDate', e.target.value)}
                    className="w-full px-1 py-1 border border-slate-200 rounded text-[10px] focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <span className="text-[10px]">{rule.effectiveDate || '-'}</span>
                )}
              </div>
            ))}
          </div>
        );
      }
    },
    { 
      key: 'rules_workdays', 
      label: '開工日期',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        const dayMap = { '周一': '一', '周二': '二', '周三': '三', '周四': '四', '周五': '五', '周六': '六', '周日': '日' };
        return (
          <div className="flex flex-col gap-2">
            {(row.rules as RenewalRule[]).map(rule => (
              <div key={rule.id} className="h-8 flex items-center">
                <div className="flex gap-0.5">
                  {days.map(day => (
                    <button
                      key={day}
                      disabled={!isRowEditing}
                      onClick={() => {
                        const val = rule.workDays || [];
                        const newDays = val.includes(day) ? val.filter(d => d !== day) : [...val, day];
                        updateRuleField(row.driverName, rule.id, 'workDays', newDays);
                      }}
                      className={`w-4 h-4 flex items-center justify-center rounded-[2px] text-[8px] font-bold border transition-colors ${
                        (rule.workDays || []).includes(day) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300'
                      } ${!isRowEditing ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {dayMap[day as keyof typeof dayMap]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }
    },
    { 
      key: 'rules_duration', 
      label: '續約持續',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        return (
          <div className="flex flex-col gap-2">
            {(row.rules as RenewalRule[]).map(rule => (
              <div key={rule.id} className="h-8 flex items-center">
                {isRowEditing ? (
                  <select 
                    value={rule.duration} 
                    onChange={(e) => updateRuleField(row.driverName, rule.id, 'duration', e.target.value)}
                    className="w-full px-1 py-1 border border-slate-200 rounded text-[10px] bg-white"
                  >
                    <option value="">請選擇</option>
                    <option value="一週">一週</option>
                    <option value="兩週">兩週</option>
                    <option value="三週">三週</option>
                    <option value="四週">四週</option>
                  </select>
                ) : (
                  <span className="text-[10px]">{rule.duration || '-'}</span>
                )}
              </div>
            ))}
          </div>
        );
      }
    },
    {
      key: 'rules_actions',
      label: '規則操作',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        return (
          <div className="flex flex-col gap-2">
            {(row.rules as RenewalRule[]).map(rule => (
              <div key={rule.id} className="h-8 flex items-center gap-1">
                <button 
                  onClick={() => handleRuleAction(row.driverName, rule.id, rule.status === 'Active' ? 'terminate' : 'start')}
                  disabled={!isRowEditing}
                  className={`px-2 py-1 rounded text-[9px] font-bold border transition-colors ${
                    !isRowEditing 
                      ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                      : rule.status === 'Active' 
                        ? 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100' 
                        : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                  }`}
                >
                  {rule.status === 'Active' ? '終止' : '開始'}
                </button>
                <button 
                  onClick={() => handleRuleAction(row.driverName, rule.id, 'delete')}
                  disabled={!isRowEditing}
                  className={`px-2 py-1 border rounded transition-colors text-[9px] font-bold ${
                    !isRowEditing
                      ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                      : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
                  }`}
                >
                  刪除
                </button>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      key: 'driver_actions',
      label: '操作',
      render: (_: any, row: any) => {
        const isRowEditing = row.driverName === editingDriverName;
        return (
          <div className="flex items-center gap-2 h-full">
            {!isRowEditing ? (
              <button 
                onClick={() => {
                  if (editingDriverName && editingDriverName !== row.driverName) {
                    setShowUnsavedWarning(true);
                    return;
                  }
                  setEditingDriverName(row.driverName);
                }}
                className="p-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded hover:bg-blue-100 transition-colors shadow-sm"
                title="編輯規則"
              >
                <Edit2 size={14} />
              </button>
            ) : (
              <button 
                onClick={() => setEditingDriverName(null)}
                className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded hover:bg-emerald-100 transition-colors shadow-sm"
                title="確認修改"
              >
                <UserCheck size={14} />
              </button>
            )}
            <button 
              onClick={() => addNewRule(row.driverName)}
              disabled={!isRowEditing}
              className={`p-1.5 border rounded transition-colors ${
                !isRowEditing
                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                  : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 shadow-sm'
              }`}
              title="為該司機新增規則"
            >
              <Plus size={14} />
            </button>
          </div>
        );
      }
    }
  ];

  const renewalData = Object.entries(driverRules).map(([driverName, rules]) => ({
    driverName,
    rules: rules as RenewalRule[]
  }));

  return (
    <div className="space-y-4">
      {/* Unsaved Warning Modal */}
      <AnimatePresence>
        {showUnsavedWarning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center"
            >
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="animate-spin-slow" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">您有未保存的更改</h3>
              <p className="text-sm text-slate-500 mb-6">
                請先點擊當前編輯行中的「確認」按鈕保存更改，然後再進行其他操作。
              </p>
              <button 
                onClick={() => setShowUnsavedWarning(false)}
                className="w-full py-2 bg-primary-blue text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AddDriverToRulesModal 
        isOpen={isAddDriverModalOpen}
        onClose={() => setIsAddDriverModalOpen(false)}
        onAdd={handleAddDriversToRules}
        availableDrivers={drivers}
        existingDriverNames={Object.keys(driverRules)}
      />

      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => checkUnsavedChanges(() => setActiveTab('basic'))}
          className={`text-sm font-bold pb-2 px-1 transition-all ${activeTab === 'basic' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-slate-400'}`}
        >
          全部
        </button>
        <button 
          onClick={() => checkUnsavedChanges(() => setActiveTab('renewal'))}
          className={`text-sm font-bold pb-2 px-1 transition-all ${activeTab === 'renewal' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-slate-400'}`}
        >
          自動續約規則
        </button>
        <button 
          onClick={() => checkUnsavedChanges(() => setActiveTab('basic'))}
          className="text-sm font-bold pb-2 px-1 text-slate-400"
        >
          租用中
        </button>
        <button 
          onClick={() => checkUnsavedChanges(() => setActiveTab('basic'))}
          className="text-sm font-bold pb-2 px-1 text-slate-400"
        >
          已停租
        </button>
      </div>

      <div className="filter-box">
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">司機證號碼</label>
            <input type="text" placeholder="司機證號碼" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">司機姓名</label>
            <input type="text" placeholder="司機姓名" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">司機暱稱</label>
            <input type="text" placeholder="請輸入司機暱稱" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">電話號碼</label>
            <input type="text" placeholder="電話號碼" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">性別</label>
            <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>請選擇性別</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">更數</label>
            <select className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>請選擇更數</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">司機風險評分</label>
            <div className="flex items-center gap-2">
              <input type="text" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <span className="text-slate-400">至</span>
              <input type="text" className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex items-end gap-2 col-span-2">
            <button 
              onClick={() => checkUnsavedChanges(() => {})}
              className="px-6 py-1.5 bg-primary-blue text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              查詢
            </button>
            <button 
              onClick={() => checkUnsavedChanges(() => {})}
              className="px-6 py-1.5 bg-orange-400 text-white rounded text-xs font-bold hover:bg-orange-500 transition-colors"
            >
              重置
            </button>
          </div>
        </div>
      </div>

      {!readOnly && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={() => checkUnsavedChanges(() => setIsAddDriverModalOpen(true))}
            className="btn-primary"
          >
            <UserPlus size={14} /> 新增司機至規則
          </button>
          <button className="px-4 py-1.5 bg-white text-slate-400 border border-slate-200 rounded-full text-sm font-medium cursor-not-allowed flex items-center gap-1">
            <Trash2 size={14} /> 刪除
          </button>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <DataTable 
          columns={activeTab === 'basic' ? basicColumns : renewalColumns} 
          data={activeTab === 'basic' ? drivers : renewalData} 
          isLoading={isLoading} 
          showCheckboxes={false}
        />
      </div>
    </div>
  );
};

const Trash2 = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

