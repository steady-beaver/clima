const getCityForecast = (city) => {
    return {
        type: 'GET_CITY_FORECAST',
        payload: city
    }
}

