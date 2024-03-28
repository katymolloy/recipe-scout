import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.edamam.com',
    timeout: 5000,
    withCredentials: false,
    params: {
        app_key: 'c569f8cb415ada401f91221c983f3608', // Include app_key in params
        app_id: 'd521788b' // Include app_id in params
    }
})


// https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_7bf4a371c6884d809682a72808da7dc2&app_id=d521788b&app_key=c569f8cb415ada401f91221c983f3608
// matt's api credentials: 
// key : c569f8cb415ada401f91221c983f3608
// id : d521788b


// katy credentials
// key : c5651d467486b3320642ff5762e7442c
// id : adae4dea

export const viewRecipe = (uri) => {
    const encodedURI = encodeURIComponent(uri)
    instance.get('/api/recipes/v2/by-uri', {
        params: {
            type: 'public',
            uri: encodedURI,
        }
    })
        .then(response => {
            console.log(response.data)
            return response.data;
        }).catch(error => {
            console.log('Error retrieving recipes: ', error)
        })
}

// nst getSavedRecipes = () => {
//     console.log(savedRecipes)
//     // api calls to grab all the recipes here
//     const baseUrl = 'https://api.edamam.com/api/recipes/v2/by-uri?'
//     const cred = '&app_id=d521788b&app_key=c569f8cb415ada401f91221c983f3608'
//     savedRecipes.forEach((recipeUri) => {
//         let url = baseUrl + recipeUri + cred;
//         fetch(url)
//             .then(() => {
//                 console.log('data retrieved')
//             }).catch((error) => {
//                 console.log(`Error getting saved recipes from API: ${error}`);
//             })
//     })
