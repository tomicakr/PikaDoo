import React, { PureComponent } from 'react';
import NavigationBar from '../components/NavigationBar';

export default function withNavigation(WrappedComponent) {
  return class extends PureComponent {
    render() {
      return (
        <div>
          <Navbar />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}