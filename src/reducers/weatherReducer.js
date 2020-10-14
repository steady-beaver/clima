//https://images.unsplash.com/photo-1524252925966-0c12a9eaeb9c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=260&h=150&fit=max&ixid=eyJhcHBfaWQiOjE2NDE2M30


/*
weatherArr = [{
   place:{
       city: "city",
       lat: lat,
       lng: lng
   },
   image: {
       img_url: img_url, //img_url: "https://images.unsplash.com/photo-1589809328135-34ad5225586f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE2NDE2M30",
       alt: alt
   },
   current: {
       temp: 30,
       sky: "rain",
       skyID: XXX,
       desc: "clear sky",
       day: true,
   },
   daily: {
        tempHourArr: [{ 
            x: formattedDate,
            y: tempC
        }]
    },
   forecast: [
                {
                    "date": "formatted date 1",
                    "average temperature": 32
                }, 
                {}
            ]
}];
*/

const initialState = {
    isLoading: false,
    weatherArr: [],
}

const weatherReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'GET_CITY_WEATHER': {

            const weatherObj = action.payload
            const newState = { isLoading: state.isLoading, weatherArr: [...state.weatherArr, weatherObj] }
            console.log("Reducer newState")
            console.log(newState)
            return newState;

        }

        case 'WAIT_LOADING': {
            return { ...state, isLoading: true }
        }

        case 'RESPONSE_RECEIVED': {
            return { ...state, isLoading: false }
        }

        default: return state;
    }
}

export default weatherReducer;