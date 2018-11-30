import React, { Component } from "react";
import $ from "jquery";
class Twitter extends Component {
  //This function will execute on button click
  onTwitterSearch = async () => {
    let searchURL = "https://mwarot.herokuapp.com/"; //Request URL of server side script
    var query = $("#q").val(); //Get query from id 'q'
    const proxyURL = "https://cors-anywhere.herokuapp.com/"; //Proxy to add the CORS header to Twitter sever side script
    let tweetsURL = []; //An array that will keep URL of each tweet
    const c_key = process.env.REACT_APP_TWITTER_C_KEY; //KEY
    const c_secretkey = process.env.REACT_APP_TWITTER_C_KEY_SECRET; //KEY
    const a_token = process.env.REACT_APP_TWITTER_A_TOKEN; //KEY
    const a_token_secret = process.env.REACT_APP_TWITTER_A_TOKEN_SECRET; //KEY
    /** Get and decode JSON from search URL and request with the following:
     *  'q' for query
     *  'result_type' for the result type (recent or popular)
     *  'count' for the number of result per page.
     *  'c_key' for consumer key
     *  'c_secretkey' for consumer secret key
     *  'a_token' for access token
     *  'a_token_secret' for access secret token
     */
    await $.getJSON(
      searchURL,
      {
        q: query,
        result_type: "popular",
        count: 10,
        c_key,
        c_secretkey,
        a_token,
        a_token_secret
      },
      //Then proceed to the function below
      function(tweet) {
        console.log(tweet.statuses); //Debugging purpose
        //Each status URL will be pushed in the array 'tweetsURL'
        tweet.statuses.forEach(tw => {
          tweetsURL.push(
            "https://twitter.com/" +
              tw.user.screen_name +
              "/status/" +
              tw.id_str
          );
        });
        requestEmbed(tweetsURL);
        //Recieved the array of tweets URL and request for embed tweet from 'publish.twitter.com'
        function requestEmbed(tweet) {
          let embed =
            '<hr/><h2>Comments</h2><hr/><i class="fa fa-spinner fa-spin"/>'; //Spin loading while the request not finish yet
          $("#TweetContent").html(embed);
          embed = '<hr/><h2>Comments</h2><hr/><div class="card-columns">';
          tweet.forEach((tweet, key, arr) => {
            //For each tweet, it will request for embed type from twiiter
            fetch(proxyURL + "https://publish.twitter.com/oembed?url=" + tweet)
              .then(response => response.json())
              .then(async data => {
                // console.log(data);
                const positive =
                  '<i class="fa fa-smile-o" style="color: green; font-size: 2rem"/>';
                const neutral =
                  '<i class="fa fa-meh-o" style="color: grey; font-size: 2rem"/>';
                const negative =
                  '<i class="fa fa-frown-o" style="color: red; font-size: 2rem"/>';
                let sentimentalscore = 2.5;
                let snippet = data.html; //Get the embed html tag
                await $.post(
                  "https://mwarot.herokuapp.com/sentiment.php",
                  {
                    //Request a sentiment rating for a snippet
                    text: snippet
                  },
                  function(rate) {
                    sentimentalscore = Number(rate); //The score will be in range 1-5
                  }
                );
                embed += `<div class="card" style="border: none">
                            <div class="card-header">
                                ${
                                  sentimentalscore > 2.7
                                    ? positive
                                    : sentimentalscore < 2.4
                                    ? negative
                                    : neutral /* score > 2.7 is positive, < 2.3 is negative, and between that is neutral */
                                }
                            </div>
                            ${snippet}
                     </div>`;
                if (key === arr.length - 1) {
                  //If it the last item, insert end div and display embed to #TweetContent
                  //   console.log(embed);
                  embed += "</div>";
                  $("#TweetContent").html(embed);
                }
              });
          });
        }
      }
    );
  };
  //This is the event handler for click event
  doSth = () => {
    if (this.props.clicked) this.onTwitterSearch();
  };
  render() {
    return (
      <div>
        {this.doSth()}

        <div id="TweetContent" />
      </div>
    );
  }
}

export default Twitter;
