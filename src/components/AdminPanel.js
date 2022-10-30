import React, { useState } from "react";
import {
  Input,
  Button,
  Progress,
  Card,
  Header,
  Label,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import "../App.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import * as firebase from "./firebase";

export default function AdminPanel() {
  // files uploading
  const [progress, setProgress] = useState(0);
  const [albumName, setAlbumNameValue] = useState("");
  const [genreType, setGenreTypeValue] = useState("");
  const [title, setTitleValue] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [file, setFile] = useState();
  const [ButtonState, setButtonState] = useState(true);

  const setFileName = (e) => {
    checkForEmptyness();
    setFile(e.target.files[0]);
  };

  const setAlbumName = (e) => {
    setAlbumNameValue(e.target.value);
  };

  const setGenreName = (e) => {
    setGenreTypeValue(e.target.value);
  };

  const setTitleName = (e) => {
    setTitleValue(e.target.value);
  };
  const setDate = (e) => {
    setReleaseDate(e.target.value);
  };

  const sendFile = (e) => {
    uploadFile(file); 
    e.preventDefault();
  };

  const checkForEmptyness = () => {
    if ((albumName && genreType && title && releaseDate) === "") {
      alert("please complete all fields");
    } else {
      setButtonState(false);
    }
  };

  const uploadFile = (file) => {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, `Excepcion-Music-Tracks/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_change",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((fileUploaded) => {
          saveDetails(fileUploaded);
        });
      }
    );
  };
  const saveDetails = async (link) => {
    const data = {
      genre: genreType,
      album: albumName,
      url: link,
      title: title,
      releaseDate: releaseDate,
    };

    try {
      await axios
        .post("http://localhost:4000/api/admin/add-track", data)
        .then((response) => console.log(response.data));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div>
        <Card
          style={{
            width: "400px",
            backgroundColor: "white",
            border: "1px solid #333",
            borderRadius: "0.5rem",
            padding: "0.5rem",
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <Header
            as="h2"
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            Enter Track Details
          </Header>{" "}
          <br />
          <br />
          <form onSubmit={sendFile}>
            {/* title */}
            <Label pointing="below" content="Enter Title" />
            <br />
            <Input
              icon="font"
              iconPosition="left"
              placeholder="track title"
              value={title}
              onChange={setTitleName}
            />
            <br />
            <br />
            {/* album */}
            <Label pointing="below" content="Enter Album Name" />
            <br />
            <Input
              icon="address card outline"
              iconPosition="left"
              placeholder="Album Name"
              value={albumName}
              onChange={setAlbumName}
            />
            <br />
            <br />
            {/* date */}
            <Label pointing="below" content="Choose year of release" />
            <br />
            <Input
              placeholder="Release Date"
              value={releaseDate}
              iconPosition="left"
              icon="calendar"
              onChange={setDate}
              type="date"
            />
            <br />
            <br />

            {/* genre */}
            <Label pointing="below" content="Enter Genre" />
            <br />
            <Input
              icon="image"
              iconPosition="left"
              placeholder="Genre Type"
              value={genreType}
              onChange={setGenreName}
            />
            <br />
            <br />
            <Label pointing="below" content="Choose the music file" />

            <Input
              icon="music"
              iconPosition="left"
              type="file"
              onChange={setFileName}
            />
            <br />
            <br />
            {/* <Label pointing="below" content="Ent" color="orange" />
            <Input
              icon="image"
              iconPosition="right"
              type="file"
              accept=".jpg, .jpeg, .png"
            />
            <br />
            <br /> */}
            <Message
              content="please cross check and artwork will be required later"
              color="red"
            ></Message>
            <div
              style={{
                contntAlign: "center",
              }}
            >
              <Button
                type="submit"
                color="orange"
                icon="upload"
                disabled={ButtonState}
                fluid
                size="small"
              />
              {/* <Button icon="times" color="red"/> */}
            </div>
          </form>
          <br />
          <Progress
            percent={progress}
            indicating
            size="small"
            color="green"
          />
        </Card>
        \
        <br />
      </div>
    </>
  );
}
