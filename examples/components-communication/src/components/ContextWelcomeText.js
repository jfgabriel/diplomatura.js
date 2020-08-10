import React from 'react';
import LanguageContext from '../service/LanguageContext';

export default class ContextWelcomeText extends React.Component {
  static contextType = LanguageContext;
  render() {
    const language = this.context;
    let text = 'Bienvenido!';
    if (language.code === 'EN_us') {
      text = 'Welcome!';
    }
    return (
      <div>
        <span>{text}</span>
      </div>
    );
  }
}
