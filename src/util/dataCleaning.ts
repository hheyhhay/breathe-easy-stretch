interface CityData {
    status: string
    data: {
        city: string
        state: string
        country: string
        location: {
            type: string
            coordinates: number[]
        }
        current: {
            weather: {
                ts: string
                tp: number
                pr: number
                hu: number
                ws: number
                wd: number
                ic: string
            }
            pollution: {
                ts: string
                aqius: number
                mainus: string
                aqicn: number
                maincn: string
            }
        }
    }
}

interface CleanData {
    city: string
    aqi: number
    timeStamp: string
    temperature: number
    location: number[]
}

export type CityObj = {
    city: string
}

export interface CityList {
    status: string
    data: CityObj[]
}

export const cleanCityData = (data: CityData ): CleanData => {
    return { 
        city: data.data.city,
        aqi: data.data.current.pollution.aqius,
        timeStamp: data.data.current.pollution.ts,
        temperature: data.data.current.weather.tp,
        location: data.data.location.coordinates
      }
}

export const cleanAllCitiesData = (data: CityList): string[] => {
    return data.data.map(city => city.city)
  }
