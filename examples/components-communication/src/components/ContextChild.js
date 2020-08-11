import React from 'react';

import ContextButton from '../components/ContextButton';
import ContextWelcomeText from './ContextWelcomeText';

/**
 * No usa el contexto directamente, pero si sus hijos.
 */

export default class ContextChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mensaje: '',
    };
  }
  render() {
    return (
      <div className="border border-primary p-4">
        <h3>Context Child</h3>
        <ContextWelcomeText />
        <ContextButton name={'context button'} />
      </div>
    );
  }
}
