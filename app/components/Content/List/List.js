import React from 'react';
import styles from './List.css';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            person: [
                {
                    key: 0,
                    name: {first: 'Milton', middle: 'Wesley', last: 'Sanders'},
                    email: 'msanders@gmail.com',
                    phone: '801-555-5555',
                },
                {
                    key: 1,
                    name: {first: 'Phillip', middle: 'Edward', last: 'Payne'},
                    email: 'pepparis@gmail.com',
                    phone: '801-555-5555',
                },
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
            <span>{ item.phone }, { item.email }</span>
          </div>
        ));

        return (
          <div id="layout-content" className={styles.listContainer}>
            <div>{ persons }</div>
          </div>
        );
    }
}
