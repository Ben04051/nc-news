import { useEffect, useState } from "react"
import { getAllArticles, getAllTopics } from "../../utils/utils"
import ArticleCards from "./ArticleCards"
import TopicSelector from "./TopicSelector"
import {useParams} from "react-router-dom"


export default function HomePage() {
    const {topic_query} = useParams()
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState(topic_query)
    const [pageIsLoading, setPageIsLoading] = useState(true)
    const [articlesLoading, setArticlesLoading] = useState(true)

    useEffect(() => {
        setArticlesLoading(true)
        getAllArticles(topic_query).then((response) => {
            setArticles(response)
        }).then(() => {
           return getAllTopics()
        }).then((response) => {
            const alphabeticalResponse = response.sort(function (a,b) {
                if (a.slug < b.slug) return -1;
                if (a.slug > b.slug)return 1;
                return 0;
                });
                setTopics(alphabeticalResponse)
            }).then(() => {
                setPageIsLoading(false)
                setArticlesLoading(false)
            })
    }, [topic_query])

    if(pageIsLoading){
        return <p>Loading...</p>
    }

    return (
        <>
        <TopicSelector setTopic={setTopic} topics={topics}/>
        {topic_query === undefined ? <h2>Latest Articles</h2> : <h2>{topic_query}</h2>}
        {articlesLoading ? <p>Articles loading...</p> : 
        <ArticleCards articles={articles} topic={topic}/>}
        
        </>
    )
}