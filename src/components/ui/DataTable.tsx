import clsx from 'clsx';
import { ReactNode, useMemo, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (record: T) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T;
  title?: string;
  emptyLabel?: string;
  pageSize?: number;
}

export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  searchKey,
  title,
  emptyLabel = 'No hay datos disponibles.',
  pageSize = 5,
}: DataTableProps<T>) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query || !searchKey) return data;
    const normalized = query.toLowerCase();
    return data.filter((row) => String(row[searchKey]).toLowerCase().includes(normalized));
  }, [data, query, searchKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      {title && <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Buscar..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className={clsx('px-4 py-4 font-semibold', column.width)}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              pageData.map((record, index) => (
                <tr key={index} className="transition hover:bg-slate-50">
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-4 py-4 align-top">
                      {column.render ? column.render(record) : String(record[column.key] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{`Mostrando ${pageData.length} de ${filtered.length} registros`}</span>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page <= 1}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <span>{page} / {totalPages}</span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page >= totalPages}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
