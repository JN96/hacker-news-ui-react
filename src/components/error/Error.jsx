import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

export const Error = ({
  message
}) => {
  return (
    <div>
      <p className='_error'>{message}</p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string
};
