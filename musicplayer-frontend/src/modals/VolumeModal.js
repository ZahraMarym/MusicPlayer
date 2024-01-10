import Textfield from "../components/shared/textfield";
import {useState} from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";

const VolumeModal = ({closeModal}) => {



    return (
        <div
        className="absolute bg-black w-full h-full bg-opacity-20 flex justify-end items-center"
        onClick={closeModal}
    >
        <div
            className="bg-black text-gray-400 bg-opacity-50 w-1/3 rounded-md p-8"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="text-gray-200 mb-5 font-semibold text-lg">
               
            </div>
        </div>
    </div>
    );
};
export default CreatePlaylistModals;