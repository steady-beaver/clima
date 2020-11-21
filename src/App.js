import React from 'react';
import actions from './actions/actionCreators';
import './App.css';
import Bar from './Bar/Bar';
import Content from './Content/Content';
import ParallaxEffect from './ParallaxEffect/ParallaxEffect';
import PoweredBy from './PoweredBy/PoweredBy';

export const WeatherContext = React.createContext([]);

const reducer = (state, action) => {
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

    default:
      throw new Error(`Invalid action type ${action.type}`)
  }
}


function App() {
  const [state, dispatch] = React.useReducer(reducer, { isLoading: false, weatherArr: [] })

  // example const setLanguage = (lang) => { return dispatch({type: "setLanguage", payload: lang}) }

  const onAddForecast = (weatherObj) => { return dispatch(actions.GET_CITY_WEATHER(weatherObj))  }
  const onRequestSend = () => { return dispatch(actions.WAIT_LOADING())  }
  const onResponseReceived = () => { return dispatch(actions.RESPONSE_RECEIVED())}

  React.useEffect(() => {
    // console.log("Weather array")
    // console.log(JSON.stringify(state.weatherArr))
  })

  return (
    <div className="App container" >

      <WeatherContext.Provider value = {state.weatherArr}>
        <Bar 
          onResponseReceived={onResponseReceived} 
          onRequestSend={onRequestSend}
          onAddForecast={onAddForecast}  />
        <Content isLoading = {state.isLoading} />
      </WeatherContext.Provider>

      <ParallaxEffect />
      <PoweredBy />
    </div>
  );
}

export default App;
