import './articleCards.css'
import { calculateYears } from '../../utils/utils'
import ArticleCard from './ArticleCard'

export default function ArticleCards ({articles, topic}) {
    return  (
    <ul className="article-cards">
    {articles.map((article) => {
       const yearsSincePosted = calculateYears(article.created_at)
       return<ArticleCard key={article.article_id} article={article} topic={topic} yearsSincePosted={yearsSincePosted}/>
    })}
    </ul> 
    )

}