import React from "react";
import { useState, useEffect } from "react";
import { workUpdate, getWorkById } from "../../service/work-service";
import { useNavigate, useParams } from "react-router";

let UpdateWork = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [workTitle, setworkTitle] = useState("");
  const [workImage, setWorkImage] = useState("");
  const [workLink, setWorkLink] = useState("");

  // const { student_id } = useLocation().state;
  // const { id } = useLocation().state

  useEffect(() => {
    handleUpdateWork();
  }, []);

  let handleUpdateWork = async () => {
    try {
      const data = await getWorkById(id);
      console.log(data, "this is data of getworkbyid");

      setworkTitle(data.payload.title);
      setWorkImage(data.payload.image);
      setWorkLink(data.payload.link);
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      const work = {
        title: workTitle,
        image: workImage,
        link: workLink,
      };
      await workUpdate({ work }, id);
      // write to navigate to book-show after updated btn is clicked
      navigate("/");
    } catch (error) {
      console.log("Error updating book:", error);
    }
  };

  let handleCancel = () => {
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
              value={workTitle}
              onChange={(e) => {
                setworkTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="workImage">Work Image</label>
            <input
              id="workImage"
              name="workImage"
              type="text"
              value={workImage}
              onChange={(e) => {
                setWorkImage(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="workLink">Work Link</label>
            <input
              id="workLink"
              name="workLink"
              type="text"
              value={workLink}
              onChange={(e) => {
                setWorkLink(e.target.value);
              }}
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
