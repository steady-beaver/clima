import { shallow } from 'enzyme'
import React from 'react'
import { findByTestAttr } from '../utils/simpleTestFunctions'
import testWeatherData from '../utils/testData'
import Bar from './Bar'

jest.mock('../utils/makeCustomRequests')

// const setup = () => {
//     const mockAddForecast = jest.fn();
//     const mockRequestSend = jest.fn();
//     const mockResponseReceived = jest.fn();

//     return shallow(<Bar onAddForecast={mockAddForecast} onRequestSend={mockRequestSend} onResponseReceived={mockResponseReceived}  />)
// }

test('Renders without problem', ()=>{
    
    const wrapper = shallow(<Bar />)
    expect(wrapper.length).toBe(1)
})

test('Submit button is disabled when input is empty \
        A: onLoad-disabled \
        B: inputParis-notDisabled \
        C: emptyInput-disabled' , () => {

        const wrapper = shallow(<Bar />)

        let inputEl = findByTestAttr(wrapper, "city-input")
        let buttonEl = findByTestAttr(wrapper, "submit-button") 
        expect(buttonEl.prop('disabled')).toBeTruthy()


        let mockEvent = { target: { value: 'Paris' } }
        inputEl.simulate('change', mockEvent)
        buttonEl = findByTestAttr(wrapper, "submit-button")
        expect(buttonEl.prop('disabled')).toBeFalsy()


        mockEvent = { target: { value: '' } }
        inputEl.simulate('change', mockEvent)
        buttonEl = findByTestAttr(wrapper, "submit-button")
        expect(buttonEl.prop('disabled')).toBeTruthy()
    })



// test("Testing does handleSubmit execute after submitting the form  through mocking onRequestSend ", () => {

//      const mockRequestSend = jest.fn().mockName('Omega');
//     // onAddForecast={jest.fn()} onRequestSend={mockRequestSend} onResponseReceived={jest.fn()}
//     const wrapper = shallow(<Bar onRequestSend = {mockRequestSend} onAddForecast={jest.fn()} onResponseReceived={jest.fn()} />)
    
//     const mockEvent = {    
//             preventDefault() { }, 
//             target: {city: {value: "Mancho" }}  
//         }
    
//         const formEl = findByTestAttr(wrapper, 'bar-form')
//         formEl.simulate('submit', mockEvent )
        
        
//         expect(mockRequestSend).toHaveBeenCalled()
    
// })




test("If city is required second time, output specific UI error in the helper-text", () => {

    //Mock console.error because we except to log error
    let originalError = console.error;
    console.error = jest.fn();

    const mockWeatherContext = jest.fn().mockReturnValue(testWeatherData)
    React.useContext = mockWeatherContext
 
    const mockEvent = {    
        preventDefault() { }, 
        target: {city: {value: testWeatherData[0].place.city }}  
    }

    
    const wrapper = shallow(<Bar />)
    const formEl = findByTestAttr(wrapper, 'bar-form')
    formEl.simulate('submit', mockEvent )
    
    const helperEl = findByTestAttr(wrapper, 'helper-span')
    expect(helperEl.text()).toMatch(/You already have data for that city!/)

    //return original console.error fn for the later tests
    console.error = originalError;
    
})


test("If city is required second time, output specific error message in the console", () => {
    
    //Mock console.error
    let originalError = console.error;
    console.error = jest.fn();

    //Tries go get data for same city twice which evokes specific error that is caught in the console.error
    const mockWeatherContext = jest.fn().mockReturnValue(testWeatherData)
    React.useContext = mockWeatherContext
 
    const mockEvent = {    
        preventDefault() { }, 
        target: {city: {value: testWeatherData[0].place.city }}  
    }

    const wrapper = shallow(<Bar />)
    const formEl = findByTestAttr(wrapper, 'bar-form')
    formEl.simulate('submit', mockEvent )

    //Check data collected by our mock function

    expect(console.error.mock.calls[0][0]).toMatch(/You already have data for that city!/)

    //return original console.error fn for the later tests
    console.error = originalError;
})



test("Sending request", () => { })