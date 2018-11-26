import React from 'react';
import styles from './App.css';

import Header from './components/Header/Header';
import Content from './components/Content/Default/Content';
import Profile from './components/Content/Profile/Profile';

const components = {
    Content: <Content />,
    Profile: <Profile />,
};


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: components.Content,
        };
    }

    showComponent() {
        this.setState({ view: 'Content' });
    }

    handleListClick(item) {
        // event.preventDefault();
        // set the displayComponent
        console.log(item);
        // alert(item.key);
        this.setState({
            view: 'Profile',
        });
    }
    
    handleViewSwitch(view) {
        console.log(view);
        this.setState({
            view: view,
        });
    }

    renderComponent() {
        switch (this.state.view) {
        case 'Content':
            return <Content showComp={this.handleListClick.bind(this)} />;
        case 'Profile':
            return <Profile switchView={this.handleViewSwitch.bind(this)} />;
        default :
            return <Content showComp={this.handleListClick.bind(this)} />;
        }
    }

    render() {
        return (
          <div>
            <Header />
            { this.renderComponent() }
          </div>
        );
    }
}
