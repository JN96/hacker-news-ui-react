import React from 'react';
import {shallow} from 'enzyme';
import {dictionary} from '../../lang/en';
import {HackerNewsBanner} from '../../components/hackerNewsBanner/HackerNewsBanner';

describe('HackerNewsBanner', () => {
  it('should render initial layout', function() {
    const component = shallow(<HackerNewsBanner/>);
    expect(component).toMatchSnapshot();
  });

  it('should render the title', function() {
    const component = shallow(<HackerNewsBanner/>);
    const title = component.find('h1').text();
    expect(title).toEqual(dictionary.application.hackerNews);
  });
});
