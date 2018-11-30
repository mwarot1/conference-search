<?php
require ('lib/sentiment_analyser.class.php');
include ('lib/sentiment_analyser.class.php');
$sa = new SentimentAnalysis();
$sa->initialize();

if (isset($_POST['save_dats'])) {
	$rating = $_POST['rating'];
	$text = $_POST['text'];
	$sa->import_sentiment_custom($text,$rating);
	die();

} else {
		$check = $sa->analyse("The customer service from bestbuy was incredible and their delivery window was amazing!");
		var_dump($check);
		$scores = $sa->return_sentiment_rating();
		var_dump($scores);

		$ratings = $sa->return_sentiment_calculations();
		echo $ratings;
	?>