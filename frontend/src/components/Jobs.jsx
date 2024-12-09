import JobCard from "@/components/JobCard";
import Navbar from "./shared/Navebar";
import FilterCard from "./FilterCard";

const jobArray = ["1", "2", "3", "4", "5"]

export default function Jobs() {
    return (
        <div className="max-w-7xl mx-auto mt-5">
            <div className="flex gap-5">
                <div className="w-20%">
                    <FilterCard/>
                </div>

                {
                    jobArray.length <= 0 ? <Span>job not found</Span> : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    jobArray.map((item,index)=>(
                                        <div>
                                            <JobCard/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

