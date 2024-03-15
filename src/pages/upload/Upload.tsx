
import React, { useEffect } from "react";
import { useState } from "react";
import "./Upload.css";
import deleteIcon from "../../assets/delete.png"
import axios from "axios";

type FileType = "image" | "video" | "";

export const Upload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [selected, setSelected] = useState<boolean>(false)
    const [fileType, setFileType] = useState<FileType>("");
    const [tag, setTag] = useState("");
    const [userId, setUserId] = useState("");
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        console.log("file ==>",file)
        const type = file.type;
        if (type.startsWith("image/")) {
            setFileType("image");
        } else if (type.startsWith("video/")) {
            setFileType("video");
        }
        setSelected(true);

    }

    const handleDeleteFile = ()=>{
        setFile(null);
        setFileType("");
        setSelected(false);
    }
    const baseUrl = "http://localhost:7000"
    useEffect(()=>{
       const  getUser =async()=>{
            const email = localStorage.getItem('email')
            const user = await axios.get(`${baseUrl}/user/email/${email}`);
            console.log("fetched user", user);
            setUserId(user.data.userId);
        }
        getUser();
        
    },[])

    const handleUpload = async()=>{
        try{
            
                

                    const formdata = new FormData();
                    formdata.append("file", file?file:"");
                    formdata.append("userId", userId);
                    formdata.append("tag", tag);

                    
                const uploadedFile = await axios.post(`${baseUrl}/upload/`, formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }});
                    console.log("file uploaded successfully", uploadedFile)
        }catch(err){
            console.log("error in file upload")
        }
    }
    return (
        <div className="upload-container">
            <div className="upload-box" >
                {selected &&<img src={deleteIcon} alt="deleteIcon"
                style={{
                    position:"absolute",
                    right:"10px",
                    top:"10px",
                    height:"20px",
                    width:"20px",
                    cursor:"pointer"
                }} 
                onClick={handleDeleteFile}
                />}
                {!selected && <p
                style={{
                    position:"relative",
                    top:"45%"
                }}
                > Drag and drop file or Click to browse</p>}
                {!selected ? <input
                    required
                    type="File"
                    accept="image/*, video/*"
                    style={{
                        // display:"none",
                        // border:"1px solid yellow",
                        height:"100%",
                        width:"100%",
                        opacity:0
                     
                    }}
                  
                    onChange={(e) => handleImageChange(e)}
                    placeholder="Upload an Image"
                /> : (
                    <>
                    {fileType === "image"&&file!=null ? (
                        
                        <img
                            src={URL.createObjectURL(file)}
                            alt="file"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    ) : fileType === "video" && file!=null? (
                        <video
                            src={URL.createObjectURL(file)}
                            controls
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    ) : null
                    
                    }
                    {/* {file!=null&&console.log("file url==>",URL.createObjectURL(file))} */}
                    </>
                )}
            </div>
            <input type="text" name="tag" id="tag-input" onChange={(e)=>{setTag(e.target.value)}} className="tag-input" placeholder="Enter a tag"/>
            <button className="upload-button" onClick={handleUpload}>Upload File</button>
        </div>
    )
}



