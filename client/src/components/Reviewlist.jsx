import React from 'react';
import ReviewlistEntry from './ReviewlistEntry.jsx';

class Reviewlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {Array.from(this.props.data).map(datum => {
          return(
          <ReviewlistEntry data={datum} />
          )}
        )}
        </div>
    )
  }


}
export default Reviewlist;