"use client"
import { Button } from "@/app/_components/ui/button"
import { Input } from "../../_components/ui/input"
import { SearchIcon } from "lucide-react"

const Search = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Input placeholder="Busque por uma barbearia..." />
        <Button variant="default">
          <SearchIcon size={18} />
        </Button>
      </div>
    </div>
  )
}

export default Search
