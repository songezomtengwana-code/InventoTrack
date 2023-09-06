import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import GetLocation from 'react-native-get-location'

export async function updateLoginLogs(buid) {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
        .then(location => {
            var loginLog = {
                in_date: Date().substring(0, 16),
                in_time: Date().substring(16, 21),
                location: location
            }

            const client_ref = doc(db, 'clients', buid);
            console.log('initiating login logs')
            try {
                updateDoc(client_ref, { logs: arrayUnion(loginLog) }).then(() => {
                    console.log('new logs recorded successfully -> ' + loginLog)
                })
            } catch {
                console.log('shid dont work no mo');
            }
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })


}

export async function updateLogoutLogs(buid) {
    var logoutlog = {
        out_date: Date().substring(0, 16),
        out_time: Date().substring(16, 21),
    }

    const client_ref = doc(db, 'clients', buid);

    await updateDoc(client_ref, { logs: arrayUnion(logoutlog) }).then(() => {
        console.log('New logs recorded successfully -> ' + logoutlog)
    })
}
