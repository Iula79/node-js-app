window.onload = function () {
    var searchButton = document.getElementById('search');
    searchButton.addEventListener('click', retrieveMovie);
    var favoriteButton = document.getElementById('favorites');
    favoriteButton.addEventListener('click', retrieveFavorites);

}

function retrieveMovie() {
    var input = document.getElementById('movie').value
    axios.post('/movies', { params: input }).then(function (response) {
        displayMovieList(response.data.Search);
    });
}

function displayMovieList(arr) {
    let ul = document.getElementById('movieResults');
    ul.innerHTML = '';
    if (!arr) {
        return
    }
    arr.forEach(function (movie) {
        listItem = document.createElement('li');
        listItem.addEventListener('click', function (e) {
            e.preventDefault()
            displayDetail(movie)
        });
        button = document.createElement('button');
        button.addEventListener('click', function (e) {
            e.preventDefault()
            favorite(movie)
        });
        listItem.innerHTML = movie.Title;
        button.innerHTML = 'favorite';
        listItem.appendChild(button);
        ul.appendChild(listItem);
    });

}

function favorite(el) {
    axios.post('/favorites', el).then(function (data) {
        console.log(data);
    });
}

function retrieveFavorites() {
    var favorites = axios.get('/favorites').then(function (data) {
        console.log(data);
        displayFavorites(data);
    })
}

function displayFavorites(obj) {
    let ul = document.getElementById('listFavorites');
    ul.innerHTML = '';
    obj.data.forEach(function (movie) {
        listItem = document.createElement('li');
        listItem.innerHTML = movie.Title;
        ul.appendChild(listItem);
    })
}

function displayDetail(obj) {
    var title = document.createElement('h1');
    var year = document.createElement('h2');
    var poster = document.createElement('img');

    title.innerHTML = obj.Title;
    year.innerHTML = obj.Year;
    poster.setAttribute('src', obj.Poster);
    var div = document.getElementsByClassName('showDetail')[0];
    div.innerHTML = '';
    div.appendChild(title);
    div.appendChild(year);
    div.appendChild(poster);
    return div
}




