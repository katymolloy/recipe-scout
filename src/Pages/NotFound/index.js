import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            <h1>404: Not Found</h1>
            <div>Oops, looks like you may be lost.</div>
            <Link to={'/'}>Take me back home!</Link>
        </div>
    )
}