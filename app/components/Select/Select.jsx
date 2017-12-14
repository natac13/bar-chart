import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import style from './style.scss';

function Select(props) {
  const {
    input,
    label,
    meta: { error, warning, touched },
    options,
  } = props;

  const wrapperClass = classnames({
    [style.wrapper]: true,
    [props.className]: !!props.className,
  });

  // validation state of the input component
  const validationState = touched && (error && 'error') || (warning && 'warning') || null;

  return (
    <section className={wrapperClass}>
      <FormGroup controlId={input.name} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          componentClass="select"
          { ...input }
          { ...props }
        >
        { options.map((option, key) => (
            <option key={key} value={option}>{option}</option>
          ))
        }

        </FormControl>
      </FormGroup>
    </section>
  );
}

Select.propTypes = {
  input: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.array,
};

export default Select;
