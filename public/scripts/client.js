/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  const createTweetElement = function(tweetData) {
    //variable to store the format of the new tweet, populated with values from tweetData
    const $tweet = $(`
    <article class="tweet" id="tweets-container">
      <header>
        <div>
          <img src=${tweetData.user.avatars}>
          <h3>${tweetData.user.name}</h3>
        </div>
          <h3>${tweetData.user.handle}</h3>
      </header>
      <p>${tweetData.content.text}</p>
      <footer>
            <p>${timeago.format(tweetData.user.created_at)}</p>
            <span class="tweet-icons">
              <span><i class="fas fa-flag"></i></span>
              <span><i class="fas fa-retweet"></i></span>
              <span><i class="fas fa-heart"></i></span>
            </span>
          </footer>
    </article>`);

    return $tweet;
  }

  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
  ]


  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      const $tweetsContainer = $( '#tweets-container' );
      $tweetsContainer.append($tweet);
   }
  }

  renderTweets(data)

})


