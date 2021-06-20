import React from 'react';
import {shallow} from 'enzyme';
import {StoryCard} from '../../components/storyCard/StoryCard';

describe('StoryCard', () => {
  const mockData = {
    title: 'test title',
    by: 'test author',
    score: 2,
    kids: [1, 2, 3],
    time: 1624206113
  };

  it('should render initial layout', function() {
    const component = shallow(<StoryCard data={mockData}/>);
    expect(component).toMatchSnapshot();
  });

  it('should display the correct value', function() {
    const expectedData = {
      title: 'test title',
      by: 'Posted by test author',
      score: '2 points',
      kids: '3 comments',
      time: 'Posted on 20/06/2021 at 17:21:53'
    };

    const component = shallow(<StoryCard data={mockData}/>);

    const title = component.find('._story-title').text();
    const by = component.find('._story-author').text();
    const score = component.find('._story-score').text();
    const comments = component.find('._story-comments').text();
    const time = component.find('._story-time').text();

    expect(title).toEqual(expectedData.title);
    expect(by).toEqual(expectedData.by);
    expect(score).toEqual(expectedData.score);
    expect(comments).toEqual(expectedData.kids);
    expect(time).toEqual(expectedData.time);
  });
});
