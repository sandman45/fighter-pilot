import React from 'react';
import styles from './List.css';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            person: [
                {
                    key: 1,
                    name: { first: 'test', last: 'test' },
                    email: 'test@test.com' },
                {
                    key: 2,
                    name: { first: 'test2', last: 'test2' },
                    email: 'test2@test.com' },
            ] };
    }

    componentDidMount() {
        this.UserList();
    }

    UserList() {
        // $.getJSON('https://randomuser.me/api/')
        // .then(({ results }) => this.setState({ person: results }));
    }

    render() {
        const persons = this.state.person.map((item) => (
          <div key={item.key} className={styles.item}>
            <h1>{ item.name.first }</h1>
            <span>{ item.cell }, { item.email }</span>
          </div>
        ));

        return (
          <div id="layout-content" className={styles.listContainer}>
            <div>{ persons }</div>
          </div>
        );
    }
}
