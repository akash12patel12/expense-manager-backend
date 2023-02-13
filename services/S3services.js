const AWS = require("aws-sdk");
const FileLink = require('../models/fileLinks');

const uploadtoS3 = async (expenses, fileName) => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  return new Promise((resolve, reject) => {
    s3bucket.upload(
      {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: expenses,
        ACL: "public-read",
      },
      (err, response) => {
        if (err) {
          console.log("Something went wrong", err);
          reject(err);
        } else {
          resolve(response.Location);
        }
      }
    );
  });
};

const saveToFileLinksTable = (url, id)=>{
   FileLink.create({
    filelink : url,
    userEmId : id
   })

   return;
}


const getAllFiles = async (req)=>{
   const allFiles = await FileLink.findAll({where : {userEmId : req.user.userId}});
   return allFiles;
}

module.exports = {
  uploadtoS3,
  saveToFileLinksTable,
  getAllFiles
};
