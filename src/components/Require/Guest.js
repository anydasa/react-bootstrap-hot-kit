import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  class requireGuest extends React.Component {
    componentWillMount() {
      if (this.props.isAuthenticated) {
        browserHistory.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        browserHistory.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  requireGuest.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(requireGuest);
}
