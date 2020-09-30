//https://images.unsplash.com/photo-1524252925966-0c12a9eaeb9c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=260&h=150&fit=max&ixid=eyJhcHBfaWQiOjE2NDE2M30


/*
const initialState = [{
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
            dt: formattedDate,
            temp: tempC
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

const initialState = []

const weatherReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'GET_CITY_WEATHER': {

            let weatherObj = action.payload
            return [...state, weatherObj]
        }

        default: return state;
    }
}

export default weatherReducer;