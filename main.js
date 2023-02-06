window.onload = function () { 
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
};

async function upload() {
    const imgFile = document.getElementById('myFileUpload').files[0];
    const canvas = document.getElementById('mycanva')
    const imageView = document.getElementById('myImg')

    const img = await faceapi.bufferToImage(imgFile);

    imageView.src = img.src;

    const displaySize = { width: imageView.width, height: imageView.height }
    faceapi.matchDimensions(canvas, displaySize)

    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    //draw detections
    faceapi.draw.drawDetections(canvas, resizedDetections); //show detection
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections); //show expression
}
