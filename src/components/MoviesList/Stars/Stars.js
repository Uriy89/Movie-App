import React, { Component } from 'react';
import { Rate } from 'antd';

export default class Stars extends Component {
  state = {
    rating: this.props.rating
  };

  changeRating = (e) => {
    this.setState({ rating: e });
    this.props.rateFilm(e);
  };

  render() {
    const { rating } = this.state;
    return (
      <Rate
        allowHalf
        count={10}
        style={{ fontSize: '16px' }}
        value={rating}
        onChange={(e) => this.changeRating(e)}
      />
    );
  }
}
