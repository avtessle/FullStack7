import { useParams } from "react-router-dom";

function Category() {
  const { category } = useParams();

  return (
    <div>
      <h2>{category}</h2>
    </div>
  );
}

export default Category;
