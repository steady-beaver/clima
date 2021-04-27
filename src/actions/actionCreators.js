const ADD_FORECAST = (weatherObj) => {
    return {
        type: 'ADD_FORECAST',
        payload: weatherObj
    }
}

const DELETE_CITY_CARD = (city) => {
    return {
        type: 'DELETE_CITY_CARD',
        payload: city
    }
}

const SET_LOADING = () => {
    return {
        type: 'SET_LOADING'
    }
}

export default {
    ADD_FORECAST,
    SET_LOADING,
    DELETE_CITY_CARD
}
