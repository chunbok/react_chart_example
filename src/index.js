import React from 'react';
import ReactDOM from 'react-dom';
import {MainFrame} from './mainFrame'
import RootStore from './mobx/RootStore'
import {Provider} from 'mobx-react';

const root = new RootStore();

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
  <Provider root={root}>
    <Main />
  </Provider>
  ,
  document.getElementById('app')
);