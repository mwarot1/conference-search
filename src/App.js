import React, { Component } from "react";
import "./App.css";
import Navbar from "./component/navbar";
import IEEE from "./component/IEEE";
import YouTube from "./component/Youtube";
import Twitter from "./component/Twitter";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import $ from "jquery";
import "./user.css";
class App extends Component {
  state = {
    query: "",
    onClick: false
  };
  /*This function will tell the other component that the search has been clicked.
  And it will prevent the form to redirect to page or refresh.*/
  handleClick = e => {
    e.preventDefault();
    this.setState({ query: $("#q").val() });
    this.setState({ onClick: true });
  };
  render() {
    return (
      <div>
        <Navbar /> {/*Load Navbar component*/}
        <div style={{ marginTop: 4 + "rem" }} /> {/*Top Spacing */}
        <div className="container text-center" id="home">
          {/*div of the rest component*/}
          <form
            className="form-inline my-2 my-lg-0 justify-content-center"
            onSubmit={this.handleClick}
          >
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              id="q"
              required
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <IEEE clicked={this.state.onClick} q={this.state.query} />
          <YouTube clicked={this.state.onClick} q={this.state.query} />
          <Twitter clicked={this.state.onClick} q={this.state.query} />
        </div>
      </div>
    );
  }
}

export default App;
