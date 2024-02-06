import axios from 'axios'

const ncNewsAPI = axios.create({baseURL : 'https://northcoders-news-tn61.onrender.com/api'})

export function getAllArticles() {
    return ncNewsAPI.get("/articles").then((response) => {
        console.log(response.data.articles)
        return response.data.articles
    })
}

export function getArticle(article_id) {
    return ncNewsAPI.get(`/articles/${article_id}`).then((response) => {
        return response.data.article
    })
}

export function getAuthorName(username) {
    return ncNewsAPI.get(`/users/${username}`).then((response) => {
        return response.data.user.name
    })
}


export function calculateYears(date){
    const dateObject = new Date(date)
        const currentDate = new Date()
        const timeDifference = currentDate - dateObject;
         const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000;
         const yearsDifference = timeDifference / millisecondsInYear;
         const wholeYears = Math.floor(yearsDifference);
         return wholeYears
}