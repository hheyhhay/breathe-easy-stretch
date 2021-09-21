## Breathe-Easy - Team TypeScript Project

### Table of Contents
- [Deployed Site](#deployed-site)
- [Github Repo](#github-repo)
- [Demo](#demo)
- [Project Spec](#project-spec)
- [App Operation Instructions](#app-operation-instructions)
- [Setup Instructions](#setup-instructions)
- [Learning Goals and Reflections](#learning-goals-project-reflection)
- [Future Additions](#future-additions)
- [Contributors](#contributors)
- [Project Managers](#project-managers)

## Deployed Site - 
https://breathe-easy.surge.sh/

## GitHub Repo - 
https://github.com/hheyhhay/breathe-easy-stretch

## Demo

![GIF Demo]

![Main Page]

![City Comparison Page]

![States Error]

## Project Spec

[Project Spec](https://frontend.turing.edu/projects/module-3/stretch.html)

## Instructions
- The purpose of the Breathe-Easy (Breezy) App is to help a user find the cleanest air around them
- The user starts by either clicking the 'Use Current Location' button or selecting a U.S. state and then a city and clicking 'Show AQI'
- The selected city is then show on a right hand panel with its current air quality index (AQI) Score and current temperature
- The user can then select addition cities from the same style drop down menus to compare to the selected city
- The comparison cities also have their AQI and temperature but also the difference between their AQI and the selected city AQI and the distance from the selected city
- The comparison cities are automatically sorted from lowest AQI to highest AQI as they are added
- The user can go back to the main page by clicking 'Return Home'

## Setup Instructions
- To access the website: 
- clone down repo 
- cd into repo
- run ``` npm install ```
- run ``npm start``
- webpage will open in seperate browser

## Technologies Used: 
 - TypeScript
 - React
 - HTML5
 - CSS
 - Cypress 
 - Dayjs
 - Router

## Learning Goals and Project Reflections

### Learning Goals
##### William - 
- Greatly improve React.js abilities - hooks, use effect, passing data down, passing actions up
- Further Router skills - router drives fetch and page content so that url can be referenced or favorited, switch to have a destination if a unknown url is used
- Get basic understanding of benefits and difficulties of typeScript as well as a solid understanding of how to impliment it in a simple app
##### Hayley -
- Better understand react and react router
- Self-teach and understand the fundamentals of Typescript
##### Eric -

### Challenges
##### William - 
- Component layout - deciding what component should have which hook and which API call
- Keeping track of the props that are being passed in for reused components (form, selected city)
##### Hayley -
- Implementing Typescript while also still developing my understanding of react
- Balance between time and desire to build a quality application
##### Eric -

### Wins 
##### William -
- I am very happy with the final component structure 
- The team effort that resulted in this application has built the best application yet
##### Hayley -
- I have a better understanding of React and Typescript not
- I have a better understanding on why Typescript is beneficial and when it is cumbersome
##### Eric -

## Future Additions
- Three toggling selectors in which a user can sort the other cities:
  - Sort by the order added
  - Sort by the distance from selected city
  - Sort by the AQI

#### Contributors
- William Phelps [Github](github.com/williamphelps13)
- Hayley Dixon [Github](github.com/hheyhhay)
- Eric Li [Github](github.com/ericli1996)

#### Project Managers
- Scott Ertmer
- Kayla Gordon

###### This project was created for [Turing School of Software and Design](https://turing.io/)
###### 2021/09/20
**[Back to top](#table-of-contents)**
