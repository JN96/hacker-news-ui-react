import React from 'react';
import {shallow} from 'enzyme';
import {FrontPage} from '../pages/FrontPage';
import {render, screen, act, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {dictionary} from '../lang/en';
import {api} from '../services/api';

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
    render(<FrontPage/>);

    const node = await waitFor(() => screen.getByText(dictionary.frontPage.noStoriesFound));

    expect(node.textContent).toEqual(dictionary.frontPage.noStoriesFound);
  });

  it('should render story cards', async () => {
    jest.spyOn(api, 'fetchTopStories').mockImplementation(() => Promise.resolve(mockedIds));
    jest.spyOn(api, 'fetchDataFromIds').mockImplementation(() => Promise.resolve(mockedDataFromIds));

    await act(async () => {
      render(<FrontPage/>);
    });

    const node = await waitFor(() => screen.getAllByText('test title'));

    expect(api.fetchTopStories).toHaveBeenCalled();
    expect(api.fetchDataFromIds).toHaveBeenCalled();
    expect(node).toHaveLength(2);
  });

  it('should call the new stories api',  async () => {
    jest.spyOn(api, 'fetchNewStories').mockImplementation(() => Promise.resolve(mockedIds));
    jest.spyOn(api, 'fetchDataFromIds').mockImplementation(() => Promise.resolve(mockedDataFromIds));

    await act(async () => {
      render(<FrontPage/>);
      userEvent.click(screen.getByText(dictionary.frontPage.new));
    });

    expect(api.fetchNewStories).toHaveBeenCalled();
  });

  it('should call the ask stories api', async () => {
    jest.spyOn(api, 'fetchAskStories').mockImplementation(() => Promise.resolve(mockedIds));
    jest.spyOn(api, 'fetchDataFromIds').mockImplementation(() => Promise.resolve(mockedDataFromIds));

    await act(async () => {
      render(<FrontPage/>);
      userEvent.click(screen.getByText(dictionary.frontPage.ask));
    });

    expect(api.fetchAskStories).toHaveBeenCalled();
  });

  it('should call the best stories api', async () => {
    jest.spyOn(api, 'fetchBestStories').mockImplementation(() => Promise.resolve(mockedIds));
    jest.spyOn(api, 'fetchDataFromIds').mockImplementation(() => Promise.resolve(mockedDataFromIds));

    await act(async () => {
      render(<FrontPage/>);
      userEvent.click(screen.getByText(dictionary.frontPage.best));
    });

    expect(api.fetchBestStories).toHaveBeenCalled();
  });

  it('should call the job stories api', async () => {
    jest.spyOn(api, 'fetchJobStories').mockImplementation(() => Promise.resolve(mockedIds));
    jest.spyOn(api, 'fetchDataFromIds').mockImplementation(() => Promise.resolve(mockedDataFromIds));

    await act(async () => {
      render(<FrontPage/>);
      userEvent.click(screen.getByText(dictionary.frontPage.jobs));
    });

    expect(api.fetchJobStories).toHaveBeenCalled();
  });

  it('should call the show show stories api', async () => {
    jest.spyOn(api, 'fetchShowStories').mockImplementation(() => Promise.resolve(mockedIds));
    jest.spyOn(api, 'fetchDataFromIds').mockImplementation(() => Promise.resolve(mockedDataFromIds));

    await act(async () => {
      render(<FrontPage/>);
      userEvent.click(screen.getByText(dictionary.frontPage.show));
    });

    expect(api.fetchShowStories).toHaveBeenCalled();
  });

  it('should catch an error and display it when an api call is not OK', async () => {
    jest.spyOn(api, 'fetchTopStories').mockImplementation(() => Promise.reject(new Error(dictionary.api.error + 'Response code: 401')));

    await act(async () => {
      render(<FrontPage/>);
    });

    const node = await waitFor(() => screen.getByText(dictionary.api.error + 'Response code: 401'));

    expect(node).toBeVisible();
  });
});
