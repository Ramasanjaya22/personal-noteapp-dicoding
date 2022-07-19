const NavigationBar = ({ onSearch }) => {
  return (
    <div className="note-app__header">
      <h1>
        Notes{" "}
        <span>
          <lord-icon
            src="https://cdn.lordicon.com/wxnxiano.json"
            trigger="morph"
            colors="primary:#f4f0ff,secondary:#f4f0ff"
            Style="width:50px;height:50px"
          ></lord-icon>
        </span>
      </h1>
      <div className="note-search">
        <input
          type="text"
          placeholder="Cari catatan ..."
          onChange={(e) => onSearch(e)}
        />
      </div>
    </div>
  );
};
export default NavigationBar;
