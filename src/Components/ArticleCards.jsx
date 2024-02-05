import './articleCards.css'
import { calculateYears } from '../../utils/utils'

export default function ArticleCards ({articles}) {
    return  <ul>
    {articles.map((article) => {
         const yearsSincePosted = calculateYears(article.created_at)
        return (<li key = {article.article_id} className="article-card">
            <img src ={article.article_img_url} alt={article.title}/>
            <main>{article.title}</main>
            <footer></footer>
            <footer>{yearsSincePosted} years ago | {article.topic}</footer>
        </li>)
    })}
    </ul>

}