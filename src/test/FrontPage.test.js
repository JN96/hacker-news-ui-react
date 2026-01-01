import React from 'react';
import {shallow} from 'enzyme';
import {FrontPage} from '../pages/FrontPage';
import {render, screen, act, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {dictionary} from '../lang/en';
import {api} from '../services/api';
import {
  HACKER_NEWS_ASK_STORIES_URL,
  HACKER_NEWS_BEST_STORIES_URL,
  HACKER_NEWS_JOB_STORIES_URL,
  HACKER_NEWS_NEW_STORIES_URL,
  HACKER_NEWS_SHOW_STORIES_URL,
  HACKER_NEWS_TOP_STORIES_URL
} from '../constants/hackerNewsApiEndpoints';

describe('FrontPage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockedIds = [1, 2];
  const mockedDataFromIds = [{
    url: '/',
    title: 'test title',
    by: 'test author',
    score: 2,
    kids: [1, 2, 3],
    time: 1624206113
  },
  {
    url: '/',
    title: 'test title',
    by: 'test author',
    score: 2,
    kids: [1, 2, 3],
    time: 1624206113
  }];

  it('should render initial layout', () => {
    const component = shallow(<FrontPage/>);
    expect(component).toMatchSnapshot();
  });

  it('should display no stories found', async () => {
    jest.spyOn(api, 'fetchIdsFromHackerNewsApi').mockImplementation(() => Promise.resolve([]));

    render(<FrontPage/>);

    const node = await waitFor(() => screen.getByText(dictionary.frontPage.noStoriesFound));

    expect(node.textContent).toEqual(dictionary.frontPage.noStoriesFound);
  });

  it('should render story cards', async () => {
    jest.spyOn(api, 'fetchIdsFromHackerNewsApi').mockImplementation(() => Promise.resolve(mockedIds));
    jest.spyOn(api, 'fetchDataFromIds').mockImplementation(() => Promise.resolve(mockedDataFromIds));

    await act(async () => {
      render(<FrontPage/>);
    });

    const node = await waitFor(() => screen.getAllByText('test title'));

    expect(api.fetchIdsFromHackerNewsApi).toHaveBeenCalled();
    expect(api.fetchDataFromIds).toHaveBeenCalled();
    expect(node).toHaveLength(2);
  });

  [
    {button: dictionary.frontPage.top, url: HACKER_NEWS_TOP_STORIES_URL},
    {button: dictionary.frontPage.new, url: HACKER_NEWS_NEW_STORIES_URL},
    {button: dictionary.frontPage.ask, url: HACKER_NEWS_ASK_STORIES_URL},
    {button: dictionary.frontPage.best, url: HACKER_NEWS_BEST_STORIES_URL},
    {button: dictionary.frontPage.jobs, url: HACKER_NEWS_JOB_STORIES_URL},
    {button: dictionary.frontPage.show, url: HACKER_NEWS_SHOW_STORIES_URL}
  ].forEach((testData) => {
    it(`should call the ${testData.url} stories api`,  async () => {
      jest.spyOn(api, 'fetchIdsFromHackerNewsApi').mockImplementation(() => Promise.resolve(mockedIds));
      jest.spyOn(api, 'fetchDataFromIds').mockImplementation(() => Promise.resolve(mockedDataFromIds));

      await act(async () => {
        render(<FrontPage/>);
        userEvent.click(screen.getByText(testData.button));
      });

      expect(api.fetchIdsFromHackerNewsApi).toHaveBeenCalled();
      expect(api.fetchIdsFromHackerNewsApi).toHaveBeenCalledWith(testData.url);
    });
  });

  it('should catch an error and display it when an api call is not OK', async () => {
    jest.spyOn(api, 'fetchIdsFromHackerNewsApi').mockImplementation(() => Promise.reject(new Error(dictionary.api.error + 'Response code: 401')));

    await act(async () => {
      render(<FrontPage/>);
    });

    const node = await waitFor(() => screen.getByText(dictionary.api.error + 'Response code: 401'));

    expect(node).toBeVisible();
  });
});
