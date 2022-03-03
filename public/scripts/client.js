/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// <-- Generates HTML markup given tweet data -->
const createTweetElement = (tweet) => {

  const { user, content, created_at } = tweet;
  const tweetMarkup = `
  <article class="tweet">
  <div class="tweet-head">
    <div class="head-left">
      <img src="${user.avatars}" alt="avatar">
      <p>${user.name}</p>
    </div>
    <div class="head-right">
      <p>${escapeText(content.text)}</p>
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

// <-- Renders tweets in database -->
const renderTweets = (tweets) => {
  $('.tweet-container').empty();
  return tweets.map((tweet) => {
    return $('.tweet-container').prepend(createTweetElement(tweet));
  }
  );
};

// <-- Generates HTML markup given tweet data -->
const loadTweets = () => {
  $.get('/tweets')
    .then(data => {
      renderTweets(data);
    })
    .catch(err => console.log(err));
};

// <-- Logic for error popup when tweets too long/short -->
const escapeText = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// <-- Loads logic when document ready -->
$(() => {
  $(".error").hide();
  loadTweets();
  $('.tweet-form').submit(function(e) {
    e.preventDefault();
    if ($('.counter').val() >= 0 && $('.counter').val() < 140) {
      $(".error").hide();
      const data = $(this).serialize();
      $.post('/tweets', data)
        .then(() => {
          loadTweets();
          $("#text").val('');
          $('.counter').val(140);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      $(".error").show();
    }
  });
});
