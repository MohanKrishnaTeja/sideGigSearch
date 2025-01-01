import { useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const FilterData = [
  {
    filterType: "Location",
    array: ["delhi", "hyd", "bang", "chennai"],
  },
  {
    filterType: "Salary",
    array: ["0-5", "5-10", "10-15", "15-20"],
  },
  {
    filterType: "Position",
    array: ["Intern", "Junior", "Mid", "Senior"],
  },
];

export default function FilterCard({ onFilterChange }) {
  const [filters, setFilters] = useState({
    location: "",
    salary: "",
    position: "",
  });

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType.toLowerCase()]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {FilterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold">{data.filterType}</h1>
            {data.array.map((item, idx) => (
              <div className="flex items-center space-x-2 my-2" key={idx}>
                <RadioGroupItem
                  value={item}
                  checked={filters[data.filterType.toLowerCase()] === item}
                  onChange={() => handleFilterChange(data.filterType, item)}
                />
                <Label>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}