

export async function uploadData(img) {
    const formData = new FormData()
    formData.append('file', img)
    formData.append('upload_preset', `${process.env.CLOUDINARY_UPLOAD_PRESET}`)
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${process.env.CLOUDINARY_API}:${process.env.CLOUDINARY_API_SECRET}`)}`
        },
        body: formData,
        
    })
    // .then(data => data.json())
    const result = await response.json()
    console.log({"url":result.secure_url})
    return result.secure_url
}