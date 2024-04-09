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

// matt's api credentials: 
// key : c569f8cb415ada401f91221c983f3608
// id : d521788b


// katy credentials
// key : c5651d467486b3320642ff5762e7442c
// id : adae4dea

export const viewRecipe = (uri) => {
    return instance.get('/api/recipes/v2/by-uri', {
        params: {
            type: 'public',
            uri: uri
        }
    })
        .then(response => {
            console.log('API called')
            return response.data;
        }).catch(error => {
            console.log('Error retrieving recipes: ', error)
        })
}


export const getSearchResults = (search, pagination, add) => {
    return instance.get('/search', {
        params: {
            q: search,
            from: pagination,
            to: (pagination + add)
        }
    })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log('Error retrieving recipes: ', error)
        })
}
