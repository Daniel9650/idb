import React, { Component } from 'react';

import { Col, Row } from 'reactstrap';
import MultiFilter from './filters/MultiFilter.js';
import NameFilter from './filters/NameFilter.js';
import GeneralFilter from './filters/GeneralFilter.js';
import Sort from './filters/Sort.js';
import topicSuggestions from '../../data/topicSuggestions.js';

class MusicFilters extends Component {

   constructor(props){
      super(props);

      this.state={
         artistFilter: {},
         albumFilter: {},
         topicFilters: [],
         dateFilter: {},
         nameFilter: {},
         sort: 'title_asc',
         isPreLoading: false,
         nameSent: false,
         sortSent: false,
         artistSent: false,
         albumSent: false,
         topicSent: false,
         dateSent: false
      }

      this.setArtistFilter = this.setArtistFilter.bind(this);
      this.setAlbumFilter = this.setAlbumFilter.bind(this);
      this.setTopicFilter = this.setTopicFilter.bind(this);
      this.setDateFilter = this.setDateFilter.bind(this);
      this.combineFilters = this.combineFilters.bind(this);
      this.setSort = this.setSort.bind(this);
      this.setNameFilter = this.setNameFilter.bind(this);
      this.allFiltersSent = this.allFiltersSent.bind(this);

   }

   setNameFilter(query, isPreLoading = false){
      var filter = {};
      if(query != null)
         filter = {filter:"song_name", query:query};
      this.setState({nameFilter: filter, isPreLoading: isPreLoading, nameSent: true}, this.combineFilters);
   }


   setSort(option, isPreLoading = false){
      var sort = "title_asc";
      if(option != null)
         sort = option.value;
      this.setState({sort: sort, isPreLoading: isPreLoading, sortSent: true}, this.combineFilters);
   }

   setArtistFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"artists", query:option.value};
      this.setState({artistFilter: filter, isPreLoading: isPreLoading, artistSent: true}, this.combineFilters);
   }

   setAlbumFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"album", query:option.value};
      this.setState({albumFilter: filter, isPreLoading: isPreLoading, albumSent: true}, this.combineFilters);
   }

   setTopicFilter(option, isPreLoading = false){
      var filters = [];
      if(option != null){
          for(var i = 0; i < option.length; i++){
            filters.push({filter:"topics", query:option[i].value});
          }
      }
      this.setState({topicFilters: filters, isPreLoading: isPreLoading, topicSent: true}, this.combineFilters);
   }

   setDateFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"release_date", query:option.value};
      this.setState({dateFilter: filter, isPreLoading: isPreLoading, dateSent: true}, this.combineFilters);
   }

   combineFilters(){
      if(this.allFiltersSent()){
         var allFilters = [];
         if(this.state.artistFilter.filter != null)
            allFilters.push(this.state.artistFilter);
         if(this.state.albumFilter.filter != null)
            allFilters.push(this.state.albumFilter);
         if(this.state.dateFilter.filter != null)
            allFilters.push(this.state.dateFilter);
         if(this.state.topicFilters.length !== 0){
            for(var i = 0; i < this.state.topicFilters.length; i++)
              allFilters.push(this.state.topicFilters[i]);
         }
         if(this.state.nameFilter.filter != null)
            allFilters.push(this.state.nameFilter);

         this.props.setFilters(allFilters, this.state.sort, this.state.isPreLoading);
      }
      this.setState({isPreLoading: false});
   }

   allFiltersSent(){
      const { nameSent, sortSent, artistSent, albumSent, topicSent, dateSent } = this.state;
      return nameSent && sortSent && artistSent && albumSent && topicSent && dateSent;
   }

   render(){
     var sortOptions = [
           {value: 'title_asc', label: 'Title A-Z'},
           {value: 'title_desc', label: 'Title Z-A'},
           {value: 'release_year_desc', label: 'Year 2018-1900'},
           {value: 'release_year_asc', label: 'Year 1900--2018'}
      ];
      return(
         <div>
            <Row>
               <Col xs="7">
                  <h5>Song Title:</h5>
                  <NameFilter setFilter={this.setNameFilter} />
               </Col>
               <Col xs="5">
                  <h5 className="filter-label">Topic:</h5>
                  <MultiFilter setFilter={this.setTopicFilter} options={topicSuggestions} arg="topic"/>
               </Col>
            </Row>
            <Row>

               <Col xs="4">
                  <h5 className="filter-label">Artist:</h5>
                  <GeneralFilter setError= {this.props.setError} setFilter={this.setArtistFilter} arg="artist" apiCall="artists" />
               </Col>
               <Col xs="4">
                  <h5 className="filter-label">Album:</h5>
                  <GeneralFilter setError= {this.props.setError} setFilter={this.setAlbumFilter} arg="album" apiCall="albums"/>
               </Col>
               <Col xs="2">
                  <h5 className="filter-label">Release Year:</h5>
                  <GeneralFilter setError= {this.props.setError} setFilter={this.setDateFilter} arg="year" apiCall="song_years"/>
               </Col>
               <Col xs="2">
                  <h5 className="filter-label">Sort By:</h5>
                  <Sort setFilter={this.setSort} options={sortOptions}/>
               </Col>
            </Row>
            <hr className="divider"/>
         </div>
      );
   }
}

export default MusicFilters;
