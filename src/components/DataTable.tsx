import React from 'react';
import { Edit2, Eye, Trash2 } from 'lucide-react';

interface DataTableProps {
  columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
  selectedRows?: number[];
  onSelectionChange?: (indices: number[]) => void;
  showCheckboxes?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  data, 
  isLoading, 
  emptyMessage = "暫無數據",
  selectedRows = [],
  onSelectionChange,
  showCheckboxes = true
}) => {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectionChange) return;
    if (e.target.checked) {
      onSelectionChange(data.map((_, i) => i));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (index: number) => {
    if (!onSelectionChange) return;
    if (selectedRows.includes(index)) {
      onSelectionChange(selectedRows.filter(i => i !== index));
    } else {
      onSelectionChange([...selectedRows, index]);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 w-full bg-slate-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f8f9fb] border-b border-slate-200">
            {showCheckboxes && (
              <th className="px-4 py-3 text-xs font-bold text-slate-600 border-r border-slate-200 last:border-r-0">
                <input 
                  type="checkbox" 
                  className="rounded" 
                  checked={data.length > 0 && selectedRows.length === data.length}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-xs font-bold text-slate-600 border-r border-slate-200 last:border-r-0">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              {showCheckboxes && (
                <td className="px-4 py-3 border-r border-slate-100">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    checked={selectedRows.includes(i)}
                    onChange={() => handleSelectRow(i)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-xs text-slate-700 border-r border-slate-100 last:border-r-0">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

