/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = (tweet) => {

    const { user, content, created_at } = tweet
    const tweetMarkup = `
    <article class="tweet">
    <div class="tweet-head">
      <div class="head-left">
        <img src="${user.avatars}" alt="avatar">
        <p>${user.name}</p>
      </div>
      <div class="head-right">
        <p>${user.handle}</p>
      </div>
    </div>
    <div class="tweet-body">
      <p class="tweet-text">${content.text}</p>
    </div>
    <div class="tweet-footer">
      <div>
        <p>${timeago.format(created_at)}</p>
      </div>
      <div class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </div>
  </article>
  `;

  return tweetMarkup;
  };

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const $tweet = createTweetElement(tweetData);
  $('.tweet-container').append($tweet);
});
