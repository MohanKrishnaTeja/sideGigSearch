import Navbar from "./shared/Navebar";

const jobArray = ["1","2","3","4","5"]

export default function Jobs(){
    return(
        <div>
            <Navbar/>
            <div>
                <div>
                    {
                        jobArray.map((item,index) => <job/>)
                    }
                </div>
            </div>
        </div>
    )
}

