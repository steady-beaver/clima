import def_img from './def_house_img.jpg'
import simpleFuncs from './simpleFunctions'


export const getCityCoordinates = async (city) => {
   
    let resGeoCoordinates = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_GEO}&q=${city}&no_annotations=1&limit=1`)
    resGeoCoordinates = await resGeoCoordinates.json()
    const category = resGeoCoordinates.results[0].components._category
    const type = resGeoCoordinates.results[0].components._type

    if (category !== "place" || type !== "city") {
        throw new Error("OpenCage Geocoding API cannot find such city!")
    }

    return {
        lat: resGeoCoordinates.results[0].geometry.lat,
        lng: resGeoCoordinates.results[0].geometry.lng
    }
}

export const getWeatherData = async (coords) => {
    let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER}&units=metric`)

    if (!resWeather.ok) {
        throw new Error("Problem with Open Weather API")
    }

    resWeather = await resWeather.json()

    let hourTempArr = [];

    for (let i in resWeather.hourly) {
        let date = simpleFuncs.fromUnixToStr(resWeather.hourly[i].dt)
        hourTempArr.push({
            Hour: date,
            Temperature: resWeather.hourly[i].temp
        })
        if (date === "0:00:00") break;
    }

    simpleFuncs.formatData(hourTempArr)

    return [resWeather, hourTempArr]
}

export const getCityImage = async (city) => {
    let resImages = await fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_IMAGES}&page=1&per_page=3&query=${city}`)
    resImages = await resImages.json()

    let unified_img_url = "";
    let alt = "";

    if (resImages.total === 0) {
        unified_img_url = def_img
        //"https://www.developco.com/wp-content/uploads/2015/08/CCCC-home-2-500x200.jpg"
        alt = "Unfortunately Unsplash API does not provide images for that town."
    } else {
        unified_img_url = simpleFuncs.unifyImg(resImages.results[2].urls.small)
        alt = resImages.results[2].alt_description
    }

    return [unified_img_url, alt]
}

export default {
    getWeatherData,
    getCityCoordinates,
    getCityImage
}