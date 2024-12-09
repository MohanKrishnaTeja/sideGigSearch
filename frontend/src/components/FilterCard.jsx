import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"


const FilterData = [
    {
        filterType : "Location",
        array : ["delhi",'hyd',"bang","chennai"]
    },
    {
        filterType : "salary",
        array : ["delhi",'hyd',"bang","chennai"]
    },
    {
        filterType : "position",
        array : ["delhi",'hyd',"bang","chennai"]
    },
]

export default function FilterCard(){
    return(
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-bold text-lg">filter jobs</h1>
            <hr  className="mt-3"/>
            <RadioGroup>
                {
                    FilterData.map((data,index)=>(
                        <div>
                            <h1 className="font-bold">{data.filterType}</h1>
                            {
                                data.array.map((item,index)=>{
                                    return (
                                        <div className="flex items-center space-x-2 my-2">
                                            <RadioGroupItem value = "item"></RadioGroupItem>
                                            <Label>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>

        </div>
    )
}