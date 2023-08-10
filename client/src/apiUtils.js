export const getData = async (url, setData, navigate) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => {
      console.error("Error fetching data:", error);
      navigate("/error");
    });
};

export const addData = async (url, data, setData, navigate) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.status === 200) {
      const newData = await response.json();
      setData((prevData) => [...prevData, newData]);
    }
  } catch (error) {
    console.error("Error adding new data:", error);
    navigate("/error");
  }
};

//id=id type to edit by
export const editData = async (url, data, setData, id, navigate) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.status === 200) {
      const updatedRecord = await response.json();
      if (setData !== null) {
        setData((prevData) => {
          return prevData.map((record) => {
            if (record[id] === updatedRecord[id]) {
              return updatedRecord;
            }
            return record;
          });
        });
      }
    }
  } catch (error) {
    console.error("Error updating data:", error);
    navigate("/error");
  }
};

//id=an array of all the id types to delete by (delete if all id matches)
export const deleteData = async (
  url,
  record,
  setData,
  idArr = ["id"],
  navigate
) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      setData((prevData) => {
        return prevData.filter((currentRecord) => {
          for (let i = 0; i < idArr.length; i++) {
            if (currentRecord[idArr[i]] !== record[idArr[i]]) {
              return true; // Include if any id doesn't match
            }
          }
          return false; // Exclude if all ids match
        });
      });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    navigate("/error");
  }
};

export const deleteAllData = async (url, setData, navigate) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      setData([]);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    navigate("/error");
  }
};
