window.onload = function(){
var searchButton = document.getElementById('search')
searchButton.addEventListener('click',retrieveMovie)
var favoriteButton = document.getElementById('favorites')
favoriteButton.addEventListener('click',retrieveFavorites)

}

function retrieveMovie(){
    var input = document.getElementById('movie').value
    axios.post('/movies', {params:input}).then(function(response){
        console.log(response)
        displayMovieList(response.data.Search)
    });     
}

function displayMovieList(arr){
    let ul = document.querySelector('ul');
    ul.innerHTML = '';
    if(!arr){
        return
    }
    arr.forEach(function(movie){
        listItem = document.createElement('li');
        button = document.createElement('button');
        button.addEventListener('click', function(e){ e.preventDefault()
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
    axios.post('/favorites', el).then(function(data){
        console.log(data)
    })
}

function retrieveFavorites(){
    var favorites = axios.get('/favorites').then(function(data){
        console.log(data)
        displayFavorites(data)
    })  
}

function displayFavorites(obj){
    let ul = document.querySelector('ul');
    ul.innerHTML = '';
    obj.data.forEach(function(movie){
        listItem = document.createElement('li');
        listItem.innerHTML = movie.Title  
        ul.appendChild(listItem);
    })
}






