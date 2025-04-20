import React, { useEffect } from "react";

const Card = ({
  movie: { title, poster_path, vote_average, original_language, release_date },
}) => {
  // useEffect(() => {
  //   const doubleNum = (num, callback) => {
  //     const result = num * 2;
  //     callback(result);
  //   };

  //   const displyText = (text) => {
  //     console.log(`Result is: ${text}`);
  //   };

  //   doubleNum(5, displyText);
  // }, []);

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">{release_date}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
