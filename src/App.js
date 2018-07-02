import React, { Component } from 'react';
import Aux from './hoc/aux';


class App extends Component {
  state = {
    name: '',
    file: ''
  }

  handleNameChange = (event) => {
    console.log(event.target.value);
    this.setState({name: event.target.value});
  }

  handleFileChange = (event) => {
    console.log(event.target.value);
    // this.setState({file: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.name);
    console.log(this.state.file);
  }

  render() {
    return (
      <Aux {...this.props}>
        <div className="jumbotron">
          <div className="container">
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
                <input 
                  type="file" className="form-control-file" 
                  value={this.state.file}
                  onChange={this.handleFileChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </Aux>
    );
  }
}

export default App;
