// src/containers/App/index.js

import React, { Component } from 'react';
import * as firebase from 'firebase';
import config from './firebase-config';

class App extends Component {
	constructor(props) {
		super(props);

		firebase.initializeApp(config);
		
		this.state = {
			posts: [],
			loading: true
		};
	}

	componentWillMount() {
		let postsRef = firebase.database().ref('posts');

		let _this = this;

		postsRef.on('value', function(snapshot) {
			console.log(snapshot.val());

			_this.setState({
				posts: snapshot.val(),
				loading: false
			});
		});
	}

  render() {
    return (
      <div className="App">
        {this.props.children && React.cloneElement(
        	this.props.children, {
        		firebase: firebase.database(),
        		posts: this.state.posts,
        		loading: this.state.loading
        	})}
      </div>
    );
  }
}

export default App;