import axios from 'axios';


// axios instance including our api credentials
const instance = axios.create({
    baseURL: 'https://api.edamam.com',
    timeout: 5000,
    withCredentials: false,
    params: {
        app_id: 'd521788b',
        app_key: 'c569f8cb415ada401f91221c983f3608',
    }
})

// matt's api credentials: 
// key : c569f8cb415ada401f91221c983f3608
// id : d521788b



/**
 * gets recipe data based on the uri provided
 * @param {string} uri 
 * @returns recipe data for that URI
 */
export const viewRecipe = (uri) => {
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



export const getRecipeByDiet = (diet, pagination, add) => {
    return instance.get('/api/recipes/v2', {
        params: {
            health: diet,
            from: pagination,
            to: (pagination + add),
            type: 'public',
        }
    })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log('Error retrieving recipes: ', error)
        })
}



/**
 * provides search results from api using queries
 * @param {string} search 
 * @param {number} pagination 
 * @param {number} add 
 * @returns search data based on query and number of results needed
 */
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
