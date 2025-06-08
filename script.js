 async function fetchWeather() {
            const apiKey = '1aa43db77c15e8dc07993c795480195d';
            const cityName = document.getElementById("city").value;
            if (!cityName) {
                alert("Please enter a city name");
                return;
            }
            const currentweather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
            const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
            
            try {
                const currentWeatherResponse = await fetch(currentweather);
                const currentWeatherData = await currentWeatherResponse.json();
                displayWeather(currentWeatherData);
            } catch (error) {
                console.log('error fetching current weather data:', error);
                alert('An error occurred while fetching current weather data. Please try again.');
            }

            try {
                const forecastResponse = await fetch(forecast);
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData.list);
            } catch (error) {
                console.log('error fetching forecast data:', error);
                alert('An error occurred while fetching forecast data. Please try again.');
            }
        }

        async function displayWeather(data) {
            const tempDiv = document.getElementById("temp-div");
            const weatherInfo = document.getElementById("weather-info");
            const weatherIcon = document.getElementById("weather-icon");
            const hourlyForecast = document.getElementById("hourly-forecast");

            weatherInfo.innerHTML = '';
            tempDiv.innerHTML = '';
            hourlyForecast.innerHTML = '';
            
            if (data.cod === '404') {
                weatherInfo.innerHTML = `<p>${data.message}</p>`;
            } else {
                const cityName = data.name;
                const temp = Math.round(data.main.temp - 273.15);
                const description = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

                const temperatureHtml = `<p>${temp}°C</p>`;
                const weatherHtml = `
                    <p>${cityName}</p>
                    <p>${description}</p>
                    <img src="${iconUrl}" alt="Weather icon">
                `;

                tempDiv.innerHTML = temperatureHtml;
                weatherInfo.innerHTML = weatherHtml;
                weatherIcon.src = iconUrl;
                weatherIcon.alt = description;

                showImage();
            }
        }

        async function displayForecast(hourlyData) {
            const hourlyForecast = document.getElementById("hourly-forecast");
            const next24Hours = hourlyData.slice(0, 8);
            next24Hours.forEach(item => {
                const date = new Date(item.dt * 1000);
                const hour = date.getHours();
                const iconCode = item.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
                const temp = Math.round(item.main.temp - 273.15);
                const hourlyHtml = `
                    <div class="hourly-item">
                        <span>${hour}:00</span>
                        <img src="${iconUrl}" alt="Hourly Weather Icon">
                        <span>${temp}°C</span>
                    </div>
                `;
                hourlyForecast.innerHTML += hourlyHtml;
            });
        }

        async function showImage() {
            const weatherIcon = document.getElementById("weather-icon");
            weatherIcon.style.display = "block";
        }

        // News Widget
    
    // News Widget
    async function fetchNews() {
        const apiKey = '18114d5e36b44ae68277316d7236fe10';
        const country = document.getElementById("country").value;

        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const newsUrl = `${proxyUrl}${encodeURIComponent(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`)}`;
        
       
        try {
            const newsResponse = await fetch(newsUrl);
            const newsData = await newsResponse.json();
            const articles = JSON.parse(newsData.contents).articles;
            if (articles) {
                displayNews(articles);
            } else {
                alert('No articles found for the selected country.');
            }
        } catch (error) {
            console.log('error fetching news data:', error);
            alert('An error occurred while fetching news data. Please try again.');
        }
    }

    async function displayNews(articles) {
        const newsResult = document.getElementById("news-result");
        newsResult.innerHTML = '';
        
        articles.forEach(article => {
            const newsHtml = `
                <div class="news-item">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `;
            newsResult.innerHTML += newsHtml;
        });
    }

        // Movie Widget
        async function fetchMovie() {
            const apiKey = '22b0d9a5';
            const movieTitle = document.getElementById("movie-title").value;
            if (!movieTitle) {
                alert("Please enter a movie title");
                return;
            }
            const movieUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
            
            try {
                const movieResponse = await fetch(movieUrl);
                const movieData = await movieResponse.json();
                displayMovie(movieData);
            } catch (error) {
                console.log('error fetching movie data:', error);
                alert('An error occurred while fetching movie data. Please try again.');
            }
        }

        async function displayMovie(data) {
            const movieResult = document.getElementById("movie-result");
            movieResult.innerHTML = '';
            
            if (data.Response === 'False') {
                movieResult.innerHTML = `<p>${data.Error}</p>`;
            } else {
                const movieHtml = `
                    <div class="movie-item">
                        <h3>${data.Title}</h3>
                        <p><strong>Year:</strong> ${data.Year}</p>
                        <p><strong>Genre:</strong> ${data.Genre}</p>
                        <p><strong>Plot:</strong> ${data.Plot}</p>
                        <img src="${data.Poster}" alt="Movie Poster">
                    </div>
                `;
                movieResult.innerHTML = movieHtml;
            }
        }