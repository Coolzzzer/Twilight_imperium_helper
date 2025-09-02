import { NavLink, Outlet } from "react-router-dom";
import styles from "./Menu.module.css";

export const Menu = () => {
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <NavLink
          to="/info"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Информация
        </NavLink>
        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Статистика
        </NavLink>
        <NavLink
          to="/inputField"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Поле ввода
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          История
        </NavLink>
        <NavLink
          to="/tir"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Тир-лист
        </NavLink>
      </nav>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
