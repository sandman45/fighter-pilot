import React from 'react';
import styles from './List.css';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            person: [
                {
                    key: 0,
                    name: { first: 'test', last: 'test' },
                    email: 'test@test.com' },
                {
                    key: 1,
                    name: { first: 'test2', last: 'test2' },
                    email: 'test2@test.com' },
            ],
            setValue: '',
        };
    }

    componentDidMount() {
        // this.UserList();
    }

    render() {
        const persons = this.state.person.map((item) => (
          <div key={item.key} value={item} className={styles.item} onClick={() => this.props.showComp(item)}>
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
