import React from "react";
import { useNavigate } from "react-router";

const AddWork = () => {
  const navigate = useNavigate();

  const handleCreateWorkPage = () => {
    navigate("/work-create");
  };
  return (
    <div className="d-flex justify-content-end">
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleCreateWorkPage}
      >
        + New Work
      </button>
    </div>
  );
};

export default AddWork;
