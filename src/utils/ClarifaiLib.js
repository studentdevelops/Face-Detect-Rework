export const detectFaces = async (image) => {
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": "clarifai",
      "app_id": "main"
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": image
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + process.env.CLARIFAI_TOKEN
    },
    body: raw
  };
  const response = await fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions);
  const results = await response.json();
  return results.outputs[0].data.regions; 
}



