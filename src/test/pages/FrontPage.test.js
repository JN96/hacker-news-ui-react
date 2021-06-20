import React from 'react';
import {shallow} from 'enzyme';
import {FrontPage} from '../../pages/FrontPage';

describe('FrontPage', () => {
  it('should render initial layout', function() {
    const component = shallow(<FrontPage/>);
    expect(component).toMatchSnapshot();
  });
});
