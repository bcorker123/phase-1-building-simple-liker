// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// When a user clicks on an empty heart:
const hearts = document.querySelectorAll('.like-glyph')

hearts.forEach(heart => {
  heart.addEventListener('click', clickFun)
})

function clickFun(event){
  // Invoke mimicServerCall to simulate making a server request
  // Keep all your styling rules entirely in style.css. Do not manipulate any .style properties.
  // Only manipulate the DOM once the server request responds. Do not make the heart full until you're inside a successful .then block.
  mimicServerCall()
  .then(resp => {
    if(resp === 'Pretend remote server notified of action!'){
      console.log('success')
      // When the "server" returns a success status:
      // Change the heart to a full heart
      // Add the .activated-heart class to make the heart appear red
      event.target.textContent = FULL_HEART
      event.target.className = 'activated-heart'
      event.target.removeEventListener('click', clickFun)
      // When a user clicks on a full heart:
      // Change the heart back to an empty heart
      // Remove the .activated-heart class
      event.target.addEventListener('click', unLike)
    }
  })
  // When the "server" returns a failure status:
  // Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
  .catch(resp => {
    // Display the error modal by removing the .hidden class
    // Display the server error message in the modal
    // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
    console.log(resp)
    const error = document.querySelector('#modal')
    const errorMsg = document.querySelector('#modal-message')
    error.className = ''
    errorMsg.textContent = resp
    setTimeout(() => error.className = 'hidden', 3000)
  })
}

function unLike(event){
  event.target.textContent = EMPTY_HEART
  event.target.className = ''
  event.target.removeEventListener('click', unLike)
  event.target.addEventListener('click', clickFun)
}









//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
