import React from 'react';
import styles from './Content.css';
import UserList from '../List/List';
import App from "../../../App";

export default class Content extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.content}>
                    <img height={250} resizemode={'contain'} alt="" src="https://s3.amazonaws.com/fighter-pilot-test/Dad+Cockpit.jpg"/>
                    <img height={250} resizemode={'contain'} alt="" src="https://s3.amazonaws.com/fighter-pilot-test/sandman.jpg" />
                    <img height={250} resizemode={'contain'} alt="" src="https://s3.amazonaws.com/fighter-pilot-test/Dad+p-47.jpg" />
                </div>
                <UserList showComp={this.props.showComp} />
            </div>
        );
    }
}
