import React, {useEffect, useState} from 'react';
import './FrontPage.scss';
import {BasicLayout} from '../layouts/basicLayout/BasicLayout';
import {api} from '../services/api';
import {StoryCard} from '../components/storyCard/StoryCard';
import {Pagination} from '@material-ui/lab';
import {Button} from '@material-ui/core';
import {dictionary} from '../lang/en';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {
  HACKER_NEWS_ASK_STORIES_URL,
  HACKER_NEWS_BEST_STORIES_URL,
  HACKER_NEWS_JOB_STORIES_URL,
  HACKER_NEWS_NEW_STORIES_URL,
  HACKER_NEWS_SHOW_STORIES_URL,
  HACKER_NEWS_TOP_STORIES_URL
} from '../constants/hackerNewsApiEndpoints';

export const FrontPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  useEffect(() => {
    getIdsFromHackerNewsApi(HACKER_NEWS_TOP_STORIES_URL);
  }, []);

  const handlePageChange = (data, page) => {
    setLoading(true);
    setPage(page);
    api.fetchDataFromIds(data, page)
      .then((data) => {
        setStories(data);
        resetDivScrollbar();
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const getIdsFromHackerNewsApi = (url) => {
    setLoading(true);
    api.fetchIdsFromHackerNewsApi(url)
      .then((data) => {
        setStoryIds(data);
        return data;
      })
      .then((data) => {
        if (data && data.length > 0) {
          handlePageChange(data, 1);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  /**
   * Access div container overflow and reset position when the page is changed.
   */
  const resetDivScrollbar = () => {
    document.querySelector('._front-page-container').scrollTo(0, 0);
  };

  return (
    <BasicLayout loading={loading} error={error} hackerNewsBanner={true}>
      <div className='_front-page-data-type-selection'>
        <div className='_front-page-data-type-selection-top-button'>
          <Button variant='contained' color='primary' onClick={() => getIdsFromHackerNewsApi(HACKER_NEWS_TOP_STORIES_URL)}>
            {dictionary.frontPage.top}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-new-button'>
          <Button variant='contained' color='primary' className='_new-button' onClick={() => getIdsFromHackerNewsApi(HACKER_NEWS_NEW_STORIES_URL)}>
            {dictionary.frontPage.new}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-ask-button'>
          <Button variant='contained' color='primary' onClick={() => getIdsFromHackerNewsApi(HACKER_NEWS_ASK_STORIES_URL)}>
            {dictionary.frontPage.ask}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-show-button'>
          <Button variant='contained' color='primary' onClick={() => getIdsFromHackerNewsApi(HACKER_NEWS_SHOW_STORIES_URL)}>
            {dictionary.frontPage.show}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-jobs-button'>
          <Button variant='contained' color='primary' onClick={() => getIdsFromHackerNewsApi(HACKER_NEWS_JOB_STORIES_URL)}>
            {dictionary.frontPage.jobs}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-best-button'>
          <Button variant='contained' color='primary' onClick={() => getIdsFromHackerNewsApi(HACKER_NEWS_BEST_STORIES_URL)}>
            {dictionary.frontPage.best}
          </Button>
        </div>
      </div>
      <div className='_front-page-container'>
        {stories.length > 0 ? stories.map((story, index) => {
          /* some story ids could return null */
          if (story) {
            return (
              <div key={`card-spacing-${story.id}-${index}`} className='_card-spacing'>
                <StoryCard key={`story-card-${story.id}-${index}`} data={story}/>
              </div>
            );
          }
        }) : stories.length === 0 && !loading && (
          <div className='_no-stories-found-container'>
            <ErrorOutlineIcon className='no-stories-found-icon'/>
            <h3 className='no-stories-found'>
              {dictionary.frontPage.noStoriesFound}
            </h3>
          </div>
        )}
      </div>
      <div className='_pagination-spacing'>
        <Pagination
          onChange={(event, page) => handlePageChange(storyIds, page)}
          count={storyIds.length}
          page={page}
          siblingCount={1}
          boundaryCount={1}
        />
      </div>
    </BasicLayout>
  );
};
