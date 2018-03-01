window.onload = function(){
var searchButton = document.querySelector('button')

searchButton.addEventListener('click',retrieveMovie)
}

function retrieveMovie(){
    var input = document.getElementById('movie').value
    movieList = axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=74cc3f33&s=${input}`).then(function(response){
        displayMovieList(response.data.Search)
    });     
}

function displayMovieList(arr){
    let ul = document.querySelector('ul');
    ul.innerHTML = '';
    arr.forEach(function(movie){
        listItem = document.createElement('li');
        button = document.createElement('button');
        button.addEventListener('click', function(){    event.preventDefault()
            favorite(movie)})
        listItem.innerHTML = movie.Title
        button.innerHTML = 'favorite'
        listItem.appendChild(button);   
        ul.appendChild(listItem);
    })
    let body = document.querySelector('body');
    body.appendChild(ul)
}

function favorite(el){
    console.log(el)
}
