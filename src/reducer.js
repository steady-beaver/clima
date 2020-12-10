const reducer = (state, action) => {
    switch (action.type) {
  
      case 'GET_CITY_WEATHER': {
  
        const weatherObj = action.payload
        const newState = { isLoading: false, weatherArr: [...state.weatherArr, weatherObj] }
        console.log("Reducer newState")
        console.log(newState)
        return newState;
  
      }
  
      case 'DELETE_CITY_CARD': {
          console.log('DELETE_CITY_CARD reducer ' + action.payload)
          console.log("state: ")
          console.log(state)

          const oldWeatherArr = state.weatherArr
          const newWeatherArr = oldWeatherArr
            .filter(weatherObj => weatherObj.place.city != action.payload )
            
        return {...state, weatherArr: newWeatherArr}
      }


      case 'WAIT_RESPONSE': {
        return { ...state, isLoading: true }
      }
  
      default:
        throw new Error(`Invalid action type ${action.type}`)
    }
  }

  export default reducer;