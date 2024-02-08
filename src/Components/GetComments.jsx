import {useParams} from "react-router-dom"
import {getArticleComments, getUserPhotos} from "../../utils/utils"
import { useEffect, useState} from "react"
import GetComment from "./GetComment"
import NewCommentBox from "./NewCommentBox"

export default function GetComments() {
    const {article_id} = useParams()
    const [articleComments, setArticleComments] = useState([])
    const [userPhotos, setUserPhotos] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(true)

    useEffect(() => {
        setCommentsLoading(true)
        getArticleComments(article_id)
        .then((comments) => {
            setArticleComments(comments)
            const userNames = comments.map((comment) => {
                return comment.author
            })
            return getUserPhotos(userNames)
        }).then((photos) => {
            setUserPhotos(photos)
            setCommentsLoading(false)
        })}, [])

        if(commentsLoading){
            return <p>Comments Loading...</p>

        }

        return(
            <>
        <NewCommentBox />
        <ul className='comments'>
        {articleComments.map((comment, index) => (
            <GetComment key={comment.comment_id} comment={comment} index={index} userPhotos={userPhotos}/>
        ))}
        </ul>
        </>)
}
        
            