function api(path, method, body) {
  const url = "http://localhost:8080" + path;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
}

async function getWorks() {
  try {
    let data = await api("/api/v1/work/all", "GET", null);

    if (data.status === 200) {
      let res = await data.json();

      return {
        payload: res,
        type: "success",
      };
    } else if (data.status === 400) {
      let res = await data.json();

      return {
        payload: res.error.message,
        type: "error",
      };
    }
  } catch (error) {
    return {
      payload: "error occured",
      type: "error",
    };
  }
}

async function deleteWork(id) {
  try {
    let data = await api(`/api/v1/work/delete/${id}`, "DELETE");
    if (data.status === 200) {
      let res = await data.json();

      return {
        payload: res,
        type: "success",
      };
    } else if (data.status === 400) {
      let res = await data.json();

      return {
        payload: res.error.message,
        type: "error",
      };
    } else if (data.status === 500) {
      let res = await data.json();

      return {
        payload: res.error,
        type: "error",
      };
    }
  } catch (error) {
    return {
      payload: "error occured",
      type: "error",
    };
  }
}

async function addNewWork(work) {
  try {
    let data = await api("/api/v1/work/add", "POST", work);

    if (data.status === 200) {
      let res = await data.json();

      return {
        type: "success",
        payload: res,
      };
    } else if (data.status === 400) {
      let res = await data.json();

      return {
        payload: res.error.message,
        type: "error",
      };
    } else if (data.status === 500) {
      let res = await data.json();

      return {
        payload: res.error,
        type: "error",
      };
    }
  } catch (error) {
    return {
      payload: "error occured",
      type: "error",
    };
  }
}

async function workUpdate(work, id) {
  try {
    let data = await api(`/api/v1/work/update/${id}`, "PUT", work);
    if (data.status === 200) {
      let res = await data.json();

      return {
        payload: res,
        type: "success",
      };
    } else if (data.status === 400) {
      let res = await data.json();

      return {
        payload: res.error.message,
        type: "error",
      };
    } else if (data.status === 500) {
      let res = await data.json();

      return {
        payload: res.error,
        type: "error",
      };
    }
  } catch (error) {
    return {
      payload: "error occured",
      type: "error",
    };
  }
}

async function getWorkById(id) {
  try {
    let data = await api(`/api/v1/work/find/by/workId/${id}`, "GET", null);

    if (data.status === 200) {
      let res = await data.json();

      return {
        payload: res,
        type: "success",
      };
    } else if (data.status === 400) {
      let res = await data.json();

      return {
        payload: res.error.message,
        type: "error",
      };
    } else if (data.status === 500) {
      let res = data.json();

      return {
        payload: res.error,
        type: "error",
      };
    }
  } catch (error) {
    return {
      payload: "an error occured",
      type: "error",
    };
  }
}

export { getWorks, deleteWork, addNewWork, workUpdate, getWorkById };
