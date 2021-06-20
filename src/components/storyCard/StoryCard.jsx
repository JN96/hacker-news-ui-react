import React from 'react';
import './StoryCard.scss';
import Announcement from '@material-ui/icons/Announcement';
import Work from '@material-ui/icons/Work';
import MessageIcon from '@material-ui/icons/Message';
import PollIcon from '@material-ui/icons/Poll';
import LaunchIcon from '@material-ui/icons/Launch';
import PropTypes from 'prop-types';
import {Utility} from '../../utils/Utility';

export const StoryCard = ({
  data
}) => {
  let formattedDateAndTime = Utility.formatDateAndTime(data.time);

  const switchIcon = () => {
    switch (data.type) {
      case 'story':
        return <Announcement titleAccess={data.type}/>;
        break;
      case 'job':
        return <Work titleAccess={data.type}/>;
        break;
      case 'comment':
        return <MessageIcon titleAccess={data.type}/>;
        break;
      case 'poll':
      case 'pollopt':
        return <PollIcon titleAccess={data.type}/>;
        break;
      default:
        return 'Type not available';
        break;
    }
  };

  return (
    <div className='_story-card'>
      <div className='_story-card-inner-container'>
        <a href={data.url} target="_blank" rel="noopener noreferrer" title={data.url}>
          <p className='_story-title'>{`${data.title}`}</p>
          <LaunchIcon className='_story-url-icon' fontSize='small'/>
        </a>
        <div className='_story-card-details-container'>
          <p className='_story-type'>
            {switchIcon()}
          </p>
          <span className='_vertical-line'>|</span>
          <p className='_story-author'>{`Posted by ${data.by}`}</p>
          <span className='_vertical-line'>|</span>
          <p className='_story-score'>{data.score === 1 ? `${data.score} point` : `${data.score} points`}</p>
          <span className='_vertical-line'>|</span>
          {/* Some objects returned no kids array - to my limited knowledge of the HN API, I assume this occurs when no comments have been made on the post...*/}
          <p className='_story-comments'>{data.kids && data.kids?.length === 1 ? `${data.kids?.length} comment` : data.kids?.length > 1 ? `${data.kids?.length} comments` : `No comments yet`}</p>
          <span className='_vertical-line'>|</span>
          <p className='_story-time'>{`Posted on ${formattedDateAndTime.formattedDate} at ${formattedDateAndTime.formattedTime}`}</p>
          <span className='_vertical-line'>|</span>
        </div>
      </div>
    </div>
  );
};

StoryCard.propTypes = {
  data: PropTypes.object
};
