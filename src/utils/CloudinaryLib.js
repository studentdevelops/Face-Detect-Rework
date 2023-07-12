

export async function uploadData(img) {
    const formData = new FormData()
    formData.append('file', img)
    formData.append('upload_preset', `${process.env.CLOUDINARY_UPLOAD_PRESET}`)
    formData.append('api_key', `${process.env.CLOUDINARY_API}`)
    formData.append('CLOUDINARY_URL', `${process.env.CLOUDINARY_URL}`)
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
    })
    // .then(data => data.json())
    // console.log({"url":result.secure_url})
    // console.log({"resut Complete":result})
    const result = await response.json()
    return result.secure_url
}