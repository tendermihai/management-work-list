import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { deleteWork } from "../../service/work-service";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const Card = ({ work, allWorks, onToggle, isChecked, hideWhenToggleAll }) => {
  const [loadingState, setLoadingState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleCheckboxToggle = (e) => {
    onToggle(id, e.target.checked);
  };

  return (
    <div
      className={`myCards ${isChecked && hideWhenToggleAll ? "hidden" : ""}`}
    >
      <div className="card text-white bg-primary mb-3">
        <div className="card-header">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => handleCheckboxToggle(e)}
            className="card-checkbox"
          />
          ID: {id}
        </div>
        <div className="card-body">
          <h4 className="card-title">Title: {title}</h4>
          {image && (
            <img src={image} alt={`Image for work ${id}`} width="150px" />
          )}
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
            <button className="delete-work" onClick={handleDelete}>
              Delete
            </button>
            <button className="update-work" onClick={handleUpdateWorkPage}>
              Update
            </button>
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
