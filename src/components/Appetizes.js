import "./Components.css";
import React, { useEffect, useState } from "react";
import { Recipe } from "../features/recipes/Recipe";
import { getRandomRecipes } from "../api/api";
import {
  NavLink,
  useParams,
  useHistory,
} from "react-router-dom";

export const Appetizes = ({ tags, limit }) => {
  const { page } = useParams();
  const history = useHistory();
  const p = parseInt(page, 10);
  const [recipes, setRecipes] = useState([]);

  const renderRecipes = () => {
    getRandomRecipes(tags, limit).then((recipes) =>
      setRecipes(
        recipes.map((recipe) => <Recipe recipe={recipe} key={recipe.id} tags={tags} />)
      )
    );
  };

  useEffect(() => {
    renderRecipes();
  }, []);

  const handleViewMore = () => {
    renderRecipes();
  };

  return (
    <div className="collection" aria-label="Appetizes / Snacks">
      <h2 className="banner">
        <span>APPETIZES / SNACKS </span>
        <span className="line"></span>
        <span>
          <button className="btn pull-right" onClick={handleViewMore}>
            <NavLink className="view-more" to={`/${tags}/${p + 1}`}>view more appetizes / snacks </NavLink>
          </button>
        </span>
      </h2>
      <div className="collection-items">
        {recipes}
      </div>
    </div>
  );
};