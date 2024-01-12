import { useEffect, useState } from 'react';
import axios from 'axios';

const AxiosExample = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((res) => {
        if (!res.data.meals || !Array.isArray(res.data.meals)) {
          throw new Error('Invalid data format received from the API');
        }
        setMeals(res.data.meals);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      {meals.map((meal) => (
        <img key={meal.idMeal} src={meal.strMealThumb} alt={meal.strMeal} width={400} />
      ))}
    </div>
  );
};

export default AxiosExample;
