//https://images.unsplash.com/photo-1524252925966-0c12a9eaeb9c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=260&h=150&fit=max&ixid=eyJhcHBfaWQiOjE2NDE2M30

/**
 * state:
 * 
 *  [
 *      {
 *          city: "city",
 *          img_url: "https://images.unsplash.com/photo-1589809328135-34ad5225586f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE2NDE2M30",
 *          weather: {
 *              temp: 0,
 *              sky: "clear"    
*           },
 *          forecast: [{}]
 *      },
 *   ]
 * 
 */

 /*
const initialState = [{
    city: "Shumen",
    image: {
        img_url: img_url,
        alt: alt
    }
    img_url: "https://images.unsplash.com/photo-1589809328135-34ad5225586f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE2NDE2M30",
    weather: {
        temp: 30,
        sky: "rain"
    },
    forecast: null
}];
*/

const initialState = []

const weatherReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case 'GET_CITY_WEATHER': {
        
            let weatherObj = action.payload
            //console.log(weatherObj)
            return [...state, weatherObj]
        }

        default: return state;
    }
}

export default weatherReducer;