import React, { Component } from "react";
import $ from "jquery";
class YouTubeSearch extends Component {
  //This function will execute on click of search button
  onYoutubeSearch = () => {
    const key = process.env.REACT_APP_YOUTUBE; //Key for YouTube Data API
    let q = this.props.q + ", academic conference"; //Add academic conference to the query (Act like 'q' && 'academic conference')
    //Request a data from YouTube with the following request
    $.get(
      "https://www.googleapis.com/youtube/v3/search", //URL to request
      {
        part: "snippet, id", //Request for id and snippet
        q, //Query
        maxResults: 10, //Max result is 10
        type: "video", //Only display video(not playlist or channel)
        key //API key
      },
      //Then proceed to the function below
      function(data) {
        console.log(data); //Debug purpose
        let result = '<hr/><h2>Videos</h2><hr/><i class="fa fa-spinner fa-spin"/>' //Spin loading while request not finish yet.
        result = '<hr/><h2>Videos</h2><hr/><div class="card-columns">';
        data.items.forEach(obj => { //For each video, include them in card with following HTML
          var title = obj.snippet.title;
          var thumbnails = obj.snippet.thumbnails.medium.url;
          var id = obj.id.videoId;
          //Again, the 'result' is what the content in form of html tag

          result += `
          <a href=https://www.youtube.com/watch?v=${id} target=_blank class="nodecorate">
            <div class="card">
              <div class="card-body">
                <span class="lead">${title}</span>
              </div>
                <img class="card-img-bottom" src="${thumbnails}">
              </div>
            </a>`;
        });
        result += "</div>";
        $("#YouTube").html(result); //Display a result to #YouTube
      }
    );
  };
  //This is event handler for click event
  doSth = () => {
    if (this.props.clicked) this.onYoutubeSearch();
  };
  render() {
    return (
      <div>
        {this.doSth()}
        <div id="YouTube" />
      </div>
    );
  }
}

export default YouTubeSearch;
