import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDNARY_CLOUD_SECRET_KEY,
});

export default cloudinary;
