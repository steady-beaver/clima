import { shallow } from 'enzyme'
import React from 'react'
import { findByTestAttr } from '../utils/simpleTestFunctions'
import PoweredBy from './PoweredBy'

test("Renders 8 technology cards", ()=>{
    const wrapper = shallow(<PoweredBy />)
    // console.log(wrapper.debug())
    const components = findByTestAttr(wrapper, 'tech-card-component')
    expect(components.length).toBe(8); 
})

