import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_type: "", //user can be a hacker, mentor, or organizer
    }

    this.renderPage = this.renderPage.bind(this)
    this.hackerDashboard = this.hackerDashboard.bind(this)
    this.mentorDashboard = this.mentorDashboard.bind(this)
    this.organizerDashboard = this.organizerDashboard.bind(this)
    this.loginScreen = this.loginScreen.bind(this)
  }

  renderPage(type) {
    switch(type) {
      case "hacker":
        return this.hackerDashboard()
      case "mentor":
        return this.mentorDashboard()
      case "organizer":
        return this.organizerDashboard()
      default:
        return this.loginScreen()
    }
  }

  hackerDashboard() {
    return (
      <div>
        <h1>Hacker</h1>
      </div>
    )   
  }

  mentorDashboard() {
    return (
      <div>
        <h1>Mentor</h1>
      </div>
    )  
  }

  organizerDashboard() {
    return (
      <div>
        <h1>Organizer</h1>
      </div>
    )  
  }

  loginScreen() {
    return (
      <div>
        <h1>Login</h1>
      </div>
    )
  }

  render() {
    return (
      <div>{this.renderPage(this.state.user_type)}</div>
    );
  }
}

export default App;
