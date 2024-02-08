import { useEffect, useState } from "react"
import { getAllArticles, getAllTopics } from "../../utils/utils"
import ArticleCards from "./ArticleCards"
import TopicSelector from "./TopicSelector"
import {useParams} from "react-router-dom"
import SortFilter from "./SortFilter"
import {useSearchParams} from 'react-router-dom'
import ErrorPage from "./ErrorPage"


export default function HomePage() {
    const {topic_query} = useParams()
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState(topic_query)
    const [pageIsLoading, setPageIsLoading] = useState(true)
    const [articlesLoading, setArticlesLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const sortQuery = searchParams.get('sort_by')
    const orderQuery = searchParams.get('order')
    const [searchFiltersApplied, setSearchFiltersApplied] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        setErrorMessage(null)
        setSearchFiltersApplied(false)
        setArticlesLoading(true)
        getAllArticles({topic_query, sortQuery, orderQuery}).then((response) => {
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
            }).catch((error) => {
                setErrorMessage(error.response.data.msg)
                setPageIsLoading(false)
                setArticlesLoading(false)
            } )
    }, [topic_query, searchFiltersApplied])

    if(errorMessage){
        return <ErrorPage errorMessage={errorMessage} />
    }

    if(pageIsLoading){
        return <p>Loading...</p>
    }

    return (
        <>
        <TopicSelector setTopic={setTopic} topics={topics} setSearchParams={setSearchParams}/>
        <SortFilter setSearchFiltersApplied={setSearchFiltersApplied} setSearchParams={setSearchParams} sortQuery={sortQuery} orderQuery={orderQuery} topic_query={topic_query}/>
        {topic_query === undefined ? <h2>Latest Articles</h2> : <h2>{topic_query}</h2>}
        {articlesLoading ? <p>Articles loading...</p> : 
        <ArticleCards articles={articles} topic={topic}/>}
        
        </>
    )
}