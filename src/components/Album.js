import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar'


class Album extends Component {
  constructor(props){
    super(props);

      const album = albumData.find( album => {
          return album.slug === this.props.match.params.slug
      });

      this.state = {
        album: album,
        currentSong: album.songs[0],
        isPlaying: false,
        currentTime: 0,
        duration: album.songs[0].duration,
        volume: 0.50

      };

      this.audioElement = document.createElement('audio');
      this.audioElement.src = album.songs[0].audioSrc;
      this.audioElement.volume = this.state.volume;
  }

  componentDidMount(){
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({volume: this.audioElement.volume});
      }

    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
  this.audioElement.src = null;
  this.audioElement.removeEventListner('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.removeEventListner('durationchange', this.eventListeners.durationchange);
  this.audioElement.removeEventListner('volumechange', this.eventListeners);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong){
      this.pause();
    } else {
      if(!isSameSong) {this.setSong(song); }
      this.play();
    }
  };

  handlePrevClick(){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick(){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(4, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }
  handleTimeChange(e){
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  handleVolumeChange(e){
    const newVolume = this.audioElement.volume * e.target.value;
    this.setState({volume: newVolume});
  }

  render() {


    return (
      <section className ="album">
        <section id ="album-info">
        <img id ="album-cover-art" src ={this.state.album.albumCover}/>
        <div className = 'album-details'>
          <h1 id ="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
        </div>
      </section>

        <table id ="song-list">
          <colgroup>
            <col id="song-number-column"/>
            <col id="song-title-column"/>
            <col id="song-duration-column"/>
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) => {
                return(
                  <tr className ="song" key= {index} onClick ={() => this.handleSongClick(song)}>
                    <td className ="song-actions">
                      <button>
                        <span className="song-number">{index+1}</span>
                        <span className={this.state.currentSong.isPlaying ? 'ion-pause' : 'ion-play'}></span>
                      </button>
                    </td>

                    <td className ="song-title">{song.title}</td>
                    <td className ="song-duration">{song.duration}</td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
        <PlayerBar
          isPlaying ={this.state.isPlaying}
          currentSong ={this.state.currentSong}
          currentTime = {this.state.currentTime}
          duration={this.audioElement.duration}
          volume={this.state.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          />
      </section>
    );
  }
}

export default Album;
