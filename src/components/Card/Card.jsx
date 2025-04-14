import React from "react";

const Card = ({ movie: { title, poster_path } }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{"N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{"original_language"}</p>

          <span>•</span>
          <p className="year">{"N/A"}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
