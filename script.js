'use strict';

function getAstroPicOfDay(monthInput, dayInput) {
    monthInput = makeDouble(monthInput);
    dayInput = makeDouble(dayInput);
    console.log("expecting doubles", monthInput, dayInput);
    fetch(`https://api.nasa.gov/planetary/apod?api_key=JFlugkHkjMcUZqba55Q0oavmdbGqZBzHHAEPan3A&date=2005-${monthInput}-${dayInput}`)
        .then(response => response.json())
        .then(responseJson =>
            displayResultsAstro(responseJson))
        .catch(error => {
            console.log(error)
        });
}

function getWikiDay(monthInput, dayInput) {
    monthInput = stripLeadingZeros(monthInput);
    dayInput = stripLeadingZeros(dayInput);
    console.log("expecting singles", monthInput, dayInput);
    fetch(`https://byabbe.se/on-this-day/${monthInput}/${dayInput}/events.json`)
        .then(response => response.json())
        .then(responseJson =>
            displayResultsWikiDay(responseJson))
        .catch(error => {
            console.log(error)
        });
}


function makeDouble(date) {
    date = date.length == 1 ? "0" + date : date;
    return date;
}

function stripLeadingZeros(date) {
    date = date[0] === 0 ? date[1] : date;
    return date;
}


function displayResultsWikiDay(responseJson) {
    // console.log(responseJson);
    let html = `<h1>This happened on that day:</h1>`;
    for (let i = 0; i < 10; i++) {
        html += `<div class = "resultsWikiDay">`
        let evt = responseJson.events[i];
        html += `<div class="year">${evt.year}</div>
    <div class="description">${evt.description}</div>`;
        evt.wikipedia.forEach(function (link) {
            console.log(link);
            html += `<div><p>For more information on ${link.title}, click here: <a href="${link.wikipedia}">${link.title}</a></p></div>`;
        });
        html += `</div>`
    }
    $(".results").append(html);
    $(".results").removeClass("hidden");
}


function displayResultsAstro(responseJson) {
    console.log(responseJson);
    $(".results").prepend(`<h2>The cosomos looked like this on that day:</h2> 
  <img src="${responseJson.url}" class="astroResults">`);
}


function watchSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        let monthInput = $(event.target).find('#monthInput').val()
        let dayInput = $(event.target).find('#dayInput').val()
        getWikiDay(monthInput, dayInput);
        getAstroPicOfDay(monthInput, dayInput);
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchSubmit();
});