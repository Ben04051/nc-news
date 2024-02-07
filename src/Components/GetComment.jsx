import { useState, useContext } from "react"
import UserContext from "../contexts/UserContext"
import { deleteComment } from "../../utils/utils"

export default function GetComment({comment, index, userPhotos}) {
    
    const loggedInUser = useContext(UserContext)
    const [commentDeleting, setCommentDeleting] = useState(false)
    const [commentDeleted, setCommentDeleted] = useState("Comment Deleted!")
    const [deletedCommentId, setDeletedCommentID] =useState(null)


    function handleDelete(event){
        const comment_id = Number(event.target.value)
        setCommentDeleting(true)
        setDeletedCommentID(comment_id)
        deleteComment(comment_id).then(() => {
            setCommentDeleting(false)
            setCommentDeleted("Comment deleted!")
        }).catch((error) => {
            setCommentDeleting(false)
            setCommentDeleted("Unable to delete comment")
        })
    }

    return(
        <>
        {deletedCommentId === comment.comment_id ? commentDeleting ? <p className="comment-delete">deleting comment...</p> : <p className="comment-delete">{commentDeleted}</p>
        : 
        <li key= {comment.comment_id} className="comment">
        <div className="comment-header">
        {index === null ?  <img className="profile-picture"src={loggedInUser.avatar_url} alt="your profile picture"/>  :
        <img className= "profile-picture"src ={userPhotos[index]} alt={`${comment.author}'s profile picture'`}></img> }
        <p className="author">{comment.author}</p>
        <p className="created-at">{comment.created_at ? comment.created_at.slice(0,10) : ``}</p>
        </div>
        <p className="body">{comment.body}</p>
        {comment.author === loggedInUser.username ? <div className="delete-button-container"><button value={comment.comment_id} onClick={handleDelete} className="delete-button">delete</button></div> :null} 
        </li> }
        </>)
            
}