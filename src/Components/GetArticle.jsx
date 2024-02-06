import {useParams} from "react-router-dom"
import { editVotes, getArticle, getAuthorName} from "../../utils/utils"
import { useEffect, useState } from "react"

export default function GetArticle () {
    const {article_id} = useParams()
    const [articleInfo, setArticleInfo] = useState([])
    const [authorName, setAuthorName] = useState("")
    const [articleVotes, setArticleVotes] = useState(0)
    const [hasVoted, setHasVoted] = useState(false)
     
    useEffect(() => {
        const hasVotedStored = localStorage.getItem(`voted:${article_id}`);
        if (hasVotedStored) {
            setHasVoted(true);
        }
        getArticle(article_id).then((response) => {
            setArticleInfo(response)
            setArticleVotes(response.votes)
            return getAuthorName(response.author)
        }).then((author) => {
           setAuthorName(author)
        })
    }, [])


    function handleVote(){
        if(hasVoted === false){
            setArticleVotes(articleVotes + 1)
            editVotes(article_id, {inc_votes: 1})
            setHasVoted(true)
            localStorage.setItem(`voted:${article_id}`, true)
        } else{
            setArticleVotes(articleVotes - 1)
            editVotes(article_id, {inc_votes: -1})
            setHasVoted(false)
            localStorage.removeItem(`voted:${article_id}`)
        }
    }


    return <div>
        <p className ="topic">{articleInfo.topic}</p>
        <h2>{articleInfo.title}</h2>
        <img src={articleInfo.article_img_url} alt={articleInfo.title} />
        <footer>
        <p>By {authorName}</p>
        <p>NC News | {articleInfo.created_at ? articleInfo.created_at.slice(0,10) : ``}</p>
        </footer>
        <p>{articleInfo.body}</p>
        <p className = "votes">Votes: {articleVotes} <a><button onClick={handleVote}>{hasVoted ? 'Unvote': 'Vote'}</button></a></p>
    </div>
}