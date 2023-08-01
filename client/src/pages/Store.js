import { useNavigate, NavLink } from "react-router-dom";
import ringsImage from "../images/rings.jpeg";
import necklacesImage from "../images/necklaces.jpeg";

function Store() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

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
      <h1>Hello, {user.name}!</h1>
      <div>
        <NavLink to="/store/necklaces">
          <p>Necklaces</p>
          <img src={necklacesImage} alt="necklaces image" />
        </NavLink>
        <NavLink to="/store/rings">
          <p>Rings</p>
          <img src={ringsImage} alt="rings image" />
        </NavLink>
      </div>
    </div>
  );
}

export default Store;
