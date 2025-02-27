'use strict'
import { addEventOnElements, svgIcon } from './helper.js'
import * as module from './module.js'
import { fetchData, url } from './services/api.js'
/**
 *
 * @param {NodeList} elements Elemetns node array
 * @param {String} eventType Event Type e.g: "click","mouseover"
 * @param {Function} callback callback function
 */

const search_view = document.querySelector('[data-search-view]')

const searchToggler = document.querySelectorAll('[data-search-toggler]')

const toggleSearch = () => {
	search_view.classList.toggle('active')
}
addEventOnElements(searchToggler, 'click', toggleSearch)

// search integration

const searchField = document.querySelector('.search_input')
const searchResult = document.querySelector('[data-search-result]')

let searchTimeOut = null
let searchTimeOutDuration = 500

searchField.addEventListener('input', () => {
	searchTimeOut ?? clearTimeout(searchTimeOut)
	if (!searchField.value) {
		searchResult.classList.remove('active')
		searchResult.innerHTML = ''
		searchField.classList.remove('searching')
	} else {
		searchField.classList.add('searching')
	}
	if (searchField.value) {
		clearTimeout(searchTimeOut)
		searchTimeOut = setTimeout(() => {
			fetchData(url.geo(searchField.value), (locations) => {
				searchField.classList.remove('searching')
				searchResult.classList.add('active')
				searchResult.innerHTML = `
                    <ul class="search-result" data-search-list>
					
					</ul>
                `
				const items = []
				for (const { name, lat, lon, country, state } of locations) {
					const searchItem = document.createElement('li')
					searchItem.innerHTML = `
 						<a href="#/weather?lat=${lat}&lon=${lon}" class="search_item" aria-label="${name} weather" data-search-toggler>
							<span>${name}</span>
							<span>${state || ''} ${country}</span>
						</a>
                    `
					searchResult
						.querySelector('[data-search-list]')
						.appendChild(searchItem)
					items.push(
						searchItem.querySelector('[data-search-toggler]')
					)
				}
				addEventOnElements(items, 'click', () => {
					toggleSearch()
					searchResult.classList.remove('active')
				})
			})
		}, searchTimeOutDuration)
	}
})

const loading = document.querySelector('[data-loading]')
const currentLocationBtn = document.querySelector('[data-current-location-btn]')
// const errorContent = document.querySelector('[data-error-content]')

export const updateWeather = (lat, lon) => {
	loading.style.display = 'grid'

	// errorContent.style.display = 'none'

	const currentWeatherSection = document.querySelector(
		'[data-current-weather]'
	)
	const highlightSection = document.querySelector('[data-highlights]')
	// const hourlySection = document.querySelector('[data-hourly-forecast]')
	const forecastSection = document.querySelector('[data-5-day-forecast]')

	currentWeatherSection.innerHTML = ''
	highlightSection.innerHTML = ''
	// hourlySection.innerHTML = ''
	forecastSection.innerHTML = ''

	if (window.location.hash == '#/current-location')
		currentLocationBtn.setAttribute('disabled', '')
	else currentLocationBtn.removeAttribute('disabled')

	//CURRENT WEATHER

	fetchData(url.currentWeather(lat, lon), (currentWeather) => {
		const {
			weather,
			dt: dateUnix,
			sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
			main: { temp, feels_like, pressure, humidity },
			visibility,
			timezone,
		} = currentWeather

		const [{ description, icon }] = weather

		const card = document.createElement('div')
		card.classList.add('card', 'card_today')
		card.innerHTML = `
			<h2 class="card_time">Now</h2>             
			<div class="flex_between card_row">
				<p data-today-degree class="degree">
					<span>${parseInt(temp)}&deg;</span> c
				</p>
				<img data-forecast-image src="./assets/images/weather_icons/${icon}.png" alt="${description}"/>
			</div>
			<p class="card_description">${description}</p>
			<p data-forecast-day class="card_day">
				<span>${svgIcon('calendar', 21, 21, 'white')}</span>
				${module.getDate(dateUnix, timezone)}
			</p>
			<p data-forecast-location class="card_location">
				<span>${svgIcon('map-pin', 21, 21, 'white')}</span>
				<span data-location></span>
			</p>
		`
		fetchData(url.reverseGeo(lat, lon), ([{ name, country }]) => {
			card.querySelector(
				'[data-location]'
			).innerHTML = `${name}, ${country}`
		})
		currentWeatherSection.appendChild(card)

		//today's highlights

		fetchData(url.airPollution(lat, lon), (airPollution) => {
			const [
				{
					main: { aqi },
					components: { no2, o3, so2, pm2_5 },
				},
			] = airPollution.list

			const card = document.createElement('div')
			card.classList.add('highlight-list')
			card.innerHTML = `
				<div class="card highlight-list-1">
					<p class="flex_between card_header">
						<span>Air Quality Index</span>
						<span title="${module.aqiText[aqi].message}">${module.aqiText[aqi].level}</span>
					</p>
					<div class="card_detail flex_between">
						<p class="detail_flex">
							<span class="text_xs">PM2.5</span>
							<span>${pm2_5.toPrecision(3)}</span>
						</p>
						<p class="detail_flex">
							<span class="text_xs">SO2</span>
							<span>${so2.toPrecision(3)}</span>
						</p>
						<p class="detail_flex">
							<span class="text_xs">No2</span>
							<span>${no2.toPrecision(3)}</span>
						</p>
						<p class="detail_flex">
							<span class="text_xs">O3</span>
							<span>${o3.toPrecision(3)}</span>
						</p>
					</div>
				</div>
				<div class="card highlight-list-2">
					<p data-weather-condition class="flex_between card_header">
						<span>Sunrise & Sunset</span>
					</p>
					<div class="card_detail card2_detail flex_between">
						<div class="detail_item">
							<span>${svgIcon('sun', 34, 34, 'white')}</span>
							<p class="sun_day">
								<span class="text_sm">Sunrise</span>
								<span class="text_md">${module.getTime(sunriseUnixUTC, timezone)}</span>
							</p>
						</div>
						<div class="detail_item">
							<span>${svgIcon('moon', 34, 34, 'white')}</span>
							<p class="sun_day">
								<span class="text_sm">Sunset</span>
								<span class="text_md">${module.getTime(sunsetUnixUTC, timezone)}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="card card_small">
					<h3 class="text_sm">Humidity</h3>
					<div class="flex_between">
						<span>${svgIcon('cloud-rain', 34, 34, 'white')}</span>
						<p class="text_md">${humidity}%</p>
					</div>
				</div>
				<div class="card card_small">
					<h3 class="text_sm">Pressure</h3>
					<div class="flex_between">
						<span>${svgIcon('moon', 34, 34, 'white')}</span>
						<p class="text_md">${pressure} hba</p>
					</div>
				</div>
				<div class="card card_small">
					<h3 class="text_sm">Visibility</h3>
					<div class="flex_between">
						<span>${svgIcon('eye', 34, 34, 'white')}</span>
						<p class="text_md">${visibility / 1000} Km</p>
					</div>
				</div>
				<div class="card card_small">
					<h3 class="text_sm">Feels Like</h3>
					<div class="flex_between">
						<span>${svgIcon('thermometer', 34, 34, 'white')}</span>
						<p class="text_md">${feels_like}&deg;<sup>c</sup></p>
					</div>
				</div>
			`
			highlightSection.appendChild(card)
		})

		//24H forecast

		// fetchData(url.forecast(lat, lon), (forecast) => {
		// 	const {
		// 		list: forecastList,
		// 		city: { timezone },
		// 	} = forecast
		// 	hourlySection.innerHTML = `
		//         <h2 class="title-2">Today at</h2>
		//         <div class="slider-container">
		//             <ul class="slider-list" data-temp></ul>
		//             <ul class="slider-list" data-wind></ul>
		//         </div>
		//     `
		// 	for (const [index, data] of forecastList.entries()) {
		// 		if (index > 7) break
		// 		const {
		// 			dt: dateTimeUnix,
		// 			main: { temp },
		// 			weather,
		// 			wind: { deg: windDirection, speed: windSpeed },
		// 		} = data
		// 		const [{ icon, description }] = weather
		// 		const tempLi = document.createElement('li')
		// 		tempLi.classList.add('slider-item')
		// 		tempLi.innerHTML = `
		//             <div class="card card-sm slider-card">
		//                 <p class="body-3">${module.getTime(
		// 					dateTimeUnix,
		// 					timezone
		// 				)}</p>
		//                 <img src="./assest/images/weather_icons/${icon}.png" width="48" height="48" loading="lazy" alt="${description}" class="weather-icon" title="${description}">
		//                 <p class="body-3">${temp}&deg;</p>
		//             </div>
		//             `
		// 		hourlySection.querySelector('[data-temp]').appendChild(tempLi)
		// 		const windLi = document.createElement('li')
		// 		windLi.classList.add('slider-item')
		// 		windLi.innerHTML = `
		//             <div class="card card-sm slider-card">
		//                 <p class="body-3">${module.getTime(
		// 					dateTimeUnix,
		// 					timezone
		// 				)}</p>
		//                 <img src="./assest/images/weather_icons/direction.png" width="48" height="48" loading="lazy" alt="" class="weather-icon" style="transform :rotate(${
		// 					windDirection - 180
		// 				}deg)">
		//                 <p class="body-3">${parseInt(
		// 					module.mps_to_kmh(windSpeed)
		// 				)}Km/h</p>
		//             </div>
		//         `
		// 		hourlySection.querySelector('[data-wind]').appendChild(windLi)
		// 	}

		// 	//5 day forecast

		// 	forecastSection.innerHTML = `
		//         <h2 class="title-2" id="forecast-label">5 Days Forecast</h2>
		//         <div class="card card-lg forecast-card">
		//             <ul data-forecast-list></ul>
		//         </div>
		//     `
		// 	for (let i = 7, len = forecastList.length; i < len; i += 8) {
		// 		const {
		// 			main: { temp_max },
		// 			weather,
		// 			dt_txt,
		// 		} = forecastList[i]
		// 		const [{ icon, description }] = weather
		// 		const date = new Date(dt_txt)
		// 		const li = document.createElement('li')
		// 		li.classList.add('card-item')
		// 		li.innerHTML = `
		//             <div class="icon-wrapper">
		//                 <img src="./assest/images/weather_icons/${icon}.png" width="36" height="36" alt="${description}" class="weather-icon">
		//                 <span class="span">
		//                 <p class="title-2">${parseInt(temp_max)}&deg;</p>
		//                 </span>
		//             </div>
		//             <p class="label-1">${date.getDate()} ${
		// 			module.monthNames[date.getMonth()]
		// 		}</p>
		//             <p class="label-1">${
		// 				module.weekDayNames[date.getUTCDay()]
		// 			}</p>
		//         `
		// 		forecastSection
		// 			.querySelector('[data-forecast-list]')
		// 			.appendChild(li)
		// 	}
		loading.style.display = 'none'
		// })
	})
}
// export const error404 = () => {
// 	errorContent.style.display = 'flex'
// }
