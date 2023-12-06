// Home.jsx
import React, { useEffect, useState } from "react";
import { getWorks } from "../../service/work-service";
import Spinner from "react-bootstrap/Spinner";
import Card from "./Card";
import AddWork from "../AddWork/AddWork";

const Home = () => {
  const [loadingState, setLoadingState] = useState("init");
  const [errorMessage, setErrorMessage] = useState("");
  const [works, setWorks] = useState([]);
  const [masterCheckbox, setMasterCheckbox] = useState(false);

  const handleWorks = async () => {
    setLoadingState("loading");

    const response = await getWorks();

    if (response.type === "success") {
      setLoadingState("success");
      setWorks(response.payload);
    } else {
      setLoadingState("error");
      setErrorMessage(response.payload);
    }
  };

  useEffect(() => {
    handleWorks();
  }, []);

  return (
    <>
      <div className="master-checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={masterCheckbox}
            onChange={() => setMasterCheckbox(!masterCheckbox)}
          />
          Toggle All Works
        </label>
      </div>
      <AddWork />
      {loadingState === "success" && (
        <div className="container-cards">
          {works.length > 0 ? (
            works.map((item) => (
              <Card
                work={item}
                key={item.id}
                allWorks={handleWorks}
                masterCheckbox={masterCheckbox}
              />
            ))
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      )}

      {loadingState === "loading" && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {loadingState === "error" && <p>{errorMessage}</p>}
    </>
  );
};

export default Home;
