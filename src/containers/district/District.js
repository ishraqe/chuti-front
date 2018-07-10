import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import Aux from '../../hoc/aux';


class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      division: '',
      name: '',
      desc: '',
      guide: '',
      files: [],
      divisionsList: null,
      imageUrls: []
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
  
  componentDidMount() {
    firebase.database().ref('divisions/')
    .on('value', snapshot => { 
      this.setState({
        divisionsList: snapshot.val()
      });
     });
  }
  returnDivi = () => {
    const divs = this.state.divisionsList;
    let items = [];     
    for (var key in divs) {
      items.push(<option key={key} value={key}>{divs[key].name}</option>)
    }
    return items;
  }
  handleDivisionChange = (event) => {
    this.setState({
      division: event.target.value
    })
  }
  handleDescChange = (event) => {
    this.setState({
      desc: event.target.value
    })
  }
  handleGuideChange = (event) => {
    this.setState({
      guide: event.target.value
    })
  }
  handleNameChange = (event) => {
    console.log(event.target.value);
    this.setState({name: event.target.value});
  }
  handleUploadSuccess = event => {
    const { files } = event.target;
    const filesToStore = [];
    for (let i = 0; i < files.length; i++) {
        filesToStore.push(files[i])
    }
    console.log(filesToStore);
    // files.forEach(file => filesToStore.push(file));
    this.setState({ files: filesToStore });
  };

  handleSubmit = (event)=> {
    event.preventDefault();
    const files = this.state.files;
    console.log(files, 'aavatars');
  
    for (let index = 0; index < files.length; index++) {
      var storageRef = firebase.storage().ref('places/' + files[index].name);
      storageRef.put(files[0])
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
      })
    .then(downloadURL => {
       console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
       return downloadURL;
    })
    .catch(error => {
       // Use to signal error if something goes wrong.
       console.log(`Failed to upload file and get link - ${error}`);
    });
    }
    // firebase
    //   .storage()
    //   .ref("images")
    //   .child(avatars)
    //   .getDownloadURL()
    //   .then(url => {
    //       console.log(url);
    //       firebase.database().ref('divisions/').push({
    //         name: this.state.name,
    //         thumb: url
    //       })
    //       .then(res => {
    //         this.state.name = '';
    //         this.state.avatar = '';
    //       })
    //       .catch(err => console.log(err));
    //   });
  }
  render() {    
    return (
      <Aux {...this.props}>
        <div className="jumbotron">
          <div style={ style.myContainer}>
            <div className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label >Divisions list:</label>
                  <select 
                    className="form-control" 
                    id="sel1"
                    value={this.state.division} 
                    onChange={this.handleDivisionChange}
                  >
                    {this.returnDivi()}
                  </select>
                </div> 
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
                  <label>Description</label>
                  <textarea 
                    type="text" className="form-control"  
                    placeholder="Enter Divisions Name"
                    value={this.state.desc} 
                    onChange={this.handleDescChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <FileUploader
                    accept="image/*"
                    name="places"
                    multiple
                    randomizeFilename
                    onChange={this.handleUploadSuccess}
                  />
                </div>
                <div className="form-group">
                  <label>Guide</label>
                  <textarea 
                    type="text" className="form-control"  
                    placeholder="Enter Divisions Name"
                    value={this.state.guide} 
                    onChange={this.handleGuideChange}
                  />
                </div>
                <button disabled={!this.state.name && this.state.isUploading === false} type="submit" className="btn btn-primary">Submit</button>
              </form>
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

export default Places;
