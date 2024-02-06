import {useParams} from "react-router-dom"
import {getArticleComments, getUserPhotos } from "../../utils/utils"
import { useEffect, useState } from "react"

export default function GetComments() {
    const {article_id} = useParams()
    const [articleComments, setArticleComments] = useState([])
    const [userPhotos, setUserPhotos] = useState([])
    useEffect(() => {
        getArticleComments(article_id)
        .then((comments) => {
            setArticleComments(comments)
            const userNames = comments.map((comment) => {
                return comment.author
            })
            return getUserPhotos(userNames)
        }).then((photos) => {
            setUserPhotos(photos)
        })}, [])

        return(
            <>
        <h4>Comments:</h4>
        <ul className='comments'>
            {articleComments.map((comment, index) => {
        return(
        <li key= {comment.comment_id}>
        <div className="comment-header">
        <img className= "profile-picture"src ={userPhotos[index]} alt={`${comment.author}'s profile picture'`}></img>
        <p className="author">{comment.author}</p>
        <p className="created-at">{comment.created_at ? comment.created_at.slice(0,10) : ``}</p>
        </div>
        <p className="body">{comment.body}</p>
        </li>)
             })}
        </ul>
        </>)

 }