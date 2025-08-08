import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export const uploadFile = async (file) => {
  const randomImageName = () => crypto.randomBytes(32).toString("hex");
  const fileName = randomImageName();

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file?.buffer,
    ContentType: file?.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return fileName;
};

export const getFileUrl = async (fileName) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 86400 });

  return url;
};
