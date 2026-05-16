const Navbar = ({ search, setSearch }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6 flex justify-between items-center">

      {/* SEARCH */}
      <input
        placeholder="Search medicines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded-lg w-1/3"
      />

      {/* ICON */}
      <div>🔔</div>

    </div>
  );
};

export default Navbar;