import { NavLink, Outlet } from "react-router-dom"
export const Menu = () =>{
	return (
        <div style={{backgroundImage: `url(${`https://raw.githubusercontent.com/Coolzzzer/Twilight_imperium_helper/refs/heads/main/src/assets/img/background.png`}`, width: "100vw", height: "100vh", padding: "2vh"}}>
            <div style={{ display: "flex", gap: "1rem" }}>
                {/* <NavLink to='/main'>	
                    Главная
                </NavLink> */}
                <NavLink to='/info'>
                    Информация
                </NavLink>
                <NavLink to='/statistics'> 
                    Статистика
                </NavLink>
                <NavLink to='/history'>
                    История
                </NavLink>
                <NavLink to='/tir'>
                    Тир-лист
                </NavLink>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>

	)
}