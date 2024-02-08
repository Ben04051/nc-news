import axios from 'axios'

const ncNewsAPI = axios.create({baseURL : 'https://northcoders-news-tn61.onrender.com/api'})

export function getAllArticles({topic_query, sortQuery, orderQuery}) {
    return ncNewsAPI.get("/articles", {params : {topic_query: topic_query, sort_by: sortQuery, order: orderQuery} }).then((response) => {
        return response.data.articles
    })
}

export function getAllTopics() {
    return ncNewsAPI.get("/topics").then((response) => {
        return response.data.topics
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

export function getUserPhotos(usernames) {
    const userNamePromises = usernames.map((username) => {
        return ncNewsAPI.get(`/users/${username}`).then((response) => {
            return response.data.user.avatar_url
        })
    })

    return Promise.all(userNamePromises)
}

export function getArticleComments(article_id) {
return ncNewsAPI.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments
})
}

export function editVotes(article_id, body){
    return ncNewsAPI.patch(`/articles/${article_id}`, body).then((body) => {
        return(body)
    })
}

export function postNewComment(article_id, body){
    return ncNewsAPI.post(`/articles/${article_id}/comments`, body).then((body) => {
        return(body)
    })
}

export function deleteComment(comment_id){
    return ncNewsAPI.delete(`/comments/${comment_id}`).then((body) => {
        return(body)
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