import React from 'react';
import styles from './Profile.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return(
        <div className={styles.profile}>
            <div className={styles.title}>Profile: Milton W. Sanders</div>

            <div className={styles.container}>
                <div className={styles.mainSection}>
                    <div className={styles.sideSection}>
                        <img
                            height={250}
                            resizemode={'contain'}
                            alt=""
                            src="https://s3.amazonaws.com/fighter-pilot-test/Dad+Cockpit.jpg"
                        />
                        <div className={styles.otherStuff}>
                            <p>Aliquam erat volutpat. Vivamus fringilla consequat lorem non varius.
                            </p>
                        </div>
                        <div>
                            <ul><img height={50} resizemode={'contain'} src="./assets/2nd_L.png" /></ul>
                            <ul><img height={50} resizemode={'contain'} src="./assets/1st_L.png" /></ul>
                            <ul><img height={50} resizemode={'contain'} src="./assets/captain.png" /></ul>
                            <ul><img height={50} resizemode={'contain'} src="./assets/major.png" /></ul>
                            <ul><img height={50} resizemode={'contain'} src="./assets/lt_colonel.png" /></ul>
                        </div>
                    </div>
                    <div className={styles.bioSection}>
                        <div className={styles.bio}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac nunc faucibus, tristique turpis a, sodales erat. In hac habitasse platea dictumst. Nam volutpat, libero ut dignissim elementum, urna sapien interdum turpis, quis tempus urna purus ac lectus. Duis id purus tincidunt, commodo dui id, tincidunt nibh. In varius, velit vel ultricies bibendum, purus quam faucibus mi, fermentum aliquam nibh augue nec quam. Praesent convallis enim a scelerisque tempor. Praesent vitae finibus purus, ut commodo leo. Duis egestas sollicitudin congue. Phasellus vulputate, urna a porta viverra, lectus augue bibendum nisl, at ullamcorper nulla lacus id ligula. Ut euismod tellus vel eros pretium, ut mollis dolor consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam a diam neque. Fusce ut sem non tellus sagittis tincidunt eget a lacus. Ut quis purus urna.

                            Proin lobortis id neque id finibus.</p>

                            <p>Fusce non purus in libero tristique convallis. Duis et varius nisl, eget consectetur metus. Cras ligula turpis, pretium quis nibh vitae, eleifend consequat velit. Mauris fermentum id urna id condimentum. Phasellus in quam mollis, luctus sapien eget, suscipit velit. Nulla et accumsan dolor, eu efficitur enim. In aliquam faucibus est sit amet tempus. Sed bibendum vestibulum arcu, ut congue neque scelerisque nec. Duis neque nisl, dignissim nec mattis et, sollicitudin at ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris non accumsan est, tempor ornare libero. Sed rutrum velit nisi, venenatis ultricies magna suscipit sit amet.</p>

                            <p>Aliquam erat volutpat. Vivamus fringilla consequat lorem non varius. Nunc semper risus a mauris dictum, bibendum malesuada dui suscipit. Donec finibus tempus volutpat. In euismod nibh elit, tempor dignissim lacus dignissim quis. Morbi rutrum leo nec bibendum interdum. Vivamus urna ex, varius eu lectus et, blandit convallis elit. Proin fringilla vulputate elementum. Curabitur mattis in arcu sed commodo. Pellentesque condimentum hendrerit arcu vitae egestas.
                            </p>
                        </div>
                        <div className={styles.awards}>
                            <img height={150} resizemode={'contain'} alt="Distinguished Flying Cross" src="./assets/dfc.png" />
                            <img height={150} resizemode={'contain'} alt="Air Medal" src="./assets/air_medal.png" />
                            <img height={150} resizemode={'contain'} alt="Croix De Guerre" src="./assets/croix-de-guerre.png" />
                            <img height={150} resizemode={'contain'} src="./assets/croix-de-guerre-ribbon.png" />
                            <img height={150} resizemode={'contain'} src="./assets/presidential_unit_citation.png" />
                            <img height={150} resizemode={'contain'} src="./assets/belg-forg.png" />
                            <img height={150} resizemode={'contain'} src="./assets/silver_oak.png" />
                            <img height={150} resizemode={'contain'} src="./assets/bronze_oak.png" />
                        </div>
                        <div className={styles.backButton} onClick={() => this.props.switchView('Content')}>BACK</div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}
