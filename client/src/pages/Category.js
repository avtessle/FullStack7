import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Category() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    let savedJewelry = localStorage.getItem(category);
    if (!savedJewelry) {
      const url = `http://localhost:3000/store/${category}`;
      getData(url, setJewelry);
      localStorage.setItem(category, JSON.stringify(jewelry));
    } else {
      setJewelry(JSON.parse(savedJewelry));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(category, JSON.stringify(jewelry));
  }, [jewelry]);

  const getData = async (url, setData) => {
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

  const addData = async (url, data, setData) => {
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

  const editData = async (url, data, setData) => {
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

  const deleteData = async (url, recordId, setData) => {
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

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {jewelry.map((item) => (
          <li key={item.id}>
            <p>ID: {item.id}</p>
            <p>Category: {item.category}</p>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
