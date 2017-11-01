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
		success: data => {
			// resultDefaultState();
			showImages(data);
			mapAllVideo(data);
			SearchResulstCount(data);
			addThumbnailsBackground();
		}
	}) 
}

function showImages(data) {
	const images = data.items.map(item => {
		return (
			`<div class="col-3">
			 	<a href="" rel="modal:open" class="anchor" target="_blank" >
					<img src=${item.snippet.thumbnails.medium.url} class="box"></img>
				</a>
			</div>`
		)
	})
	$(".row").append(images)
}

function getSearchTerm() {
	$("button").click( e => {
		const searchTerm = $('.navbar-form :input').val();
		e.preventDefault();
		getDataFromApi(searchTerm);
	})
}

function mapAllVideo(data) {
	$(".anchor").each((idx, ele) => {
		const id = data.items[idx].id.videoId;
		const url = 'https://www.youtube.com/watch?v=';
		$(ele).attr("href", `${url}${id}`);	
	})
}

function SearchResulstCount(data) {
	const text = `${data.items.length} Results`
	$("p").text(text);
}

function resultDefaultState() {
	$("span > p").text('');
}

function addThumbnailsBackground() {
	$("section").addClass("add-background-for-results");
}

$(getSearchTerm)

// <div class="col-3">
// <a href="#ex1" rel="modal:open" class="anchor" target="_blank" >
// 	<img src="" class="box"></img>
// </a>
// </div>