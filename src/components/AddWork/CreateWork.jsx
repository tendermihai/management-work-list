import React from "react";
import { addNewWork } from "../../service/work-service";
import { useState } from "react";
import { Alert } from "antd";
import { useNavigate } from "react-router";

const CreateWork = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const [workData, setWorkData] = useState({
    title: "",
    image: "",
    link: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loadingState, setLoadingState] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async function () {
      document.getElementById("display").src = reader.result;

      setWorkData({ ...workData, image: b64toBlob(reader.result) });
    };
    reader.readAsDataURL(file);
  }

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = b64Data;
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  let handleCreateWork = async () => {
    try {
      handleCheckValidation();

      if (errors.length === 0) {
        const work = {
          title: workData.title,
          image: workData.image,
          link: workData.link,
        };

        const response = await addNewWork(work);

        console.log(response.type, "this is response.type");
        console.log(errors.length, "length of errors");

        if (response.type === "success") {
          setLoadingState("success");
          navigate("/");
        } else {
          setLoadingState("error");
          setErrorMessage(response.payload);
        }
      }
    } catch (error) {
      setLoadingState("error");
      setErrorMessage("An error occured" + error.message);
    }
  };

  let handleCancelButton = () => {
    navigate("/");
  };

  let handleCheckValidation = () => {
    let aux = [];

    if (workData.title === "") {
      aux.push("Please enter a work title");
    }

    if (workData.image === "") {
      aux.push("Please enter an image");
    }

    if (workData.link === "") {
      aux.push("Please enter a link");
    }

    setErrors(aux);
  };

  return (
    <>
      <h2>Create Work</h2>

      {errors.length > 0 &&
        errors.map((element) => {
          return <Alert message={element} type="warning" />;
        })}

      <section>
        <div className="main--flex">
          <div className="form-group">
            <label for="exampleInputTitle" className="form-label mt-4">
              Work Title
            </label>
            <input
              type="email"
              className="form-control"
              aria-describedby="exampleInputTitle"
              placeholder="Enter a work title"
              value={workData.title}
              onChange={(e) =>
                setWorkData({ ...workData, title: e.target.value })
              }
            />
            <p className="error-message">
              {errorMessage === "Please enter a work name"
                ? errorMessage
                : null}
            </p>
          </div>

          <div className="form-group">
            <label for="exampleInputImage" className="form-label mt-4">
              Image
            </label>
            <input
              className="form-control"
              aria-describedby="exampleInputImage"
              type="file"
              onChange={(e) => handleImageChange(e)}
            />
            <p className="error-message">
              {errorMessage === "Please enter a date" ? errorMessage : null}
            </p>
          </div>

          <img
            id="display"
            src=""
            style={{ width: "150px", height: "150px" }}
            alt="Uploaded"
          />

          <div className="form-group">
            <label for="exampleInputLink" className="form-label mt-4">
              Link
            </label>
            <input
              className="form-control"
              id="exampleInputLink"
              type="text"
              placeholder="Enter a work link"
              value={workData.link}
              onChange={(e) =>
                setWorkData({ ...workData, link: e.target.value })
              }
            />
            <p className="error-message">
              {errorMessage === "Please enter a date" ? errorMessage : null}
            </p>
          </div>
        </div>

        <section className="create-work-btns">
          <button
            type="button"
            className="btn btn-primary"
            fdprocessedid="9shepe"
            onClick={handleCreateWork}
          >
            Create Work
          </button>
          <button
            type="button"
            className="btn btn-primary"
            fdprocessedid="9shepe"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </section>
      </section>
    </>
  );
};

export default CreateWork;
