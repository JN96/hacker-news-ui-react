import React, {useEffect, useState} from 'react';
import './StoryCardScreen.scss';
import PropTypes from 'prop-types';
import {BasicLayout} from '../../layouts/basicLayout/BasicLayout';
import {Pagination} from '@material-ui/lab';
import {api} from '../../services/api';
import {Utility} from '../../utils/Utility';
import {CommentCard} from '../commentCard/CommentCard';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';

export const StoryCardScreen = ({
  story
}) => {
  const [loading, setLoading] = useState(true);
  const [commentIds, setCommentIds] = useState([]);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  useEffect(() => {
    let transformedCommentIds = Utility.transformData(story.location.state.kids);
    setCommentIds(transformedCommentIds);
    handlePageChange(transformedCommentIds, 1);
  }, []);

  const handlePageChange = (data, page) => {
    setLoading(true);
    setPage(page);
    api.fetchDataFromIds(data, page)
      .then((data) => {
        setComments(data);
        // resetDivScrollbar();
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <BasicLayout loading={loading} error={null} hackerNewsBanner={false}>
      <div className='_story-card-screen-header'>
        <Link to={{pathname: '/'}}>
          <ArrowBack titleAccess='Return' className='_story-card-screen-header-return'/>
        </Link>
        <p className='_story-card-screen-header-title'>{story.location.state.title}</p>
      </div>
      <div className='_story-card-screen-container'>
        {comments.map((comment, index) => {
          return (
            <div key={`card-spacing-${story.id}-${index}`} className='_card-spacing'>
              <CommentCard  key={`comment-card-${comment.id}-${index}`} data={comment}/>
            </div>
          );
        })}
      </div>
      <div className='_pagination-spacing'>
        <Pagination
          onChange={(event, page) => handlePageChange(commentIds, page)}
          count={commentIds.length}
          page={page}
          siblingCount={1}
          boundaryCount={1}
        />
      </div>
    </BasicLayout>
  );
};

StoryCardScreen.propTypes = {
  story: PropTypes.object
};

