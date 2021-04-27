import def_img from './def_house_img.jpg'
import simpleFuncs from './simpleFunctions'


export const getCityCoordinates = async (city, countryCode) => {
    
    let resGeoCoordinates

    if (typeof countryCode === 'undefined')
        resGeoCoordinates = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_GEO}&q=${city}&no_annotations=1&limit=1&min_confidence=3`)
    else{
        resGeoCoordinates = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_GEO}&q=${city}&no_annotations=1&limit=1&min_confidence=3&countrycode=${countryCode}`)
    }
    
    if (resGeoCoordinates.ok) {

        const data = await resGeoCoordinates.json()
        const category = data.results[0].components._category
        const type = data.results[0].components._type

        // console.log(data)

        if (category !== "place" || type !== "city") {
            throw new Error("OpenCage Geocoding API cannot find such city object!")
        }

        return {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng
        }

    } else throw new Error("Problem with fetching data from api.opencagedata.com")
}


export const getWeatherData = async (coords) => {
    let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER}&units=metric`)

    if (resWeather.ok) {

        const data = await resWeather.json()
        let hourTempArr = [];

        for (let i in data.hourly) {
            let date = simpleFuncs.fromUnixToStr(data.hourly[i].dt)
            hourTempArr.push({
                Hour: date,
                Temperature: data.hourly[i].temp
            })
            if (date === "0:00:00") break;
        }

        simpleFuncs.formatData(hourTempArr)

        return [data, hourTempArr]
    }

    else throw new Error("Problem with fetching data from api.openweathermap.org")

}

export const getCityImage = async (city) => {
    let resImages = await fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_IMAGES}&page=1&per_page=3&query=${city}`)
    if (resImages.ok) {

        const data = await resImages.json()

        let unified_img_url = "";
        let alt = "";

        if (data.total === 0) {
            //"https://www.developco.com/wp-content/uploads/2015/08/CCCC-home-2-500x200.jpg"
            unified_img_url = def_img
            alt = "Unfortunately Unsplash API does not provide images for that town."
        } else {
            unified_img_url = simpleFuncs.unifyImg(data.results[0].urls.small)
            alt = data.results[0].alt_description
        }

        return [unified_img_url, alt]
    }
    else throw new Error("Problem with fetching data from api.unsplash.com")
}

export default {
    getWeatherData,
    getCityCoordinates,
    getCityImage,
}