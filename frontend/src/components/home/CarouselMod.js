import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

const items = [
  {
    src: require('../../images/books.jpg'),
    altText: 'Slide 1',
    header: 'Write the Next Bestseller',
    caption: 'Influence society with the power of words.',
    href: '/books',
    button: 'View Books'
  },
  {
    src: require('../../images/music.jpeg'),
    altText: 'Slide 2',
    header: 'Call Out to Audiophiles',
    caption: 'Find out which messages are being listened to.',
    href: '/music',
    button: 'View Songs'
  },
  {
    src: require('../../images/movie_reel.jpg'),
    altText: 'Slide 3',
    header: 'Target Movie Lovers',
    caption: 'Get to know your audience before your next project.',
    href: '/movies',
    button: 'View Movies'
  }
];

class CarouselMod extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="relative-pos"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img  className="carousel-img" src={item.src} alt={item.altText} />
          <div className="carousel-caption">
            <h1 className="slide-header">{item.header}</h1>
            <h3 className="slide-caption">{item.caption}</h3>
            <br />
            <a href={item.href}><button type="button" class="carousel-btn btn btn-primary btn-lg">{item.button}</button></a>
          </div>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default CarouselMod;
