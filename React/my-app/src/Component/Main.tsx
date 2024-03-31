import { BrowserRouter } from "react-router-dom";
import { Nav } from "./Nav";
import { Routing } from "./Routing";


export const Main = () => {
    return <>
        <BrowserRouter>
        
            <Nav ></Nav>
            <Routing></Routing>

        </BrowserRouter>
    </>
}