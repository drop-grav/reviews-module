import React from 'react';
import Ratings from 'react-ratings-declarative';
import styles from './OverallReview.css'

class OverallReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: '',
      rating: ''
    }

    this.getData = this.getData.bind(this);
  }

  getData() {
    let data = this.props.data;
    let rating = 0;
    for (let i = 0; i < data.length; i++) {
      rating += data[i].overallRating;
    }
    let average = rating / data.length;

    this.setState({
      total: data.length,
      rating: Number(Math.round(parseFloat(average + 'e' + 2)) + 'e-' + 2).toFixed(2)
    })
  }

  componentDidUpdate(props) {
    if (props !== this.props) {
      this.getData();
    }
  }

  render() {
    return(
      <div className={styles.overall}>
        <span>
          <div>
            {this.state.total} Reviews  <Ratings rating={Number(this.state.rating)} widgetRatedColors="007D8C" widgetDimensions="20px" widgetSpacings="1px">
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
          </div>
        </span>
      </div>
    )
  }
}


export default OverallReview;