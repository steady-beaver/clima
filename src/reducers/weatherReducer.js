const initialState = {
    city: "",
    forecast: []
}

const weatherReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case 'GET_CITY_FORECAST': return console.log("Getting forecast from the API")

        default: return state;
    }
}

export default weatherReducer;