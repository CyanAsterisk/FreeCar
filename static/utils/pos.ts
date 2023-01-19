
export function CalculDistance(p1:position,p2:position) {
  var rad1 = p1.latitude * Math.PI / 180.0;
  var rad2 = p2.latitude * Math.PI / 180.0;
  var a = rad1 - rad2;
  var b = p1.latitude * Math.PI / 180.0 - p2.longitude * Math.PI / 180.0;
  var r = 6378137;
  var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
  return distance;
}

interface position{
    latitude: number,
    longitude: number
}