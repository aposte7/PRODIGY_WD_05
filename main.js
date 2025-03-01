import { addEventOnElements, svgIcon } from './src/helper'
import './style.css'

document.querySelector('#app').innerHTML = `
    	<div id="main_body">
				<div class="light_bg"></div>
				<header class="header">
					<div class="nav_bar">
						<a href="#/approximatelocation" class="logo_wrapper">
							<img
								src="assets/images/logo.png"
								alt="wether logo"
							/>
						</a>

						<div class="search_view" data-search-view>
							<div class="search_wrapper">
								<input
									class="search_input"
									name="search"
									placeholder="search for location"
									type="search"
									autocomplete="off"
								/>

								<span class="search_icon">
									<i class="fe fe-heart"></i>
									<i class="fe fe-search"></i>
									${svgIcon('search', 20, 20, 'white')}
								</span>

								<button
									class="close_search"
									aria-label="close search"
									data-search-toggler
								>
									${svgIcon('arrow-left', 20, 20, 'white')}
								</button>
							</div>

							<div
								class="search_result_wrapper"
								data-search-result
							></div>
						</div>

						<div class="nav_action">
							<button
								class="open_search"
								data-search-toggler
								arial-label="open search"
							>
								${svgIcon('search', 22, 22, 'white')}
							</button>

							<a href="#/current-location"
								class="location_btn"
								data-current-location-btn
							>
								<span>
									${svgIcon('target', 24, 24, 'white')}
								</span>

								<span class="location_txt">current location</span>
							</a>
						</div>
					</div>
				</header>

				<main class="main">
					<div class="loader_wrapper" data-loading>
						<div class="loader"></div>
					</div>
					<div class="main_container">
						<div class="left_container">
						<div data-current-weather></div>

							<h2 class="title">5 Days Forcast</h2>

              <div class="daily_forecast">
              
              </div>
						</div>

						<div class="right_container">
							<div class="right_child_1">
                <h2 class="title">Today Highlights</h2>
							<div data-highlights>
								<div class="highlight-list"></div>
							</div>
              </div>
					

              <div class="right_child_2">
                <h3>Today at</h3>
                <div class="hourly-weather" data-hourly-weather>
                  <div class="tody_weather_wrapper">
                    </div>                 
                </div>                           
               </div>
            </div>
					</div>
				</main>
			</div>
  `

export const toggleSearch = () => {
	search_view.classList.toggle('active')
}
const search_view = document.querySelector('[data-search-view]')

const searchToggler = document.querySelectorAll('[data-search-toggler]')

addEventOnElements(searchToggler, 'click', toggleSearch)
