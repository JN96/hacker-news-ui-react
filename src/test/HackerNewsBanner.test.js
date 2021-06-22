import React from 'react';
import {shallow} from 'enzyme';
import {dictionary} from '../lang/en';
import {HackerNewsBanner} from '../components/hackerNewsBanner/HackerNewsBanner';

describe('HackerNewsBanner', () => {
  it('should render initial layout', () => {
    const component = shallow(<HackerNewsBanner/>);
    expect(component).toMatchSnapshot();
  });

  it('should render the title', () => {
    const component = shallow(<HackerNewsBanner/>);
    const title = component.find('h1').text();
    expect(title).toEqual(dictionary.application.hackerNews);
  });
});
