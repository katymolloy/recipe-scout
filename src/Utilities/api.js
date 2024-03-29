import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.edamam.com',
    timeout: 5000,
    withCredentials: false,
    params: {
        app_id: 'd521788b' ,
        app_key: 'c569f8cb415ada401f91221c983f3608',
    }
})

// https://api.edamam.com/api/recipes/v2/by-uri?app_key=c569f8cb415ada401f91221c983f3608&app_id=d521788b&type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_8275bb28647abcedef0baaf2dcf34f8b

// https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_7bf4a371c6884d809682a72808da7dc2&app_id=d521788b&app_key=c569f8cb415ada401f91221c983f3608
// matt's api credentials: 
// key : c569f8cb415ada401f91221c983f3608
// id : d521788b


// katy credentials
// key : c5651d467486b3320642ff5762e7442c
// id : adae4dea

export const viewRecipe = (uri) => {
    // const encodedURI = encodeURIComponent(uri)
    return instance.get('/api/recipes/v2/by-uri', {
        params: {
            type: 'public',
            uri: uri
        }
    })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log('Error retrieving recipes: ', error)
        })
}


export const getSearchResults = (search) => {
    // const encodedURI = encodeURIComponent(uri)
    return instance.get('/api/recipes/v2', {
        params: {
            type: 'public',
            q: search
        }
    })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log('Error retrieving recipes: ', error)
        })
}
