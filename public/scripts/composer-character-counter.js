$( document ).ready(function() {
  //create a new jQuery object for the textarea input(grabbing it by its ID)
  const $newTweetInput = $('#tweet-text');

  $newTweetInput.on('input', function() {
    //target the output field (the counter) and save it to a variable 
    const $counter = $(this).parent().find('output');
    
    //declare number of characters (140); save length of value of textarea input to a variable
    let numOfCharacters = this.value.length;
    let charactersLeft = 140;
    
    //subtract numOfCharacters from charactersLeft and set charactersLeft to be counter value
    charactersLeft -= numOfCharacters;
    $( $counter ).val( charactersLeft );
    
    //make sure characters left and counter reflect that you are over-limit with negative, red number
    if (charactersLeft < 0) {
      charactersLeft = 140 - numOfCharacters;
      return $( $counter ).css('color', 'red');
    }

    return $( $counter ).css('color', 'black');
    
  })


    
    
    
    


  // const $newTweetButton = $('.submit-button');

  // $newTweetButton.on('click', () =>{
  //   const $newTweetValue = $newTweetInput.val();
  //   const $newTweet = $('<li>').text($newTweetValue);
  // })
});

