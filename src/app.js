'use strict'
import { addEventOnElements } from './helper.js'
import * as module from './module.js'
import { fetchData, url } from './services/api.js'
/**
 *
 * @param {NodeList} elements Elemetns node array
 * @param {String} eventType Event Type e.g: "click","mouseover"
 * @param {Function} callback callback function
 */

const searchView = document.querySelector('[data-search-view]')
const searchTogglers = document.querySelectorAll('[data-search-toggler]')
const toggleSearch = () => {
	searchView.classList.toggle('active')
}
addEventOnElements(searchTogglers, 'click', toggleSearch)

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
