(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
	$("button").click( e => {
		const searchTerm = $('.navbar-form :input').val();
		e.preventDefault();
		getDataFromApi(searchTerm);
	})
}

function goToVideo(data) {
	$(".anchor").each((idx, ele) => {
		const id = data.items[idx].id.videoId;
		const url = 'https://www.youtube.com/watch?v=';
		$(ele).attr("href", `${url}${id}`);	
	})
}

$(getSearchTerm)
},{}]},{},[1]);
