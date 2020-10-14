export const GET_CITY_WEATHER = (weatherObj) => {
    return {
        type: 'GET_CITY_WEATHER',
        payload: weatherObj
    }
}

export const WAIT_LOADING = () => {
    return {
        type: 'WAIT_LOADING'
    }
}

export const RESPONSE_RECEIVED = () => {
    return {
        type: 'RESPONSE_RECEIVED'
    }
}

export default {
    GET_CITY_WEATHER,
    WAIT_LOADING,
    RESPONSE_RECEIVED
}
