/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(() =>  {
  //grab and hide error messages for initial loading of page
  const $lengthErrorMSG = $('#tweet-length-error');
  $lengthErrorMSG.hide();

  const $noTweetErrorMSG = $('#no-tweet-error');
  $noTweetErrorMSG.hide();

  //make sure button does not POST to /tweets
  const $form = $('.new-tweet-form');

  $form.on('submit', onSubmit)
});


const onSubmit = function(event) {
  event.preventDefault();

  //validation checks for no tweet or too long of a tweet, respectively
  const $lengthErrorMSG = $('#tweet-length-error');
  $lengthErrorMSG.slideUp();

  const $noTweetErrorMSG = $('#no-tweet-error');
  $noTweetErrorMSG.slideUp();

  const stringBeforeSerialized = $("#tweet-text").val();
  if (!stringBeforeSerialized) {
    return $noTweetErrorMSG.slideDown();
  }

  if (stringBeforeSerialized.length > 140) {
    return $lengthErrorMSG.slideDown();
  }

  const formData = $(this).serialize();
  console.log(formData);

  $.post('/tweets', formData)
    .then(() => {
      fetchTweets();
    })
}

const fetchTweets = function() {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'GET',
    dataType: 'json',
    success: (tweetData) => {
      renderTweets(tweetData);
    },
    error: (err) => {
      console.error(err);
    }
  })
}

const createTweetElement = function(tweetData) {
  
  //variable to store the format of the new tweet, populated with values from tweetData
  const $tweet = $(`
  <article class="tweet" id="tweets-container">
  <header>
  <div>
  <img src=${escape(tweetData.user.avatars)}>
  <h3>${escape(tweetData.user.name)}</h3>
  </div>
  <h3>${escape(tweetData.user.handle)}</h3>
  </header>
  <p>${escape(tweetData.content.text)}</p>
  <footer>
  <p>${timeago.format(tweetData.user.created_at)}</p>
  <span class="tweet-icons">
  <span><i class="fas fa-flag"></i></span>
  <span><i class="fas fa-retweet"></i></span>
  <span><i class="fas fa-heart"></i></span>
  </span>
  </footer>
  </article>`);
  
  return $tweet; //return article
}

const renderTweets = function(tweets) {

  const $tweetsContainer = $( '#tweets-container' );
  $tweetsContainer.empty();
  
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


  
  
  