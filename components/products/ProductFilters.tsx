import { Filter } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { categories } from "./data"

interface ProductFilterProps {
    selected: string
    onChange: (category: string) => void
}

export default function ProductFilters({ selected, onChange }: ProductFilterProps) {
    return (
        <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4" />
            <Select value={selected} onValueChange={onChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Фильтр по категории" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
