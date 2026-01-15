import css from "./layout.module.css";

interface LayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ sidebar, children }: LayoutProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default Layout;
