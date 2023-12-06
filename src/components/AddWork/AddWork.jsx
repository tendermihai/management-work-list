import React from "react";
import { useNavigate } from "react-router";

const AddWork = () => {
  const navigate = useNavigate();

  const handleCreateWorkPage = () => {
    navigate("/work-create");
  };
  return (
    <>
      <div className="card card-work-add text-white bg-secondary mb-3 add-work">
        <div className="card-body">
          <h4
            className="card-title card-title-add"
            onClick={handleCreateWorkPage}
          >
            + New Work
          </h4>
        </div>
      </div>
    </>
  );
};

export default AddWork;
