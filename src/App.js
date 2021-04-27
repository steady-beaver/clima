import React from 'react';
import actions from './actions/actionCreators';
import './App.css';
import Bar from './Bar/Bar';
import Content from './Content/Content';
import ParallaxEffect from './ParallaxEffect/ParallaxEffect';
import PoweredBy from './PoweredBy/PoweredBy';
import reducer from './reducer';

export const WeatherContext = React.createContext([]);


function App() {
  const [state, dispatch] = React.useReducer(reducer, { isLoading: false, weatherArr: [] })

  // const onAddForecast = (weatherObj) => { return dispatch(actions.GET_CITY_WEATHER(weatherObj))  }
  // const onRequestSent = () => { return dispatch(actions.WAIT_RESPONSE())  }
  // const onDeleteCard = (city) => { return dispatch(actions.DELETE_CITY_CARD(city))  }

  const addForecastAct = (weatherObj) => { return dispatch(actions.ADD_FORECAST(weatherObj))  }
  const setLoadingTrueAct = () => { return dispatch(actions.SET_LOADING())  }
  const deleteCityCardAct = (city) => { return dispatch(actions.DELETE_CITY_CARD(city))  }
  
  return (
    <div className="App container" >

      <WeatherContext.Provider value = {state.weatherArr}>
        <Bar 
          setLoadingTrueAct={setLoadingTrueAct}
          addForecastAct={addForecastAct}  />
        <Content isLoading = {state.isLoading} deleteCityCardAct={deleteCityCardAct} />
      </WeatherContext.Provider>

      <ParallaxEffect />
      <PoweredBy />
    </div>
  );
}

export default App;
