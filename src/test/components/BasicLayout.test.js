import React from 'react';
import {shallow} from 'enzyme';
import {BasicLayout} from '../../layouts/basicLayout/BasicLayout';
import {render} from '@testing-library/react';
import {dictionary} from '../../lang/en';

describe('BasicLayout', () => {
  it('should render initial layout ', function() {
    const component = shallow(<BasicLayout/>);
    expect(component).toMatchSnapshot();
  });

  it('should render the Hacker News banner component when the correct prop is passed', function() {
    const component = render(<BasicLayout hackerNewsBanner={true}/>);
    const banner = component.getByText(dictionary.application.hackerNews);
    expect(banner).toBeVisible();
  });

  it('should render the error component when the correct prop is passed', function() {
    const mockError = 'test error';
    const component = render(<BasicLayout error={mockError}/>);
    const error = component.getByText(mockError);
    expect(error).toBeVisible();
  });

  it('should render the spinner component when the correct prop is passed', function() {
    const component = shallow(<BasicLayout loading={true}/>);
    expect(component).toMatchSnapshot();
  });
});
