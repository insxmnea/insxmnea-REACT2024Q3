export const Layout = ({ children }) => {
  return (
    <main>
      <header>My Website</header>
      <article>{children}</article>
    </main>
  );
};
