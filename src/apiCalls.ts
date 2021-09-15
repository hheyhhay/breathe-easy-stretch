//Not currently being used
// export   const getCurrentOtherCityData = (currentOtherCity, selectedState) => {
//    return fetch(`http://api.airvisual.com/v2/city?city=${currentOtherCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
//       .then(response => response.json())
//       .then(data => setOtherCitiesData(...otherCitiesData, data.data))
//       .catch(error => setOtherCitiesDataError(error.message))
//   }

//   export const getCurrentLocationData = () => {
//    return fetch(`http://api.airvisual.com/v2/nearest_city?key=da479dc8-2e38-4a47-97a1-7396f6c348e1`) // THIS IS HARDCODED PIECE OF DATA ->  how to get IP address from click?
//     .then(response => response.json())
//     .then(data => setSelectedCity(data.data))
//     .catch(error => setCityDataError(error.message))
//   }

//   export const getSelectedCityData = (selectedCity, selectedState) => {
//     fetch(`http://api.airvisual.com/v2/city?city=${selectedCity}&state=${selectedState}&country=USA&key=da479dc8-2e38-4a47-97a1-7396f6c348e1`)
//     .then(response => response.json())
//     .then(data => setSelectedCity(data.data))
//     .catch(error => setCityDataError(error.message))
//   }
export {}