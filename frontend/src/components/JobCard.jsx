import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function JobCard() {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 ">
            <p>2 days ago</p>
            <div className="flex items-center gap-2  my-5">
                <Button className="p-6" varient="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="C:\Users\MOHAN\OneDrive\Pictures\for profile picture.jpg"></AvatarImage>
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-bold">company name</h1>
                    <p className="text-sm text-gray-600"> india</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg">title</h1>
                <p className="font-sm text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, dolor qui corporis repellendus excepturi sit cum ipsam vitae facere, pariatur labore vel, odit error. Placeat ea enim sed expedita pariatur.</p>
            </div>
            <div className="flex items-center gap-3 mt-4">
                <Badge className={"font-bold"} variant={"ghost"}>10 positions</Badge>
                <Badge className={"font-bold"} variant={"ghost"}>part time</Badge>
                <Badge className={"font-bold"} variant={"ghost"}>10 lpa</Badge>
            </div>
            <div className="flex items-center gap-3 mt-3">
                <Button variant="outline">Details</Button>
                <Button variant="">Apply</Button>
            </div>
        </div>
    )
}