import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow, TableHead } from "./ui/table";
import { Badge } from "./ui/badge";

export default function AppliedJobs(){
    return(
        <div>
            <Table>
                <TableCaption>a list of applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead  className = "text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1,2,3,4,5].map((item,index) => (
                            <TableRow key={index}>
                                <TableCell>17-02-2024</TableCell>
                                <TableCell>frontend engineer</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}