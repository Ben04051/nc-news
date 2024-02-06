import {useParams} from "react-router-dom"
import {getArticleComments, getUserPhotos, postNewComment } from "../../utils/utils"
import { useEffect, useState, useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function GetComments() {
    const {article_id} = useParams()
    const [articleComments, setArticleComments] = useState([])
    const [userPhotos, setUserPhotos] = useState([])
    const [newComments, setNewCommments] = useState([])
    const [commentInput, setCommentInput] = useState("")
    const [isNewComment, setIsNewComment] = useState(false)
    const [commentLoading, setCommentLoading] = useState(true)
    const [commentPosted, setCommentPosted] = useState("Comment Added!")
    const loggedInUser = useContext(UserContext)
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

        function postComment(event){
            event.preventDefault()
            const newCommentToPost = ({username : loggedInUser.username, body: commentInput})
            setIsNewComment(true)
            setCommentLoading(true)
            postNewComment(article_id, newCommentToPost).then(() => {
                setNewCommments((currentComments) =>  [...currentComments, commentInput])
                setCommentInput("")
                setCommentPosted("Comment Added!")
                setCommentLoading(false)
            }).catch((error) => {
                setCommentPosted("Unable To Add Comment")
                setCommentLoading(false)
            })
        }

        function updateInput(){
            setCommentInput(event.target.value)
        }

        return(
            <>
        <h4>Comments:</h4>
        <div className = "new-comment">
            <form onSubmit={postComment}>
                <img className="profile-picture"src={loggedInUser.avatar_url} alt="your profile picture"/>
                <input value= {commentInput}className="vertical-centre" required type="text" name="comment" placeholder="Add comment..." onChange={updateInput}></input>
                <button className="vertical-centre"> Post</button>
            </form>
        </div>

        { isNewComment ?  
        <>
        {commentLoading ? <h4>Comment Posting...</h4>  :  <h4>{commentPosted}</h4> }
        <ul className='comments'>
            {newComments.map((comment) => {
        return(
        <li key= {comment}>
        <div className="comment-header">
        <img className="profile-picture"src={loggedInUser.avatar_url} alt="your profile picture"/>
        <p className="author">{loggedInUser.username}</p>
        <p className="created-at">Just Now</p>
        </div>
        <p className="body">{comment}</p>
        </li>)
             })}
        </ul> </> : null}

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