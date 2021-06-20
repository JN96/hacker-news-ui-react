import React, {useEffect, useState} from 'react';
import './FrontPage.scss';
import {BasicLayout} from '../layouts/basicLayout/BasicLayout';
import {api} from '../services/api';
import {StoryCard} from '../components/storyCard/StoryCard';
import {Pagination} from '@material-ui/lab';
import {Button} from '@material-ui/core';
import {dictionary} from '../lang/en';

export const FrontPage = () => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    api.fetchTopStories()
      .then((data) => {
        setStoryIds(data);
        setLoading(false);
        return data;
      })
      .then((data) => {
        handlePageChange(data, 1);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (data, page) => {
    setPage(page);
    setLoading(true);
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

  const getNewStories = () => {
    setLoading(true);
    api.fetchNewStories()
      .then((data) => {
        setStoryIds(data);
        setLoading(false);
        return data;
      })
      .then((data) => {
        handlePageChange(data, 1);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const getAskStories = () => {
    setLoading(true);
    api.fetchAskStories()
      .then((data) => {
        setStoryIds(data);
        setLoading(false);
        return data;
      })
      .then((data) => {
        handlePageChange(data, 1);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const getShowStories = () => {
    setLoading(true);
    api.fetchShowStories()
      .then((data) => {
        setStoryIds(data);
        setLoading(false);
        return data;
      })
      .then((data) => {
        handlePageChange(data, 1);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const getJobStories = () => {
    setLoading(true);
    api.fetchJobStories()
      .then((data) => {
        setStoryIds(data);
        setLoading(false);
        return data;
      })
      .then((data) => {
        handlePageChange(data, 1);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const getBestStories = () => {
    setLoading(true);
    api.fetchBestStories()
      .then((data) => {
        setStoryIds(data);
        setLoading(false);
        return data;
      })
      .then((data) => {
        handlePageChange(data, 1);
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
        <div className='_front-page-data-type-selection-button'>
          <Button variant='contained' color='primary' key='here-i-am' onClick={() => getNewStories()}>
            {dictionary.frontPage.new}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-button'>
          <Button variant='contained' color='primary' onClick={() => getAskStories()}>
            {dictionary.frontPage.ask}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-button'>
          <Button variant='contained' color='primary' onClick={() => getShowStories()}>
            {dictionary.frontPage.show}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-button'>
          <Button variant='contained' color='primary' onClick={() => getJobStories()}>
            {dictionary.frontPage.job}
          </Button>
        </div>
        <div className='_front-page-data-type-selection-button'>
          <Button variant='contained' color='primary' onClick={() => getBestStories()}>
            {dictionary.frontPage.best}
          </Button>
        </div>
      </div>
      <div className='_front-page-container'>
        {stories.length > 0 ? stories.map((story, index) => {
          return (
            <div key={`card-spacing-${story.is}-${index}`} className='_card-spacing'>
              <StoryCard key={`story-card-${story.id}-${index}`} data={story}/>
            </div>
          );
        }) : !loading && (
          <div>
            No stories found!
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
