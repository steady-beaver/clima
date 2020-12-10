const GET_CITY_WEATHER = (weatherObj) => {
    return {
        type: 'GET_CITY_WEATHER',
        payload: weatherObj
    }
}

const DELETE_CITY_CARD = (city) => {
    return {
        type: 'DELETE_CITY_CARD',
        payload: city
    }
}

const WAIT_RESPONSE = () => {
    return {
        type: 'WAIT_RESPONSE'
    }
}

export default {
    GET_CITY_WEATHER,
    WAIT_RESPONSE,
    DELETE_CITY_CARD
}
