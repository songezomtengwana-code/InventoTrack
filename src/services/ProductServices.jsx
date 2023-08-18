import { db, firebaseAuth, storageDB } from './firebase'

export async function uploadProductImage(image, branch) {

    const product_image_upload_path = `inventory/${firebaseAuth.currentUser.uid}/${branch}`

    if (image) {
        const response = await fetch(image.uri);
        const blob = response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
        var ref = storageDB.ref().child(`${product_image_upload_path}/${filename}`).put(blob);
        try {
            await ref;
        } catch (e) {
            console.log(e);
        }
        console.log('image added');
    } else {
        console.log('no image uploaded ke joe');
    }
};