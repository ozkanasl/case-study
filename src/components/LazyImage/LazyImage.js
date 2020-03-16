import React, { Component } from "react";
import PropTypes from "prop-types";

import stockImage from "../../assets/images/stock-image.gif";

class LazyImage extends Component {
  constructor(props) {
    super(props);
    this.state = { loadImage: false };
    this.observer = null;
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(entries => {
      const image = entries[0];
      if (image.isIntersecting) {
        this.setState({ loadImage: true });
        this.observer.disconnect();
      }
    });

    this.observer.observe(this.imgTag);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { src, alt, ...props } = this.props;

    return (
      <img
        src={this.state.loadImage ? src : stockImage}
        alt={alt || ""}
        ref={elem => (this.imgTag = elem)}
        {...props} />
    );
  }
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.number.isRequired
};

export default LazyImage;
