import React, { Component } from 'react';
import { Container, Row, CardDeck } from 'reactstrap';
import RelatedCard from './RelatedCard.js';


class CardGrid extends Component {

   constructor(props) {
      super(props);
      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
   }
   createCard(instance) {
      var name = "";
      var id = "";
      if (this.props.type === "Movies") {
         name= instance.movie_name;
         id= instance.movie_id;
      }
      else if (this.props.type === "Music") {
         name= instance.song_name;
         id= instance.song_id;
      }
      else if (this.props.type === "Books") {
         name= instance.book_name;
         id= instance.book_id;
      }
      else {
         name= instance.topic_name;
         id= instance.topic_id;
      }

      return <RelatedCard
         image={instance.poster_url}
         title={name}
         id= {id}
         type={this.props.type}
         />;
   }

   createCards(instances) {
      return instances.map(this.createCard);
   }

   render(props) {
      return (
            <CardDeck>
               {this.createCards(this.props.instances)}
            </CardDeck>
      );
   }
}

export default CardGrid;