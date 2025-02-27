import { addEventOnElements, svgIcon } from './src/helper'
import './style.css'

document.querySelector('#app').innerHTML = `
  <div id="main_body">
      <div class="light_bg"></div>
      <header class="header">
        <div class="nav_bar">
            <a class="logo_wrapper">
              <img src="assets/images/logo.png" alt="wether logo" />
            </a>
        
            <div class="search_view" data-search-view >
                <div class="search_wrapper">
                    <input class="search_input" name="search" placeholder="search for location"  type="search" autocomplete="off" />
                    
                    <span class="search_icon">
                    ${svgIcon('search', 20, 20, 'white')}
                    </span>

                    <button class="close_search" aria-label="close search" data-search-toggler>
							          ${svgIcon('arrow-left', 20, 20, 'white')}
						        </button>
                </div>

                <div class="search_result_wrapper" data-search-result>
                
                </div>
            </div>

            <div class="nav_action">
              <a href="#" class="open_search" data-search-toggler arial-label="open search">
                    ${svgIcon('search', 22, 22, 'white')}
              </a>

              <button class="location_btn">
                <span>
                  ${svgIcon('target', 24, 24, 'white')}
                </span>
                current location
              </button>
            </div>
        </div>  
      
      </header>


      <main class="main">
        <div class="main_container">
        
          <div class="left_container">
              <div data-current-weather class="card card_today">
                <p class="card_time">Now</p>
             
                <div class="flex_between card_row">
                  <p data-today-degree class="degree"><span>17°</span>c</p>
                    <img data-forecast-image src="assets/images/weather_icons/10n.png" alt="weather in image" />
                </div>

                <p class="card_description">Few Clouds</p>

                <p data-forecast-day class="card_day" >
                  <span>
                    ${svgIcon('calendar', 21, 21, 'white')}
                  </span>
                  Wednesday Feb 25
                </p>
                <p data-forecast-location class="card_location">
                  <span>
                    ${svgIcon('map-pin', 21, 21, 'white')}
                  </span>
                  Lideta ET
                </p>
              
              </div>
            
              <h2 class="title">5 Days Forcast</h2>
            
              <div class="card card_2">
                  <div class="card_item flex_between" data-5-day-forecast>
                    <div class="card_show">
                      <img src="assets/images/weather_icons/11n.png" width="200" height="200" alt="cloud image" />

                      <p data-week-degree>17°</p>
                    </div>
                  
                      <p class="card_week-day" data-month-data>26 feb</p>
                      <p class="card_week-day" data-month-day>wednesday</p>
                  </div>
                  <div class="card_item flex_between" data-forecast-week>
                    <div class="card_show">
                      <img src="assets/images/weather_icons/11n.png" width="200" height="200" alt="cloud image" />

                      <p data-week-degree>17°</p>
                    </div>
                  
                      <p class="card_week-day" data-month-data>26 feb</p>
                      <p class="card_week-day" data-month-day>wednesday</p>
                  </div>
              </div>
          </div>


          <div class="right_container">
            <h2 class="title">Today Highlights</h2>
            <div data-highlights class="highlight-list">
                <div class="card highlight-list-1">
                <p class="flex_between card_header">
                  <span>Air Quality Index</span>
                  <span>Good</span>
                </p>              

                  <div class="card_detail flex_between">
                    <p class="detail_flex">
                      <span class="text_xs">PM2.5</span>
                      <span>0.04</span>
                    </p>
                    <p class="detail_flex">
                      <span class="text_xs">PM2.5</span>
                      <span>0.04</span>
                    </p>
                    <p class="detail_flex">
                      <span class="text_xs">PM2.5</span>
                      <span>0.04</span>
                    </p>
                    <p class="detail_flex">
                      <span class="text_xs">PM2.5</span>
                      <span>0.04</span>
                    </p>
                  </div>
            </div>

            <div class="card highlight-list-2">
               <p data-weather-condition class="flex_between card_header">
                  <span>Air Quality Index</span>
                </p>  

                <div class="card_detail card2_detail flex_between">
                    <div class="detail_item">
                      <span>
                          ${svgIcon('sun', 34, 34, 'white')}
                        </span>

                      <p class="sun_day">
                        <span class="text_sm">Sunset</span>
                        <span class="text_md">6:35 PM</span>
                      </p>
                    </div>
                    <div class="detail_item">
                       <span>
                          ${svgIcon('moon', 34, 34, 'white')}
                        </span>
                      <p class="sun_day">
                        <span class="text_sm">Sunset</span>
                        <span class="text_md">6:35 PM</span>
                      </p>
                    </div>
                </div>

            </div>

            <div class="card card_small">
                <p class="text_sm ">Feels Like</p>
                 <div class="flex_between">
                    <span>
                        ${svgIcon('moon', 34, 34, 'white')}
                    </span>

                    <p class="text_md">14km</p>
                 </div> 
            </div>
            </div>
          </div>
        </div>
      
      </main>
  </div>
`

const search_view = document.querySelector('[data-search-view]')

const searchToggler = document.querySelectorAll('[data-search-toggler]')

addEventOnElements(searchToggler, 'click', () => {
	search_view.classList.toggle('active')
})

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
