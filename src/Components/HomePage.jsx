import { useEffect, useState } from "react"
import { getAllArticles } from "../../utils/utils"
import ArticleCards from "./ArticleCards"

export default function HomePage() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getAllArticles().then((response) => {
            setArticles(response)
        })
    }, [])

    return (
       <ArticleCards articles={articles} />
    )
}