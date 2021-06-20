import {dictionary} from '../lang/en';
import {Utility} from '../utils/Utility';

const HACKER_NEWS_API_URL_URL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
const HACKER_NEWS_NEW_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
const HACKER_NEWS_JOB_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty';
const HACKER_NEWS_ASK_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/asktories.json?print=pretty';
const HACKER_NEWS_SHOW_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty';
const HACKER_NEWS_BEST_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty';

const FETCH_GET_API_CONFIG = {
  cache: 'no-cache',
  crossDomain: true,
  method: 'GET',
  mode: 'cors',
  headers: {'Content-Type': 'application/json'}
};

// https://github.com/HackerNews/API
// https://news.ycombinator.com/

const fetchTopStories = async () => {
  let response = await fetch(HACKER_NEWS_API_URL_URL, FETCH_GET_API_CONFIG);

  if (response.ok) {
    const data = await response.json();
    return Utility.transformData(data);
  }

  throw new Error(dictionary.api.error + ` Response code: ${response.status}`);
};

const fetchDataFromIds = async (data, page) => {
  let dataToResolve = undefined;
  data.forEach((pageData) => {
    if (pageData.page === page) {
      dataToResolve = pageData.storyIds.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, FETCH_GET_API_CONFIG)
          .then(response => response.json())
      );
    }
  });
  return await Promise.all(dataToResolve);
};

const fetchNewStories = async () => {
  let response = await fetch(HACKER_NEWS_NEW_STORIES_URL, FETCH_GET_API_CONFIG);

  if (response.ok) {
    const data = await response.json();
    return Utility.transformData(data);
  }

  throw new Error(dictionary.api.error + ` Response code: ${response.status}`);
};

const fetchBestStories = async () => {
  let response = await fetch(HACKER_NEWS_BEST_STORIES_URL, FETCH_GET_API_CONFIG);

  if (response.ok) {
    const data = await response.json();
    return Utility.transformData(data);
  }

  throw new Error(dictionary.api.error + ` Response code: ${response.status}`);
};

const fetchShowStories = async () => {
  let response = await fetch(HACKER_NEWS_SHOW_STORIES_URL, FETCH_GET_API_CONFIG);

  if (response.ok) {
    const data = await response.json();
    return Utility.transformData(data);
  }

  throw new Error(dictionary.api.error + ` Response code: ${response.status}`);
};

const fetchAskStories = async () => {
  let response = await fetch(HACKER_NEWS_ASK_STORIES_URL, FETCH_GET_API_CONFIG);

  if (response.ok) {
    const data = await response.json();
    return Utility.transformData(data);
  }

  throw new Error(dictionary.api.error + ` Response code: ${response.status}`);
};

const fetchJobStories = async () => {
  let response = await fetch(HACKER_NEWS_JOB_STORIES_URL, FETCH_GET_API_CONFIG);

  if (response.ok) {
    const data = await response.json();
    return Utility.transformData(data);
  }

  throw new Error(dictionary.api.error + ` Response code: ${response.status}`);
};

export const api = {
  fetchAskStories,
  fetchBestStories,
  fetchDataFromIds,
  fetchJobStories,
  fetchShowStories,
  fetchTopStories,
  fetchNewStories
};
