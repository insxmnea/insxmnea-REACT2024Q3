export const Layout = ({ children }) => {
  return (
    <main>
      <header>My Website</header>
      <article>{children}</article>
      {/*  ^ this is your "<Outlet>" */}
    </main>
  );
};
