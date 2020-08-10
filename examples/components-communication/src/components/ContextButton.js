import React from 'react';
import LanguageContext from '../service/LanguageContext';
import ThemeContext from '../service/ThemeContext';

/**
 * Esta clase accede a dos contextos distintos.
 * El language context. Accedido como this.context.
 * Y el Theme context, accedido como un consumer.
 */
export default class ContextButton extends React.Component {
  static contextType = LanguageContext;
  render() {
    const language = this.context;
    let name = 'Boton cambia tema';
    if (language.code === 'EN_us') {
      name = 'Theme switch Button';
    }
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => {
          console.log(theme);
          return (
            <button
              style={{ color: theme.foreground, background: theme.background }}
              onClick={toggleTheme}
            >
              {name}
            </button>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
