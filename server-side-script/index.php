<?php
require('../vendor/autoload.php');
//Twitter OAuth library made by Abraham (https://github.com/abraham/twitteroauth)
include "twitteroauth/twitteroauth.php";

//Some constant key for Twitter authorization
$consumer_key = $_GET['c_key'];
$consumer_secret = $_GET['c_secretkey'];
$access_token = $_GET['a_token'];
$access_token_secret = $_GET['a_token_secret'];

//Make an authorize with Twitter in order to access their information
$twitter = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);

//Get data sended from client side
$query = $_GET['q'];
$resultType = $_GET['result_type'];
$count = $_GET['count'];

//Get tweet from query up to $count sorted by $resultType, which is popular
$tweets = $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q='.$query.'&result_type='.$resultType.'&count='.$count.'&lang=en');

//Some header to allow server side to interact with client
header('Content-type: application/json; charset=utf-8');
header('access-control-allow-origin:*');
//print out encoded JSON and deliver them to client side
echo json_encode($tweets);