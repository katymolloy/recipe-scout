import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewRecipe } from "../../Utilities/api";

export default function RecipePage() {
    const { uri } = useParams();
    const [recipe, setRecipe] = useState([])

    useEffect(() => {
        viewRecipe(uri)
            .then(data => {
                setRecipe(data)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
    }, [])


    return (
        <div>
            <Header />
            <Footer />

        </div>
    )
}