import React from 'react';
import ReactDOM from 'react-dom';
import {MainFrame} from './mainFrame.jsx'

class Main extends React.Component {

  render() {
    return (
      <div>
        <MainFrame />
      </div>
    );
  }
};

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);