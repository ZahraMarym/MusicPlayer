import Textfield from "../components/shared/textfield";
import {useState} from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";

const CreatePlaylistModals = ({closeModal}) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest(
        "/playlist/create",
            {name: playlistName, thumbnail: playlistThumbnail, songs: []}
        );
        if (response._id) {
            closeModal();
        }
    };

    return (
        <div
        className="absolute bg-black w-full h-full bg-opacity-20 flex justify-center items-center"
        onClick={closeModal}
    >
        <div
            className="bg-black text-gray-400 bg-opacity-95 w-1/3 rounded-md p-8"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="text-gray-200 mb-5 font-semibold text-lg">
                Create Playlist
            </div>
            <div className="space-y-4 flex flex-col justify-center items-center">
                <Textfield
                    label="Name"
                    labelClassName={"text-blue-700"}
                    placeholder="Playlist Name"
                    value={playlistName}
                    setValue={setPlaylistName}
                />
                <Textfield
                    label="Thumbnail"
                    labelClassName={"text-blue-700"}
                    placeholder="Thumbnail"
                    value={playlistThumbnail}
                    setValue={setPlaylistThumbnail}
                />
                <div
                    className="border border-blue-900 bg-blue-900 hover:bg-black font-xl w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
                    onClick={createPlaylist}
                >
                    Create
                </div>
            </div>
        </div>
    </div>
    );
};
export default CreatePlaylistModals;