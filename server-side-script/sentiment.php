<?php
include ('lib/sentiment_analyser.class.php');
$text = $_POST['text'];
$sa = new SentimentAnalysis();
$sa->initialize();

$check = $sa->analyse($text);
//var_dump($check);
$scores = $sa->return_sentiment_rating();
//var_dump($scores);

//$ratings = $sa->return_sentiment_calculations();
echo $scores;