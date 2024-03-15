
import axios from "axios";
import React, { useState } from "react"
import { useEffect } from "react"
import "./Dashboard.css";

export const Dashboard = ()=>{

    const [files, setFiles] = useState<any>([]);
    const userId = "";
    useEffect(()=>{
        const fetchUserFiles = async()=>{
            try{
                const baseUrl = "http://localhost:7000"
                const email = localStorage.getItem("email");
                const fetchedFiles = await axios.get(`${baseUrl}/upload/${email}`); 
                console.log("fetched files", fetchedFiles.data);

                const newFiles = fetchedFiles.data.map(file=>{
                    try {
                        const blobFile = new Blob([file.data.data],{type:file.contentType});
                        let url = URL.createObjectURL(blobFile);
                        console.log("url", url);
                        return { ...file, url };
                    } catch (error) {
                        console.error("Error creating Blob:", error);
                        return null;
                    }

                })
                setFiles(newFiles.filter(file => file !== null));
              


            }catch(err){
                console.log("error", err);
                setFiles([]);
            }
            
        }
        fetchUserFiles();
    },[])
    return (
        <>
        <h1 style={{
            textAlign:"center"
        }}>User Files</h1>
        <div className="file-container">
            {
                files.map((file, index)=>{
                    return<div className="file-box" key={index}>
                        
                        {file!=null && file.contentType.startsWith("image/")? (
                        <img
                            src={file.url}
                            alt="file"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    ) : file!=null && file.contentType.startsWith("video/")? (
                        <video
                            src={file.url}
                            controls
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    ) : null}
                    </div>
                })
            }

        </div>
        </>
    )
}