import React, { Component } from "react";
import $ from "jquery";

class Navbar extends Component {
  //Function to switch component to dark theme
  switchDark = () => {
    if (!$("body").hasClass("isDark")) {
      $("body").addClass("isDark");
      $("nav").removeClass("navbar-light");
      $("nav").removeClass("bg-light");
      $("nav").addClass("navbar-dark");
      $("nav").addClass("bg-dark");
      $("hr").addClass("isDark");
      $(".card").addClass("bg-dark");
      $(".card").addClass("text-white");
    }
  };
  //Function to switch component to light theme
  switchLight = () => {
    $("body").removeClass("isDark");
    $("nav")
      .removeClass("navbar-dark")
      .removeClass("bg-dark");
    if (!$("nav").hasClass("navbar-light")) {
      $("nav").addClass("navbar-light");
      $("nav").addClass("bg-light");
      $("hr").removeClass("isDark");
      $(".card").removeClass("bg-dark");
      $(".card").removeClass("text-white");
    }
  };
  render() {
    return (
      //Bootstrap NavBar
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navBarToggler"
          aria-controls="navBarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        
        <div className="collapse navbar-collapse" id="navBarToggler">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#home">
                <i className="fa fa-home" style={{ fontSize: 24 }} />
                <span className="d-lg-none"> Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#content">
                <i className="fa fa-google" style={{ fontSize: 24 }} />
                <span className="d-lg-none"> Conference Results</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#YouTube">
                <i className="fa fa-youtube-play" style={{ fontSize: 24 }} />
                <span className="d-lg-none"> Video Results</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#TweetContent">
                <i className="fa fa-twitter" style={{ fontSize: 24 }} />
                <span className="d-lg-none"> Comments</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="float-right"> {/*Button to switch to dark or light theme */}
          <button className="btn btn-light" onClick={this.switchLight}>
            Light
          </button>
          <button className="btn btn-dark" onClick={this.switchDark}>
            Dark
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
