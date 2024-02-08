
import {Link} from "react-router-dom"

export default function ArticleCard ({article, topic, yearsSincePosted}){
    return (    
    <Link key={article.article_id} to={`/article/${article.title}/${article.article_id}`}>
            <li key = {article.article_id} className="article-card">
                <img src ={article.article_img_url} alt={article.title}/>
                <main >{article.title}</main>
                <footer></footer>
                <footer>{yearsSincePosted} years ago | {article.topic}</footer>
            </li>
            </Link>)
        }