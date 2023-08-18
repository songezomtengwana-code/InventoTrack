import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export async function updateLoginLogs(buid) {
    var loginLog = {
        in_date: Date().substring(0, 16),
        in_time: Date().substring(16, 21),
    }

    const client_ref = doc(db, 'clients', buid);
    console.log('initiating login logs')
    await updateDoc(client_ref, { logs: arrayUnion(loginLog) }).then(() => {
        console.log('new logs recorded successfully -> ' + loginLog)
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
