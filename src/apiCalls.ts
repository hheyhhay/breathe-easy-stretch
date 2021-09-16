import { CityObj, CityList } from "./util/dataCleaning"
  export const getData = (url: string): Promise<CityList> => {
  
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 404) {
          throw Error('404 error - Destination not found.')
        } else if (response.status === 500) {
          throw Error('500 error - Something on our end is not working right now.')
        } else {
        throw Error('Other error - Something went wrong.')
        }
      })
  }
