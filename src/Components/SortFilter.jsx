import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"

export default function SortFilter({setSearchFiltersApplied, setSearchParams, sortQuery, orderQuery}) {
    const {topic_query} = useParams()
    const [selectedSortQuery, setSelectedSortQuery] = useState("created_at")
    const [selectedOrderQuery, setSelectedOrderQuery] = useState("desc")

useEffect(() => {
    setSelectedSortQuery(sortQuery);
    setSelectedOrderQuery(orderQuery);
}, [topic_query])

function handleQueries(event) {
    event.preventDefault()
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('sort_by', selectedSortQuery === null ? "created_at" : selectedSortQuery)
    newSearchParams.set('order', selectedOrderQuery === null ? "desc" : selectedOrderQuery)
    setSearchParams(newSearchParams)
    setSearchFiltersApplied(true)
}

function updateSortQuery(event) {
    setSelectedSortQuery(event.target.value)

}

function updateOrderQuery(event) {
    setSelectedOrderQuery(event.target.value)
}

    return (
    <form onSubmit={handleQueries}>
        <label htmlFor="sort-by">Sort by: </label>
        <select required id="sort-by" onChange={updateSortQuery}  value={selectedSortQuery || "created_at"}>
        <option value="created_at">Date</option>
        <option value="comment_count">Comment count</option>
        <option value="votes">Votes</option>
        </select>
        <label htmlFor="order"> Order: </label>
        <select required id="order" onChange={updateOrderQuery} value={selectedOrderQuery || "desc"}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
        </select>
        <button>Apply Filters</button>
    </form>)
}
