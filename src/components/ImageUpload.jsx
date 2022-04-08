import React from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";

function ImageUpload() {
  const upload = (file) => {
    var file = file.target.files[0];

    const target = { Bucket: "springboot-user-imagefile", Key: file.name, Body: file };
    const creds = {
      accessKeyId: "AKIAWHCFW3X6OPFH7YEI",
      secretAccessKey: "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",
    };
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: "us-east-1", credentials: creds }),
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });

      parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <input type="file" onChange={upload} />
    </div>
  );
}

export default ImageUpload;
