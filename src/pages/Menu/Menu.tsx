import { NavLink, Outlet } from "react-router-dom"
import MenuStyle from "./Menu.module.css"
export const Menu = () =>{
	return (
        <>
            <div>
                <NavLink to='/main'>	
                    main 
                </NavLink>
                <NavLink to='/result'>
                    result
                </NavLink>
                <NavLink to='/info'>
                    info
                </NavLink>
                <NavLink to='/winrate'>
                    winrate
                </NavLink>
                <NavLink to='/history'>
                    history
                </NavLink>
            </div>
            <div>
                <Outlet/>
            </div>
        </>

	)
}