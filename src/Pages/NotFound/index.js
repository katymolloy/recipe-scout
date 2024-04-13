import { Link } from "react-router-dom"
import Header from "../../Components/Header"
import Footer from "../../Components/Footer"

import "./NotFound.scss";


/**
 * Page-Not-Found Page
 */
export default function NotFound() {

    return (
        
        <div className="notFound">
            <Header />
            <main>
                <h1>404: Not Found</h1>
                <div>Oops, looks like you may be lost.</div>
                <Link to={'/'}>Take me back home!</Link>
            </main>
            <Footer />
        </div>

    )

}