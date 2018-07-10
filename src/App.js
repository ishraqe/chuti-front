import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import Aux from './hoc/aux';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    };
    const config = {
      apiKey: "AIzaSyARtwl6wJgu3NYGxZcMTlo7gAcHSBNQ-eg",
      authDomain: "chuti-acdbc.firebaseapp.com",
      databaseURL: "https://chuti-acdbc.firebaseio.com",
      projectId: "chuti-acdbc",
      storageBucket: "chuti-acdbc.appspot.com",
      messagingSenderId: "683534495402"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      console.log('did');
    }
  }
  handleNameChange = (event) => {
    console.log(event.target.value);
    this.setState({name: event.target.value});
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    console.log(filename);
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    console.log(this.state.avatar);
  };

  handleSubmit = (event)=> {
    event.preventDefault();
    const avatars = this.state.avatar;
    console.log(avatars, 'aavatars', this.state.avatar);
    firebase
      .storage()
      .ref("images")
      .child(avatars)
      .getDownloadURL()
      .then(url => {
          console.log(url);
          firebase.database().ref('divisions/').push({
            name: this.state.name,
            thumb: url
          })
          .then(res => {
            this.state.name = '';
            this.state.avatar = '';
          })
          .catch(err => console.log(err));
      });
  }

  render() {
    return (
      <Aux {...this.props}>
        <div className="jumbotron">
          <div style={ style.myContainer}>
            <div className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" className="form-control"  
                    placeholder="Enter Divisions Name"
                    value={this.state.name} 
                    onChange={this.handleNameChange}
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </div>
                <button disabled={!this.state.name && this.state.isUploading === false} type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
            <div className="col-md-6">
              lorem10
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}
const style = {
  myContainer: {
    display: 'flex'
  }
}

export default App;
