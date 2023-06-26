
export const dataUrlToBuffer = async (image) => {
    return new Promise((resolve, reject) => {
        const base64Data = image.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');
        resolve(buffer)
    })
}

