import UserContext from "../contexts/UserContext";
import {useParams} from "react-router-dom"
import { useContext, useState} from "react";
import { postNewComment } from "../../utils/utils";
import GetComment from "./GetComment";

export default function NewCommentBox() {
    const {article_id} = useParams()
    const loggedInUser= useContext(UserContext)
    const [newComments, setNewCommments] = useState([])
    const [commentInput, setCommentInput] = useState("")
    const [isNewComment, setIsNewComment] = useState(false)
    const [commentLoading, setCommentLoading] = useState(true)
    const [commentPosted, setCommentPosted] = useState("Comment Added!")

    function postComment(event){
        event.preventDefault()
        const newCommentToPost = ({username : loggedInUser.username, body: commentInput})
        setIsNewComment(true)
        setCommentLoading(true)
        postNewComment(article_id, newCommentToPost).then((response) => {
            const commentToPost = response.data.comment
            setNewCommments((currentComments) =>  [commentToPost, ...currentComments])
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

  return (
    <>
        <h4>Comments:</h4>
        <div className="new-comment">
            <form onSubmit={postComment}>
                <img className="profile-picture" src={loggedInUser.avatar_url} alt="your profile picture" />
                <input value={commentInput} className="vertical-centre" required type="text" name="comment" placeholder="Add comment..." onChange={updateInput}></input>
                <button className="vertical-centre"> Post</button>
            </form>
        </div>
        {isNewComment ?
            <>
                {commentLoading ? <h4>Comment Posting...</h4> : <h4>{commentPosted}</h4>}
                <ul className='comments'>
                    {newComments.map((comment) => (
                        <GetComment key={comment.comment_id} comment={comment} index={null} userPhotos={null} />
                    ))}
                </ul>
            </> : null}
    </>);
}