import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';

import DataWrapper from 'Components/DataWrapper/';

import style from './style.scss';

function Main(props) {
  const {
    actions,
    data,
  } = props;



  const wrapperClass = classnames({
    [style.wrapper]: true,
  });

  return (
    <div className={wrapperClass}>
        <DataWrapper
          actions={actions}
          data={data}
        />
    </div>
  );
}


Main.propTypes = {
  appName: PropTypes.string,
  actions: PropTypes.object,
  data: ImmutablePropTypes.map,
};

export default Main;
