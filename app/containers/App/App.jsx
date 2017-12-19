import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions';
import NavBar from '../../components/NavBar/';
import Display from '../../components/Display/';
import Main from 'Components/Main/';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.props.actions.getData();

  }
  componentWillMount() {

  }

  render() {
    const { appName, actions, error, children } = this.props;
    return (
      <div>
        <NavBar actions={actions} appName={appName} />
        <Display error={error} actions={actions} />
        <Main {...this.props} />
      </div>
    );
  }
}

App.propTypes = {
  form: ImmutablePropTypes.map,
  error: ImmutablePropTypes.map,
  actions: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
  children: PropTypes.node,
};

//  Redux Connection
function mapStateToProps(state) {
  return {
    appName: `Natac's Bar Chart`,
    error: state.get('error'),
    data: state.get('data')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
