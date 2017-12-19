import React from 'react';
import PropTypes from 'prop-types';
import ImmutableProptypes from 'react-immutable-proptypes';
import classnames from 'classnames';

import {
  Modal,
} from 'react-bootstrap';

import style from './style.scss';

function Display(props) {
  const { className, error, actions } = props;
  const wrapperClass = classnames({
    [style.wrapper]: true,
    [className]: !!props.className,
  });

  const isError = error.get('isError');
  const errorType = error.get('type');
  const errorMessage = error.get('message');

  return (
    <section className={wrapperClass}>
      <Modal
        className={style.modal}
        show={isError}
        onHide={actions.clearError}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error Centre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`Error Type: ${errorType}`}</p>
          <p>{`Error Message: ${errorMessage}`}</p>
        </Modal.Body>

      </Modal>
    </section>
  );
}

Display.propTypes = {
  className: PropTypes.string,
  error: ImmutableProptypes.map,
  actions: PropTypes.object,
};

export default Display;
