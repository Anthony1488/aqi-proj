

const searchField = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-btn')
const curCity = document.querySelector('#current-city')
const aqi = document.querySelector('#aqi')
const body = document.querySelector('.card-content')

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getAqi(searchField.value)
    searchField.value = ""
    aqi.value = ""
    
})
async function getAqi(data) {
    try {
    // const config = { params: data}
    const response = await axios.get(`http://api.waqi.info/feed/${data}/?token=9679530187ff78628823328504ec47d6b9704aca`);
    console.log(response);
    curCity.innerText = response.data.data.city.name
    aqiValue = response.data.data.aqi
    aqi.innerText = `AQI Index: ${aqiValue}`
    function isBetween(min, max) {
    return function (num) {
         return num >= min && num <= max
    }
}

    const isHealthy = isBetween(0, 50)
    const isMedium = isBetween(51, 100)
    const isUnhealthyForSensitive = isBetween(101, 150)
    const isUnhealthy = isBetween(151, 200)
    const isVeryUnhealthy = isBetween(201, 300)
    const isHazardous = isBetween(300, 1000)

    switch (true) {
        case isHealthy(aqiValue): {body.style.background='palegreen'}
        break    
        case isMedium(aqiValue): {body.style.background='khaki'}
        break    
        case isUnhealthyForSensitive(aqiValue): {body.style.background='sandyBrown'}   
        break    
        case isUnhealthy(aqiValue): {body.style.background='tomato'}   
        break    
        case isVeryUnhealthy(aqiValue): {body.style.background=''}
        break
        case isHazardous(aqiValue): {body.style.background=''}
        break    
        }
        
  } catch (error) {
    console.error(error);
    }
}

