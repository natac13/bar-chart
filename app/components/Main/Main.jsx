import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';

import style from './style.scss';

function Main(props) {
  const {
    actions,

  } = props;
  console.log('main Props', props);

  const wrapperClass = classnames({
    [style.wrapper]: true,
  });

  return (
    <div className={wrapperClass}>
        Hello!!!
    </div>
  );
}


Main.propTypes = {
  appName: PropTypes.string,
  actions: PropTypes.object,

};

export default Main;
