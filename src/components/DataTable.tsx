
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import '../styles/datatable.scss';

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T, index?: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  fetchData: (page: number, pageSize: number, search?: string) => Promise<{ data: T[]; total: number }>;
  initialPageSize?: number;
}

export interface DataTableRef {
  reload: () => void;
}

function DataTableComponent<T>({ columns, fetchData, initialPageSize = 10 }: DataTableProps<T>, ref: any) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const loadData = async () => {
    try {
      const result = await fetchData(page, pageSize);
      setData(result?.data ?? []);
      setTotal(result?.total ?? 0);
    } catch (err) {
      console.error('Failed to load data', err);
      setData([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, pageSize]);

  useImperativeHandle(ref, () => ({ reload: loadData }));

  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  return (
    <div className="datatable-container">
      <table className="datatable-table">
        <thead>
          <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length}>No data</td></tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map(c => (
                  <td key={c.key}>
                    {c.key === 'sno'
                      ? page * pageSize + i + 1
                      : c.render ? c.render(row, i) : (row as any)[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="datatable-pagination">
        <button disabled={page <= 0} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</button>

        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {[5, 10, 20, 50].map(size => <option key={size} value={size}>{size} / page</option>)}
        </select>
      </div>
    </div>
  );
}

export default forwardRef(DataTableComponent) as <T>(props: DataTableProps<T> & { ref?: any }) => JSX.Element;
