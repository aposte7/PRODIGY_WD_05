'use strict'
import { toggleSearch } from '../main.js'
import { addEventOnElements, svgIcon } from './helper.js'
import * as module from './module.js'
import { fetchData, url } from './services/api.js'
/**
 *
 * @param {NodeList} elements Elemetns node array
 * @param {String} eventType Event Type e.g: "click","mouseover"
 * @param {Function} callback callback function
 */

{
	/* <button
class="open_search"
data-search-toggler
arial-label="open search"
>
${svgIcon('search', 22, 22, 'white')}
</button> */
}

// search integration
const searchField = document.querySelector('.search_input')
const searchResult = document.querySelector('[data-search-result]')

let searchTimeOut = null
let searchTimeOutDuration = 500

searchField.addEventListener('input', () => {
	searchTimeOut ?? clearTimeout(searchTimeOut)
	if (!searchField.value) {
		searchField.classList.remove('active')
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
				searchField.classList.add('active')

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
					searchResult.classList.remove('active')
					searchField.classList.remove('active')
					searchResult.innerHTML = ''
					searchField.value = ''
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
	const hourlySection = document.querySelector('.hourly-weather')
	const forecastSection = document.querySelector('.daily_forecast')

	console.log('hourlySection', hourlySection)
	currentWeatherSection.innerHTML = ''
	highlightSection.innerHTML = ''
	hourlySection.innerHTML = ''
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
					<h3 class="flex_between card_header">
						<span>Air Quality Index</span>
						<span class="card_header-con" title="${module.aqiText[aqi].message}">${
				module.aqiText[aqi].level
			}</span>
					</h3>
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
					<h3 data-weather-condition class="flex_between card_header">
						<span>Sunrise & Sunset</span>
					</h3>
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

		fetchData(url.forecast(lat, lon), (forecast) => {
			const {
				list: forecastList,
				city: { timezone },
			} = forecast

			const tempLi = document.createElement('div')
			tempLi.classList.add('tody_weather_wrapper')

			const windLi = document.createElement('div')
			windLi.classList.add('tody_weather_wrapper')

			for (const [index, data] of forecastList.entries()) {
				if (index > 7) break
				const {
					dt: dateTimeUnix,
					main: { temp },
					weather,
					wind: { deg: windDirection, speed: windSpeed },
				} = data
				const [{ icon, description }] = weather
				const card1 = document.createElement('div')
				card1.classList.add('card', 'center')
				card1.innerHTML = `
                  		<p class="today_time">${module.getTime(
							dateTimeUnix,
							timezone
						)}</p>
          
               			<img src="assets/images/weather_icons/${icon}.png" width="48" height="48" loading="lazy" alt="${description}" class="weather-icon" title="${description}">
                   
                  		<p class="center_temp">${temp}&deg;<sub>c</sub></p>
		            `
				tempLi.appendChild(card1)

				const card2 = document.createElement('div')
				card2.classList.add('card', 'center')
				card2.innerHTML = `
		                <p class="today_time">${module.getTime(
							dateTimeUnix,
							timezone
						)}</p>
		                <img src="assets/images/weather_icons/direction.png" width="48" height="48" loading="lazy" alt="" class="weather-icon" style="transform :rotate(${
							windDirection - 180
						}deg)">
		                <p class="center_temp">${parseInt(
							module.mps_to_kmh(windSpeed)
						)}Km/h</p>
		        `
				windLi.appendChild(card2)
			}
			hourlySection.appendChild(tempLi)
			hourlySection.appendChild(windLi)

			//5 day forecast

			const cardContainer = document.createElement('div')
			cardContainer.classList.add('card', 'card_2')

			forecastSection.appendChild(cardContainer)

			for (let i = 7, len = forecastList.length; i < len; i += 8) {
				const {
					main: { temp_max },
					weather,
					dt_txt,
				} = forecastList[i]
				const [{ icon, description }] = weather
				const date = new Date(dt_txt)
				const div = document.createElement('div')
				div.classList.add('card_item', 'flex_between')
				div.innerHTML = `
		        <div class="card_item flex_between" data-5-day-forecast>
					<div class="card_show">
						<img src="assets/images/weather_icons/${icon}.png" width="36" height="36" alt="${description}" class="weather-icon">

						<p data-week-degree>${parseInt(temp_max)}&deg;</p>
					</div>

					<p class="card_week-day" data-month-data>
						${date.getDate()} ${module.monthNames[date.getMonth()]}
					</p>
					<p class="card_week-day" data-month-day>
						${module.weekDayNames[date.getUTCDay()]}
					</p>
				</div>
		        `
				forecastSection.querySelector('.card_2').appendChild(div)
			}
			loading.style.display = 'none'
		})
	})
}
// export const error404 = () => {
// 	errorContent.style.display = 'flex'
// }
