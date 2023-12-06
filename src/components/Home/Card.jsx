// Card.jsx
import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { deleteWork } from "../../service/work-service";
import { useNavigate } from "react-router-dom";

const Card = ({ work, allWorks, masterCheckbox }) => {
  const [loadingState, setLoadingState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(masterCheckbox);
  const { id, title, image, link } = work;
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoadingState("loading");

      const response = await deleteWork(work.id);

      if (response.type === "success") {
        setLoadingState("success");
        allWorks();
      } else {
        setLoadingState("error");
        setErrorMessage(response.payload);
      }
    } catch (error) {
      setLoadingState("error");
      setErrorMessage("Error occurred while deleting the work");
    }
  };

  const handleUpdateWorkPage = () => {
    navigate(`/work-update/${id}`);
  };

  useEffect(() => {
    setIsChecked(masterCheckbox);
  }, [masterCheckbox]);

  return (
    <div className={`myCards ${isChecked ? "" : "hidden"}`}>
      <div className="card text-white bg-primary mb-3">
        <div className="card-header">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="card-checkbox"
          />
          ID: {id}
        </div>
        <div className="card-body">
          <h4 className="card-title">Title: {title}</h4>
          {image && <img src={image} alt={`Image for work ${id}`} />}
          <p className="card-text">
            Link:{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => window.open(`https://${link}`, "_blank")}
            >
              {link}
            </span>
          </p>
          <section className="btns">
            {isChecked && (
              <>
                <button className="delete-work" onClick={handleDelete}>
                  Delete
                </button>
                <button className="update-work" onClick={handleUpdateWorkPage}>
                  Update
                </button>
              </>
            )}
          </section>
        </div>
      </div>
      {loadingState === "loading" && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {loadingState === "error" && <p>{errorMessage}</p>}
    </div>
  );
};

export default Card;
