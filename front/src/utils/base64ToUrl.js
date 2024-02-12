import * as blobUtil from "blob-util";

export default async function base64ToUrl(base64) {
    const baseType = base64.split(';')[0].split(':')[1]
    const base64String = base64.split('base64,')[1];

    const blob = blobUtil.base64StringToBlob(base64String, baseType);

    return await blobUtil.blobToDataURL(blob);
}
