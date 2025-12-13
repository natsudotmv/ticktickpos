const TableSelector = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <button
          key={i}
          className="border rounded-md py-2 text-sm hover:bg-muted"
        >
          Table {i + 1}
        </button>
      ))}
    </div>
  );
};

export default TableSelector;
