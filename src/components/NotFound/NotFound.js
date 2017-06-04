import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="text-center">
          <h1>Page not found</h1>
          <Link to="/">to home</Link>
        </div>
      </div>
    );
  }
}

export default NotFound