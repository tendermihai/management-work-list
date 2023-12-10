import React, { useState, useEffect } from "react";
import { workUpdate, getWorkById } from "../../service/work-service";
import { useNavigate, useParams } from "react-router";

const UpdateWork = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [workData, setWorkData] = useState({
    title: "",
    image: "",
    link: "",
  });

  useEffect(() => {
    handleUpdateWork();
  }, []);

  const handleUpdateWork = async () => {
    try {
      const data = await getWorkById(id);
      console.log("Data received:", data);

      if (data && data.payload) {
        console.log("Payload:", data.payload); // Log the payload

        // Set the entire workData object
        setWorkData(data.payload);
      } else {
        console.error("Data or payload is undefined:", data);
      }
    } catch (error) {
      console.error("Error fetching work data:", error);
    }
  };

  function handleImageChange(e) {
    const file = e.target.files[0];
    // console.log(file);
    //
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setWorkData({ ...workData, image: reader.result });
    };
    //
  }

  const handleUpdate = async () => {
    try {
      const work = {
        title: workData.title,
        image: workData.image,
        link: workData.link,
      };

      // Assuming workImage is a File object

      const result = await workUpdate({ work }, id);

      if (result.type === "success") {
        console.log("Update successful:", result.payload);
        // Navigate to the desired location upon success
        navigate("/");
      } else {
        console.error("Update failed:", result.payload);
      }
    } catch (error) {
      console.error("Error updating work:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <section className="create-work">
        <h1>Update Work</h1>
        <div className="main--flex">
          <div>
            <label htmlFor="workTitle">Work Title</label>
            <input
              id="workTitle"
              name="workTitle"
              type="text"
              value={workData.title}
              onChange={(e) =>
                setWorkData({ ...workData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="workImage">Work Image</label>
            <input
              id="workImage"
              name="workImage"
              type="file"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          <div>
            <label htmlFor="workLink">Work Link</label>
            <input
              id="workLink"
              name="workLink"
              type="text"
              value={workData.link}
              onChange={(e) =>
                setWorkData({ ...workData, link: e.target.value })
              }
            />
          </div>
        </div>
        <button className="button updateWork" onClick={handleUpdate}>
          Update Work
        </button>
        <button
          className="button button-secondary cancelUpdateWork"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </section>
    </>
  );
};

export default UpdateWork;
