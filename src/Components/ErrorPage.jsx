import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'

export default function ErrorPage({errorMessage}) {
    return <>
    {errorMessage === undefined ? "This Page does not exist" : errorMessage }
    <p>Click back to return to your previous session or <Link to={"/"}>click here</Link> to return to the Home Page</p>
    </>
}
