export default function AdminTable({ columns, children }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white">
      <table className="w-full text-left text-small">
        <thead className="border-b border-gray-100 bg-gray-50 text-tiny uppercase text-gray-400">
          <tr>
            {columns.map((c) => (
              <th key={c} className="whitespace-nowrap px-4 py-3 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">{children}</tbody>
      </table>
    </div>
  );
}
