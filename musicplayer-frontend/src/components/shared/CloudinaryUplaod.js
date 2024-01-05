import {openUploadWidget} from "../../utils/CloudinaryService";
import {cloudinary_uplaod_preset} from "../../../config";
const CloudinaryUpload = ({setUrl, setName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dgd1aq2fy",
                uploadPreset: {cloudinary_uplaod_preset},
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    console.log(result.info.secure_url);
                    // setUrl(result.info.secure_url);
                    // setName(result.info.original_filename);
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
            Uplaod Image
        </button>
    );
};

export default CloudinaryUpload;
