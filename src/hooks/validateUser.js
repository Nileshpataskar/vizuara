import * as faceapi from "face-api.js";

const dataURLToBlob = (dataURL) => {
  const [header, base64Data] = dataURL.split(",");
  const mimeType = header.match(/:(.*?);/)[1];
  const binaryData = atob(base64Data);
  const len = binaryData.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    view[i] = binaryData.charCodeAt(i);
  }
  return new Blob([buffer], { type: mimeType });
};

export const validateUser = async (capturedImage, storedImage) => {
  // Load face-api.js models before inference
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models"); // Load the model for face detection
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models"); // Load the model for facial landmarks
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models"); // Load the model for face recognition

  // Convert the captured image and stored image data URLs to Blobs
  const capturedBlob = dataURLToBlob(capturedImage);
  const storedBlob = dataURLToBlob(storedImage);

  // Convert the Blobs to Image objects for face-api.js
  const capturedImg = await faceapi.bufferToImage(capturedBlob);
  const storedImg = await faceapi.bufferToImage(storedBlob);

  // Detect face features from both images
  const detectedFacesCaptured = await faceapi
    .detectSingleFace(capturedImg)
    .withFaceLandmarks()
    .withFaceDescriptor();
  const detectedFacesStored = await faceapi
    .detectSingleFace(storedImg)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (detectedFacesCaptured && detectedFacesStored) {
    const distance = faceapi.euclideanDistance(
      detectedFacesCaptured.descriptor,
      detectedFacesStored.descriptor
    );
    return distance < 0.6; // Match threshold
  }

  return false; // If no face detected or descriptors couldn't be extracted
};
