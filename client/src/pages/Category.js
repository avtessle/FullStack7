import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, addData, editData, deleteData } from "../apiUtils";

function Category() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    let savedJewelry = localStorage.getItem(category);
    if (!savedJewelry) {
      const url = `http://localhost:3000/store/${category}`;
      getData(url, setJewelry, navigate);
      localStorage.setItem(category, JSON.stringify(jewelry));
    } else {
      setJewelry(JSON.parse(savedJewelry));
    }
  }, [category]);

  useEffect(() => {
    localStorage.setItem(category, JSON.stringify(jewelry));
  }, [category, jewelry]);

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
