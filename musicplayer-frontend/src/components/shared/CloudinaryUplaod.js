import { useState } from "react";
import {openUploadWidget} from "../../utils/CloudinaryService";
import {cloudinary_uplaod_preset} from "../../config";
const CloudinaryUpload = ({setUrl, setName}) => {
    const uploadImageWidget = () => {
        console.log(cloudinary_uplaod_preset);
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dgd1aq2fy",
                // uploadPreset: "hjihatcw",
                uploadPreset: cloudinary_uplaod_preset,
                sources: ["local"],
                restrictions: {
                    allowed_formats: ["mp3"],
                  },
            },
            function (error, result) {
                if (!error && result.event === "success") {
                  const { format, secure_url, original_filename } = result.info;
        
                  // Check if the file is in MP3 format
                  if (format === "mp3") {
                    console.log(secure_url);
                    setUrl(secure_url);
                    setName(original_filename);
                  } else {
                    console.log("Please upload an MP3 file.");
                    alert("Please upload an MP3 file.");
                    return;
                    // You can handle this case as per your requirements
                  }
                } else {
                  if (error) {
                    console.log(error);
                  }
                }
              }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="bg-blue-700 text-blue-50 rounded-full p-4 font-semibold hover:bg-transparent border border-blue-700"
            onClick={uploadImageWidget}
        >
            Uplaod Track (MP3 only)
        </button>
    );
};

export default CloudinaryUpload;
