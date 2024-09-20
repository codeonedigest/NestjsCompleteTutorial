const AWS = require('aws-sdk');
const fs = require('fs');
//const s3 = new AWS.S3();

const s3 = new AWS.S3({
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key'
  });
  

const uploadFile = (fileName, bucketName) => {
  const fileContent = fs.readFileSync(fileName);
    const uploadFileLocation = 'POC/Australia/' + fileName;
  const params = {
    Bucket: bucketName,
    Key: uploadFileLocation,
    Body: fileContent,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  });
};

// Usage
uploadFile('test.png', 'MyBucket');