
import {Link} from "react-router-dom"

export default function ArticleCard ({article, topic, yearsSincePosted}){

    return (    
            <li key = {article.article_id} className="article-card">
            <Link key={`${article.article_id} img`} to={`/article/${article.article_id}`}>  <img src ={article.article_img_url} alt={`Image relating to ${article.topic}`}/> </Link>
            <Link key={`${article.article_id} main`} to={`/article/${article.article_id}`}>    <main >{article.title}</main> </Link>
                <footer></footer>
                <footer></footer>
                <footer>votes: {article.votes} | Comments: {article.comment_count}</footer>
                <footer>{yearsSincePosted} years ago | {article.topic} </footer>
            </li>
            )
        }