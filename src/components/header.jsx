function Header() {
  return (
    <header>
      <h1
        style={{
          userSelect: 'none',          // מודרני
          WebkitUserSelect: 'none',    // Safari
          MozUserSelect: 'none',       // Firefox
          msUserSelect: 'none'         // IE10+
        }}
      >
        guitarist
      </h1>
    </header>
  );
}

export default Header;
