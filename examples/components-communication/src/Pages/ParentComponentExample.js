import React from 'react';

import Child from '../components/ParentCommChild';

export default class ParentComponentExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respuestaA: '',
      respuestaB: '',
    };
  }
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Parent Component</h1>
        <p className="lead">
          Este componente es el padre en la comunicacion hijo a hijo
        </p>
        <hr className="my-4" />
        <p>El componente hijo A "llama" al componente hijo B.</p>
        <div className="row">
          <div className="col border border-primary">
            <Child
              text={this.state.respuestaB}
              onSendMessage={(respuestaA) => {
                this.setState({ respuestaA });
              }}
            />
          </div>
          <div className="col border border-primary">
            <Child
              text={this.state.respuestaA}
              onSendMessage={(respuestaB) => {
                this.setState({ respuestaB });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
