import {useParams} from "react-router-dom"
import { getArticle, getArticleComments, getAuthorName, getUserPhotos } from "../../utils/utils"
import { useEffect, useState } from "react"
import './articlePage.css'

export default function ArticlePage () {
    const {article_id} = useParams()
    const [articleInfo, setArticleInfo] = useState([])
    const [authorName, setAuthorName] = useState("")
    const [articleComments, setArticleComments] = useState([])
    const [userPhotos, setUserPhotos] = useState([])
     
    useEffect(() => {
        getArticle(article_id).then((response) => {
            setArticleInfo(response)
            return getAuthorName(response.author)
        }).then((author) => {
           setAuthorName(author)
           return getArticleComments(article_id)
        }).then((comments) => {
            setArticleComments(comments)
            const userNames = comments.map((comment) => {
                return comment.author
            })
            return getUserPhotos(userNames)
        }).then((photos) => {
            setUserPhotos(photos)
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
        <h4>Comments:</h4>
        <ul className='comments'>
            {articleComments.map((comment, index) => {
        return(
        <li key= {comment.comment_id}>
        <div className="comment-header">
        <img className= "profile-picture"src ={userPhotos[index]} alt={`${comment.author}'s profile picture'`}></img>
        <p className="author">{comment.author}</p>
        <p className="created-at">{comment.created_at ? articleInfo.created_at.slice(0,10) : ``}</p>
        </div>
        <p className="body">{comment.body}</p>
        </li>)
             })}
        </ul>
    </div>
}