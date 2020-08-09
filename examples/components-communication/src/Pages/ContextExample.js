import React from 'react';

import LanguageContext, { LanguageList } from '../service/LanguageContext';
import ThemeContext, { themes } from '../service/ThemeContext';
import Child from '../components/ContextChild';

export default class ContextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: '',
      language: LanguageList[0],
      theme: { theme: themes.light, toggleTheme: this.onToggleTheme },
    };
  }
  onChangeLanguage(language) {
    this.setState({ language });
  }
  onToggleTheme = () => {
    let theme =
      this.state.theme.theme === themes.dark ? themes.light : themes.dark;
    this.setState({ theme: { theme, toggleTheme: this.onToggleTheme } });
  };
  render() {
    return (
      <LanguageContext.Provider value={this.state.language}>
        <ThemeContext.Provider value={this.state.theme}>
          <div className="jumbotron">
            <h1 className="display-4">Context</h1>
            <p className="lead">
              Este componente es el padre. Lenguage Seleccionado:
              {this.state.language.language}
            </p>
            {LanguageList.map((l) => {
              const checked = l.code === this.state.language.code;
              return (
                <div
                  key={l.code}
                  className="form-check"
                  style={{
                    color: this.state.theme.theme.foreground,
                    background: this.state.theme.theme.background,
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="languageRadio"
                    id={l.code}
                    value={l.code}
                    onChange={() => {
                      this.onChangeLanguage(l);
                    }}
                    checked={checked}
                  />

                  <label className="form-check-label" htmlFor="exampleRadios1">
                    {l.language}
                  </label>
                </div>
              );
            })}
            <hr className="my-4" />
            <p>
              Los componentes escuchan el contexto. No hay pasaje de parametros
              explicito.
            </p>
            <div className="row">
              <div className="col border border-primary">
                <Child />
              </div>
              <div className="col border border-primary">
                <Child />
              </div>
              <div className="col border border-primary">
                <Child />
              </div>
              <div className="col border border-primary">
                <Child />
              </div>
            </div>
          </div>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    );
  }
}
