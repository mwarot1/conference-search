import React, { Component } from "react";
import $ from "jquery";
class IEEESearch extends Component {
  //This function will execute on click of search button
  onSearch = () => {
    let searchURL = "https://ieeexploreapi.ieee.org/api/v1/search/articles"; //Search URL for IEEE Search Engine
    const key = process.env.REACT_APP_IEEE; //Key for API
    var query = $("#q").val(); //Retrieve information for query
    //Request IEEE with following parameter
    $.getJSON(
      searchURL,
      {
        article_title: query, //for query
        content_type: "Conferences", //only display Conference type
        max_records: 10, //Up to 10 records
        apikey: key //Key
      },
      function(r) {
        //Request with 10 search return the proceed to function(r)
        console.log(r);
        let embedcode = '<hr/><h2>Search Results</h2><hr/><i class="fa fa-spinner" />' //Spin loading while request not finish yet.
        $('#content').html(embedcode);
        embedcode = `<hr/><h2>Search Results</h2><hr/><div class="card-columns" id="ieee">`; //Create an HTML element
        r.articles.forEach(g => { //For every search result, add it to the card with header,title , body, and footer
          embedcode += `<div class="card mb-2">
          <div class="card-header">
          ${g.publication_title}
          </div>
          <div class="card-title">
          ${g.title}
          </div>
          <div class="card-body p2">
          ${g.abstract}<br />
          <a href="${g.html_url}" target=_blank><button type="button" class="btn btn-outline-info">More Info</button></a>
          </div>
          <div class="card-footer text-muted">
          Location: ${g.conference_location}<br />
          Date: ${g.conference_dates}
          </div>
          </div>`;
        });
        embedcode += `</div>`;
        $("#content").html(embedcode); //Display an HTML to #content
      }
    )
    .fail(function(){ //In case it failed to fetch data, It will display this.
      let embedcode = '<hr/><h2>Search Results</h2><hr/>';
      embedcode += `Because of IEEE certificate issue, it will state that the request website is dangerous.<br />
      If you are using chrome and cannot get search result please click link below and ignore the warning:<br />
      <a href="https://ieeexploreapi.ieee.org/api/v1/search/articles">https://ieeexploreapi.ieee.org/api/v1/search/articles</a><br />
      Click on 'Advance' then 'Proceed to ieeexploreapi.ieee.org'
      `
      $('#content').html(embedcode);
    });
  };
  //This is the event handler for the click event
  doSth = () => {
    if (this.props.clicked) this.onSearch();
  };
  render() {
    return (
      <div>
        {this.doSth()}
        <div id="content" />
      </div>
    );
  }
}

export default IEEESearch;
