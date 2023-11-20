const movieData = document.querySelector("#movieData");

const inputSearch = document.querySelector("#inputSearch");

// const btnSearch = document.querySelector("#btnSearch");

inputSearch.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const movieTitle = this.value;
    console.log(this.value);

    getMovie(movieTitle);

    this.value = "";
  }
});

function SubmitForm(event) {
  event.preventDefault();
}

function getMovie(title) {
  const myPromise = fetch(`http://www.omdbapi.com/?apikey=f9cd76f0&t=${title}`);

  myPromise
    .then((res) => {
      console.log("res", res);

      const dataPromise = res.json();

      return dataPromise;
    })
    .then((data) => {
      renderData(data);

      console.log("data", data);
    })
    .catch((err) => {
      console.log("err", err);
    });
}

function renderData(movie) {
  console.log(movie);
  movieData.innerHTML = ` <div class="d-flex  gap-5 m-5 " >


    
        <img src="${
          movie.Poster
        }" alt="" height="350" style="object-fit: cover;" >
        
        <div>
                <h2 class="text-danger" >${movie.Title}</h2>
        
                <ul>
        
                    <li>Country:${movie.Country}</li>
                    <li>Writer:${movie.Writer}</li>
                    <li>Time:${movie.Runtime}</li>
                    <li >Year:${movie.Year}</li>
                    <li >Genre:${movie.Genre}</li>
                    <li class="text-warning h5 " >${movie.imdbRating}</li>
        
                </ul>

  




                <ul>


                

                ${movie.Ratings.map(
                  (rait) => `<li>${rait.Source}:${rait.Value}</li>`
                ).join("")}
                
                </ul>

                </div>
        
            </div>
        `;
}
