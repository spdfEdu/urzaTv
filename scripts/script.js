var divS = '<div class="each-box"><h2 class="h2-head">';
if (movieAdd) {
  Object.assign(movieData, movieAdd);
}
function movieHead(e) {
  movieHeader = `<li>${e.type}</li>`
  if (e.date) {
    movieHeader += `<li>${e.date.year}</li>`
  }
  if (e.duration) {
    movieHeader += `<li>${e.duration.short}</li>`
  }
  return movieHeader;
}
function google(s) {
  g = s.split(" ")
  g = g.join("+");
  return("http://www.google.com/search?q="+g)
}
function name(n) {
  var nameSet = [];
  n.forEach(ele => {
    nameSet += `<li>${ele}</li>`
  })
  return nameSet;
}
function nameGoogle(n) {
  var nameSet = [];
  n.forEach(ele => {
    nameSet += `<li><a target="_blank" href="${google(ele)}">${ele}</a></li>`
  })
  return nameSet;
}
function movieActors(e) {
  return nameGoogle(e.actors)
}
function classes(h) {
  if (h) {
    return '';
  } else return 'style="display:none"';
}
function movieDirectors(e) {
  if (e.directors) {
    return nameGoogle(e.directors)
  }
}
function movieCreators(e) {
  if (e.creators) {
    return nameGoogle(e.creators)
  }
}
function movieCasts(e) {
  if (e.cast) {
    return name(e.cast)
  }
}
function movieGenres(e) {
  if (e.genres) {
    genres = [];
    e.genres.forEach(a => {
      genres += `<li><a href="/search/label/${a}?&max-results=5&m=1">${a}</a></li>`
    })
  return genres;
  }
}
function movieEpisodes(e) {
  if(e.episodes) {
    return "It has total " +e.episodes.total +" Episodes in " + e.episodes.seasons + " Seasons."
  }
}
function releaseDate(e) {
  if (e.date) {
    return e.date.day + "/"+ e.date.month + "/"+e.date.year;
  }
}
function rating(e) {
  return e.rating.ratingValue+"/10 ("+e.rating.ratingCount+")"
}
function duration(t) {
  dur = t.duration;
  if (dur) {
    if (t["@type"] === "TVSeries") {
      time = "Its a Series having many Episodes, Lets not think about the duration"
      return time;
    }
    if (dur.full && dur.seconds) {
      time = dur.full + " ("+(dur.seconds / 60) +" Minutes)"
      return time;
    } else if (!dur.full) {
      time = (dur.seconds / 60) +" Minutes"
      return time;
    } else {
      time = "Lets not thik about the Duration"
      return time;
    }
  }
  return time;
}
function movieDownload(e) {
  location.href = e.tB;
}
function movieDetails(m) {
  return (
    `
    ${divS} ${m.name} ${m.type}</h2>
    <ul class="li-inline dotted">${movieHead(m)}</ul>
    <ul class="li-inline genres">${movieGenres(m)}</ul>
    </div>
    <div class="poster">
    <img src="${m.img}" alt="${m.name}" width=100% height=auto>
    <p>IMDB Rating: <a href="https://www.imdb.com/title/${m.iid}/ratings/">${rating(m)}</a></p>
    </div>
    ${divS} Plot</h2>
    <p class="desc">${m.description}</p>
    </div>
    ${divS} Duration</h2>
    <p>${duration(m)}</p>
    </div>
    <div class="each-box" ${classes(m.episodes)}><h2 class="h2-head"> Episodes</h2>
    <p>${movieEpisodes(m)}</p>
    </div>
    ${divS} Genre</h2>
    <ul class="li-inline dotted">${movieGenres(m)}</ul>
    </div>
    <div class="each-box" ${classes(m.directors)}><h2 class="h2-head"> Directors</h2>
    <ul class="li-inline dotted">${movieDirectors(m)}</ul>
    </div>
    <div class="each-box" ${classes(m.creators)}><h2 class="h2-head"> Creators</h2>
    <ul class="li-inline dotted">${movieCreators(m)}</ul>
    </div>
    ${divS} Stars</h2>
    <ul class="li-inline dotted">${movieActors(m)}</ul>
    </div>
    ${divS} Cast</h2>
    <ul class="li-inline coma">${movieCasts(m)}</ul>
    </div>
    ${divS} Show Details </h2>
    <table class="table">
    <tbody>
    <tr><th>Name</th><td>${m.name}</td></tr>
    <tr><th>Type</th><td>${m.type}</td></tr>
    <tr><th>IMDB Rating</th><td>${rating(m)}</td></tr>
    <tr><th>Release Date</th><td>${releaseDate(m)}</td></tr>
    <tr><th>Duration</th><td>${m.duration.short}</td></tr>
    <tr><th>Stars</th><td><ul class="li-inline coma">${movieActors(m)}</ul></td></tr>
    <tr ${classes(m.directors)}><th>Directors</th><td><ul class="li-inline coma">${movieDirectors(m)}</ul></td></tr>
    <tr ${classes(m.creators)}><th>Creators</th><td><ul class="li-inline coma">${movieCreators(m)}</ul></td></tr>
    </tbody>
    </table>
    </div>
    ${divS} Download</h2>
    <p>${m.name} ${m.date.year} Full ${m.type} Download easily from here</p>
    <p>Click on the Download Button to download ${m.name} Full ${m["@type"]}</p>

    <div class="mc">
    <div class="lt-box">
    <img src="${m.img}" alt="${m.name} Download" width="100%" height="auto">
    </div>
    <div class="rt-box">
    <h3>${m.name} Full ${m.type} Download</h3>
    <p>${m.file}</p>
    <div class="down-box">
    <ul class="li-inline dotted down-info"><li>${m.sz}</li><li>${m.audio}</li><li>${m.ql}</li></ul>
    <p id="down-btn" onclick="movieDownload(movieData)">DOWNLOAD</p>
    </div>
    </div>
    </div>
    </div>
    `
  )}
function moviePage() {
  document.querySelector('#movie-details').innerHTML = movieDetails(movieData);
}
moviePage(movieData);
