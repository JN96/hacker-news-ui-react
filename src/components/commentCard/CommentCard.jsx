import React from 'react';
import './CommentCard.scss';
import PropTypes from 'prop-types';
import {Utility} from '../../utils/Utility';

export const CommentCard = ({
  data
}) => {
  let formattedDateAndTime = Utility.formatDateAndTime(data.time);

  return (
    <div className='_comment-card'>
      <div className='_comment-card-inner-container'>
        <p className='_comment-card-text'>{data.text}</p>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  data: PropTypes.object
};
