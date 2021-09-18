export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const radius = 6371
  const distanceLatitude = deg2rad(lat2-lat1)
  const distanceLongitude = deg2rad(lon2-lon1)
  const a = Math.sin(distanceLatitude/2) * Math.sin(distanceLatitude/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(distanceLongitude/2) * Math.sin(distanceLongitude/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const d = (radius * c) * 0.621371
  return Math.round(d)
}

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180)
}