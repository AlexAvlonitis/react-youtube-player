import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSeach from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'YOUR YOUTUBE API KEY';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.fetchVideos('cats')
  }

  fetchVideos(searchTerm) {
    YTSeach({key: API_KEY, term: searchTerm}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    });
  }

  render() {
    const fetchVideos = _.debounce((searchTerm) => { this.fetchVideos(searchTerm) }, 300)

    return (
      <div>
        <SearchBar
          onSearchTermChange={fetchVideos}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

const container = document.querySelector('.container')
ReactDOM.render(
  <App />,
  container
);
