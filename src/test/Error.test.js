import React from 'react';
import {shallow} from 'enzyme';
import {Error} from '../components/error/Error';

describe('Error', () => {
  it('should render initial layout', () => {
    const component = shallow(<Error/>);
    expect(component).toMatchSnapshot();
  });

  it('should render the error', () => {
    const testData = 'test error';
    const component = shallow(<Error message={testData}/>);
    const title = component.find('p').text();
    expect(title).toEqual(testData);
  });
});
