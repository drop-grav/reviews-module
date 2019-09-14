import React from 'react';
import styles from './ReviewlistEntry.css';


class ReviewlistEntry extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className={styles.oneReview}>
        <div className={styles.profile}>
            <div>
              <img className={styles.profilePic} src={this.props.data.custUrl}/>
            </div>
            <div className={styles.nameAndDate}>
              <div className={styles.custName}>
                {this.props.data.custName}
              </div>
              <div className={styles.custDate}>
                {this.props.data.custDate}
              </div>
            </div>
        </div>
          <div className={styles.custReview}>
            {this.props.data.custReview}
          </div>
      </div>
    )
  }
};

export default ReviewlistEntry;