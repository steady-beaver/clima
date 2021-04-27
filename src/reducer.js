const reducer = (state, action) => {
    switch (action.type) {
  
      case 'ADD_FORECAST': {

        const weatherObj = action.payload
        
        if(weatherObj === null) return {...state, isLoading: false}   //in case of req error

        const newState = { isLoading: false, weatherArr: [...state.weatherArr, weatherObj] }
        return newState;
  
      }
  
      case 'DELETE_CITY_CARD': {

          const oldWeatherArr = state.weatherArr
          const newWeatherArr = oldWeatherArr
            .filter(weatherObj => weatherObj.place.city !== action.payload )
            
        return {...state, weatherArr: newWeatherArr}
      }


      case 'SET_LOADING': {
        return { ...state, isLoading: true }
      }
  
      default:
        throw new Error(`Invalid action type ${action.type}`)
    }
  }

  export default reducer;