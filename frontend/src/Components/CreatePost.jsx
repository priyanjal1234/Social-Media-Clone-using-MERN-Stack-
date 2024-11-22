import React, { useState } from "react";
import { createPost } from "../services/PostService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    let navigate = useNavigate()
    const [caption, setcaption] = useState('')
    const [images, setimages] = useState([])
 

    function handleImagesChange(e) {
        setimages([...e.target.files])
    }



    async function handlePostCreation(e) {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append("caption",caption)
        images.forEach(img => {
            formdata.append("images",img)
        })
        let createPostRes = await createPost(formdata)
        if(createPostRes.status === 201) {
            toast.success("Post Created Successfully")
            navigate("/home")
        }
    }

    return (
        <div className="w-full h-screen bg-zinc-900 text-white p-10">
        <h1 className="text-3xl font-semibold mb-5">Create Post</h1>
        <form onSubmit={handlePostCreation}>
            <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setcaption(e.target.value)}
            className="w-full p-2 mb-4 outline-none bg-gray-800 border-none text-white"
            />

            <div className="mb-4">
            <label className="block mb-2">Upload Images</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="block w-full"
            />
            </div>

            <button className="px-3 py-2 bg-blue-600 rounded-lg" type="submit">
                Create
            </button>
        </form>
        </div>
    );
}

export default CreatePost;
