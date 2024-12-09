import Jobs from "@/components/Jobs";
import Category from "./Category";
import Navbar from "./shared/Navebar";

export default function Home(){
    return(
        <div >
            <Navbar></Navbar>
            
            <Jobs/>
        </div>
    )
}