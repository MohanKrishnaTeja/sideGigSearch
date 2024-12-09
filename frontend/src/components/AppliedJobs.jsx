import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow, TableHead } from "./ui/table";
import { Badge } from "./ui/badge";

export default function AppliedJobs() {
    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-md shadow-md border border-gray-200">
            <h1 className="text-2xl font-bold mb-4 text-center">Applied Jobs</h1>
            <Table className="w-full border border-gray-300">
                <TableCaption className="text-sm text-gray-600 italic">A list of all jobs you have applied for</TableCaption>
                <TableHeader className="bg-gray-100 border-b border-gray-300">
                    <TableRow>
                        <TableHead className="font-semibold text-black">Date</TableHead>
                        <TableHead className="font-semibold text-black">Job Role</TableHead>
                        <TableHead className="font-semibold text-black">Company</TableHead>
                        <TableHead className="font-semibold text-black text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2, 3, 4, 5].map((item, index) => (
                            <TableRow key={index} className="hover:bg-gray-100 transition duration-150">
                                <TableCell className="text-black">17-02-2024</TableCell>
                                <TableCell className="text-black">Frontend Engineer</TableCell>
                                <TableCell className="text-black">Google</TableCell>
                                <TableCell className="text-right">
                                    <Badge className="bg-black text-white px-3 py-1">Selected</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}
