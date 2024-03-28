import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.edamam.com',
    timeout: 5000,
    withCredentials: false,
    params: {
        app_key: 'c569f8cb415ada401f91221c983f3608',
        app_id: 'd521788b'
    }
})


export const getSavedRecipes = (uri) => {
    instance.get('/api/recipes/v2/by-uri?' + uri)
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
