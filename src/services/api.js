import {dictionary} from '../lang/en';
import {Utility} from '../utils/Utility';

const FETCH_GET_API_CONFIG = {
  cache: 'no-cache',
  crossDomain: true,
  method: 'GET',
  mode: 'cors',
  headers: {'Content-Type': 'application/json'}
};

// https://github.com/HackerNews/API
// https://news.ycombinator.com/

const fetchIdsFromHackerNewsApi = async (api) => {
  let response = await fetch(`https://hacker-news.firebaseio.com/v0/${api}.json?print=pretty`, FETCH_GET_API_CONFIG);

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

export const api = {
  fetchIdsFromHackerNewsApi,
  fetchDataFromIds
};
