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


export const detectCelebrity = async (image) => {

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // In this section, we set the user authentication, user and app ID, model details, and the URL
  // of the image we want as an input. Change these strings to run your own example.
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'celebrity-face-detection';
  const MODEL_VERSION_ID = '2ba4d0b0e53043f38dbbed49e03917b6';

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": 'clarifai',
      "app_id": 'main'
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


  const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
  
  const results = await response.json();
  return results.outputs[0].data.regions
  // console.log(results.outputs[0].data.regions)
  // console.log(results.outputs[0].data.regions[0].data)
}


