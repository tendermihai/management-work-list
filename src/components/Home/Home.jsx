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

  function readBlobAsDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (event) {
        resolve(event.target.result);
      };

      reader.onerror = function (event) {
        reject(event.target.error);
      };

      reader.readAsText(blob);
    });
  }

  const handleWorks = async () => {
    setLoadingState("loading");

    const response = await getWorks();

    if (response.type === "success") {
      setLoadingState("success");
      const cards = [];
      for (let i = 0; i < response.payload.length; i++) {
        const item = response.payload[i];

        const imageUrl = `http://localhost:8080/api/v1/work/getImage/${item.id}`;

        // Fetch the binary resource as a Blob
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const image = await readBlobAsDataURL(blob);
        const card = {
          id: item.id,
          title: item.title,
          image,
          link: item.link,
          hidden: false,
        };

        cards.push(card);
      }

      setWorks(cards);
    } else {
      setLoadingState("error");
      setErrorMessage(response.payload);
    }
  };

  useEffect(() => {
    handleWorks();
  }, []);

  const handleMasterCheckboxChange = () => {
    setMasterCheckbox(!masterCheckbox);
  };

  const handleCardToggle = (cardId, checked) => {
    const updatedData = works.map((item) =>
      item.id === cardId ? { ...item, hidden: checked } : item
    );

    setWorks(updatedData);
  };

  return (
    <>
      <div className="master-checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={masterCheckbox}
            onChange={handleMasterCheckboxChange}
          />
          Hide selected works
        </label>
      </div>
      <AddWork />
      {loadingState === "success" && (
        <div className="container-cards">
          {works.length > 0 ? (
            works.map((item) => (
              <Card
                key={item.id}
                work={item}
                allWorks={handleWorks}
                onToggle={handleCardToggle}
                isChecked={item.hidden}
                hideWhenToggleAll={masterCheckbox}
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
