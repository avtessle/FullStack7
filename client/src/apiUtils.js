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
    const response = await fetch(url, requestOptions, navigate);
    if (response.status === 200) {
      const newData = await response.json();
      setData((prevData) => [...prevData, newData]);
    }
  } catch (error) {
    console.error("Error adding new data:", error);
    navigate("/error");
  }
};

export const editData = async (url, data, setData, navigate) => {
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
      setData((prevData) => {
        return prevData.map((record) => {
          if (record.id === updatedRecord.id) {
            return updatedRecord;
          }
          return record;
        });
      });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    navigate("/error");
  }
};

export const deleteData = async (url, recordId, setData, navigate) => {
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
        return prevData.filter((record) => record.id !== recordId);
      });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    navigate("/error");
  }
};
