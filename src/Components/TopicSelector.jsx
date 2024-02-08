import {Link} from "react-router-dom" 
import "./articlePage.css"


export default function TopicSelector({setTopic, topics}) {

    function selectTopic(event){
        if(event.target.value === "All"){
            setTopic(null)
        } else{
            setTopic(event.target.value)
        }
    }


    return(<div className="topic-select-container">
    <ul name="topics" id="topics" onChange={selectTopic}>
     <li> <Link key="All" to="/">All</Link> </li>
      {topics.map((topic) => (
       <li key={topic.slug} value={topic.slug}>
          <Link key= {`${topic.slug}`} to={`/topics/${topic.slug}`} >{topic.slug}</Link>
        </li>
      ))}
    </ul>
   
  </div>
);
}