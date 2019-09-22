import React from 'react';
import styles from './ReviewSearch.css';

class ReviewSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.search}>
        <form className={styles.searchForm} onSubmit={this.props.handleSubmit}>
          <input id='searchTerm'
            type="text"
            placeholder="Search reviews" className={styles.search} />
        </form>
      </div>
    );
  }
  }

export default ReviewSearch;