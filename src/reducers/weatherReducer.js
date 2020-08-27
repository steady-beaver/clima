const API_KEY_NAME = "ccec765bf7b5d7e644d77172a0eadb7c"

/**
 * state:
 * 
 *  [
 *      {
 *          city: "city",
 *          weather: {
 *              temp: 0,
 *              sky: "clear"    
*           },
 *          forecast: [{}]
 *      },
 *   ]
 * 
 */

const initialState = [{
    city: "Shumen",
    weather: {
        temp: 30,
        sky: "rain"
    },
    forecast: null
}];

const weatherReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case 'GET_CITY_WEATHER': {
        
            let weatherObj = action.payload
            console.log(weatherObj)
            return [...state, weatherObj]
        }

        default: return state;
    }
}

export default weatherReducer;