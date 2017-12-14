import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';

import style from './style.scss';

function NavBar(props) {
  const { className, actions, appName } = props;
  const wrapperClass = classnames({
    [style.wrapper]: true,
    [className]: !!props.className,
  });

  return (
    <section className={wrapperClass}>
      <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={() => actions.push('/')}>{appName}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
{/*          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem
                eventKey={1}
                onClick={}
              ></NavItem>
            </Nav>
          </Navbar.Collapse>*/}
        </Navbar>
    </section>
  );
}

NavBar.propTypes = {
  appName: PropTypes.string,
  className: PropTypes.string,
  actions: PropTypes.object.isRequired,
};

export default NavBar;
