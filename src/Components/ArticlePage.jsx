import {useParams} from "react-router-dom"
import { getArticle, getAuthorName } from "../../utils/utils"
import { useEffect, useState } from "react"
import './articlePage.css'

export default function ArticlePage () {
    const {article_id} = useParams()
    const [articleInfo, setArticleInfo] = useState([])
    const [authorName, setAuthorName] = useState("")
     
    useEffect(() => {
        getArticle(article_id).then((response) => {
            setArticleInfo(response)
            return getAuthorName(response.author)
        }).then((author) => {
           setAuthorName(author)
        })
    }, [])


    return <div>
        <p className ="topic">{articleInfo.topic}</p>
        <h2>{articleInfo.title}</h2>
        <img src={articleInfo.article_img_url} alt={articleInfo.title} />
        <footer>
        <p>By {authorName}</p>
        <p>NC News | {articleInfo.created_at ? articleInfo.created_at.slice(0,10) : ``}</p>
        </footer>
        <p>{articleInfo.body}</p>
        <p className = "votes">Votes: {articleInfo.votes} <a><button>Vote</button></a></p>


    </div>
}