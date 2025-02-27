import { svgIcon } from './src/helper'
import './style.css'

document.querySelector('#app').innerHTML = `
    	<div id="main_body">
				<div class="light_bg"></div>
				<header class="header">
					<div class="nav_bar">
						<a class="logo_wrapper">
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
							<a
								href="#"
								class="open_search"
								data-search-toggler
								arial-label="open search"
							>
								${svgIcon('search', 22, 22, 'white')}
							</a>

							<button
								class="location_btn"
								data-current-location-btn
							>
								<span>
									${svgIcon('target', 24, 24, 'white')}
								</span>
								current location
							</button>
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

							<div class="card card_2">
								<div
									class="card_item flex_between"
									data-5-day-forecast
								>
									<div class="card_show">
										<img
											src="assets/images/weather_icons/11n.png"
											width="200"
											height="200"
											alt="cloud image"
										/>

										<p data-week-degree>17°</p>
									</div>

									<p class="card_week-day" data-month-data>
										26 feb
									</p>
									<p class="card_week-day" data-month-day>
										wednesday
									</p>
								</div>
								<div
									class="card_item flex_between"
									data-forecast-week
								>
									<div class="card_show">
										<img
											src="assets/images/weather_icons/11n.png"
											width="200"
											height="200"
											alt="cloud image"
										/>

										<p data-week-degree>17°</p>
									</div>

									<p class="card_week-day" data-month-data>
										26 feb
									</p>
									<p class="card_week-day" data-month-day>
										wednesday
									</p>
								</div>
							</div>
						</div>

						<div class="right_container">
							<h2 class="title">Today Highlights</h2>
							<div data-highlights>
								<div class="highlight-list"></div>
							</div>
						</div>
					</div>
				</main>
			</div>
  `

{
	/* <dvi class="loader_wrapper">
<div class="loader"></div>
</dvi> 

 <li>
    <a href="#/weather?lat=${lat}&lon=${lon}" class="search_item" aria-lable="${name} weather" data-search-toggler>
      <span>${name}</span>
      <span>${state || ''} ${country}</span>
    </a>
  </li>



*/
}
