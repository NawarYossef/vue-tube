/* global $ */
"use strict";

function getDataFromApi(string) {
	const url = "https://www.googleapis.com/youtube/v3/search";
	const key = "AIzaSyAhKjkHCzwvK8mH6PrwjqBfATqW1_c6tIs";

	$.ajax({
		method: 'GET',
		url: url,
		data: { 
		part : 'snippet',
		key: key,
		q: string,
		'maxResults': '16'
		},
		dataType: 'jsonp',	
		success: (data) => {
			showImages(data);
			goToVideo(data);
		}
	}) 
}

function showImages(data) {
		$(".box").each((idx, ele) => {

			//each image will inherit its container's width and that way images will not overflow into each other.
			$(ele).css("width", "100%");
			$(ele).css("height", "100%");
			
			$(ele).attr("src", data.items[idx].snippet.thumbnails.medium.url);
		})
}

function getSearchTerm() {
	$("button").click((e) => {
		let searchTerm = ($('.navbar-form :input').val());
		e.preventDefault();
		getDataFromApi(searchTerm);
	})
}

function goToVideo(data) {
	$(".anchor").each((idx, ele) => {
		let id = data.items[idx].id.videoId;
		let url = 'https://www.youtube.com/watch?v=';
		$(ele).attr("href", `${url}${id}`);	
	})
}

getSearchTerm();

