import { svgIcon } from './src/helper'
import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="main_body">
      <header class="header">
        <div class="nav_bar">
            <a class="logo_wrapper">
              <img src="assets/images/logo.png" alt="wether logo" />
            </a>
        
            <div class="search">
                <div class="search_wrapper">
                    <input class="search_input" name="search" placeholder="search for location"  type="search" autocomplete="off" />
                    
                    <span class="search_icon">
                    ${svgIcon('search', 20, 20, 'white')}
                    </span>

            
                </div>

                <ul class="search-result" data-search-result>

                </ul>
            </div>

            <div class="nav_action">
              <button disabled class="open_search" arial-label="open search">
                  <span class="open_search_icon">
                    ${svgIcon('search', 22, 22, 'white')}
                  </span>
              </button>

              <button class="location_btn">
                <span>
                  ${svgIcon('map-pin', 24, 24, 'white')}
                </span>
                current location
              </button>
            </div>
        </div>  
      
      </header>
  </div>
`
