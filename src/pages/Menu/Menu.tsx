import { NavLink, Outlet } from "react-router-dom"
import MenuStyle from "./Menu.module.css"
export const Menu = () =>{
	return (
        <>
            <div style={{ display: "flex", gap: "1rem" }}>
                <NavLink to='/main'>	
                    Главная
                </NavLink>
                <NavLink to='/info'>
                    Информация
                </NavLink>
                <NavLink to='/statistics'>
                    Статистика
                </NavLink>
                <NavLink to='/history'>
                    История
                </NavLink>
            </div>
            <div>
                <Outlet/>
            </div>
        </>

	)
}