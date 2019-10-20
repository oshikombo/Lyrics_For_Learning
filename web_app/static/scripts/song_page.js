let index = window.location.href.lastIndexOf('/')
let id = window.location.href.substring(index + 1)
let song_api_url = 'http://0.0.0.0:5001/api/v1/songs/' + id
fetch(song_api_url)
.then(response => response.json())
.then(data => {
  console.log(data)
  document.getElementById('song_info').innerHTML = `${data.artist}, ${data.title}`;
  document.getElementById('lyrics').innerHTML = `${data.lyrics}`;
})
.catch(error => console.error(error))


let song_word_api_url = 'http://0.0.0.0:5001/api/v1/songs/' + id + '/words'
fetch(song_word_api_url)
.then(response => response.json())
.then(data => {
  console.log(data)
  for (i = 0; i < data.length; i++) {
    item = document.createElement("LI");
    text = document.createTextNode(data[i].text)
    item.appendChild(text)
    document.getElementById('wordlist').appendChild(item);
    setupWordFetch(item)
   }
  })
.catch(error => console.error(error))
function setupWordFetch(word) {
  word.addEventListener('click', function() {
    fetch("https://wordsapiv1.p.rapidapi.com/words/" + word.innerText,
	  {
	    headers: {
	      'x-rapidapi-host': "ENTER API_HOST",
	      'x-rapidapi-key': "ENTER API_KEY"
	    }
	  })
      .then(response => response.json())
	.then(data => {
	  console.log(data)
	})
	.catch(error => console.error(error))
  })}
