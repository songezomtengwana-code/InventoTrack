import GetLocation from 'react-native-get-location'

export function currentLocation() {

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
        .then(location => {
            console.log(location);
            return location;
        })
        .catch(error => {
           return {longitude: '', latitude: ''};
        })
}