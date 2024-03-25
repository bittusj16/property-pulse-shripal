import cloudinary from "@/config/cloudnary";

export const UploadImage = async (file, folder) => {
  const bufffer = await file.arrayBuffer();
  const bytes = Buffer.from(bufffer);

  return new Promise(async (resolve, rejects) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (err, result) => {
          if (err) {
            rejects(err.message);
          }
          resolve(result);
        }
      )
      .end(bytes);
  });
};
