import { NavLink, Outlet } from "react-router-dom"
import MenuStyle from "./Menu.module.css"
export const Menu = () =>{
	return (
        <>
            <div>
                <NavLink to='/main'>	
                    main 
                </NavLink>
                <br></br>
                <NavLink to='/info'>
                    info
                </NavLink>
                <br></br>
                <NavLink to='/statistics'>
                    statistics
                </NavLink>
                <br></br>
                <NavLink to='/history'>
                    history
                </NavLink>
                <br></br>
                <NavLink to='/inputfield'>
                    inputfield
                </NavLink>
            </div>
            <div>
                <Outlet/>
            </div>
        </>

	)
}