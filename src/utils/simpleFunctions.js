export const unifyImg = (img_url) => {
    img_url = img_url.replace('&w=400', '&w=300&h=200')
    img_url = img_url.replace('&fit=max', '&fit=crop')
    return img_url
}

export const fromUnixToStr = (unix_timestamp) => {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
}

export const getDateFromUNIX = (unix) => {
    const milliseconds = unix * 1000;

    const dateObject = new Date(milliseconds);

    const humanDateTimeFormat = dateObject.toLocaleString('en-GB'); //2019/12/9 10:30:15

    const humanDateFormat = humanDateTimeFormat.split(',')[0];

    return humanDateFormat.replace(/\//g, "-");

}

export const isDayLight = (currentDayData) => {
    // const currentTime = 1601377777;   //TEST

    const currentTime = currentDayData.dt;
    const sunrise = currentDayData.sunrise;
    const sunset = currentDayData.sunset;

    if (sunrise < currentTime && currentTime < sunset) return true;
    else return false;

}

export const refineData = (daysArr) => {

    const calculateAvgTemp = (dayTempData) => {
        const avgTemp = Math.round((dayTempData.morn + dayTempData.day + dayTempData.eve + dayTempData.night) / 4);
        return avgTemp;
    }


    let data = daysArr.map(dayData => {
        return {
            "date": getDateFromUNIX(dayData.dt),
            "avr": calculateAvgTemp(dayData.temp)
        }
    })

    data.shift();
    return data;
}

export const formatData = (arr) => {
    for (let i in arr) {
        arr[i].Hour = arr[i].Hour.split(":")[0]
    }
}

export const pickProperSVG = (sky, skyID, dayLight) => {
    switch (sky) {
        case 'Thunderstorm': return window.Skycons.WIND;
        case 'Drizzle': return window.Skycons.RAIN;
        case 'Rain': return window.Skycons.SLEET;
        case 'Snow': return window.Skycons.SNOW;
        case 'Clear': {
            if (dayLight)
                return window.Skycons.CLEAR_DAY;
            else
                return window.Skycons.CLEAR_NIGHT;
        }

        case 'Clouds': {
            // console.log("SkyID: " + skyID + " " + typeof(skyID))
            if (skyID === 801 || skyID === 802) {
                if (dayLight) return window.Skycons.PARTLY_CLOUDY_DAY;
                else return window.Skycons.PARTLY_CLOUDY_NIGHT;
            }
            if (skyID === 803 || skyID === 804)
                return window.Skycons.CLOUDY;
            break;
        }

        default: {
            if (skyID >= 700) return window.Skycons.FOG;
            else throw new Error("Not relevant current weather, caught in pickProperSVG function ")
        }
    }
}

export const capitalizeFirst = (string) => {
    string = string.trim()
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default {
    unifyImg,
    fromUnixToStr,
    getDateFromUNIX,
    isDayLight,
    refineData,
    formatData,
    pickProperSVG,
    capitalizeFirst,
}