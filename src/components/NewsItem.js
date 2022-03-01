import React from "react";

const NewsItem = (props) => {
  return (
    <div className="card">
      <img
        src={props.photoUrl}
        className="card-img-top"
        alt="..."
        style={{
          height: "12em",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">
          {props.tittle}
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ left: "80%", zIndex: "1" }}
          >
            {props.source}
          </span>
        </h5>
        <p className="card-text">{props.description}</p>
        <a href={props.newsUrl} className="btn btn-primary">
          Read More
        </a>
        <div className="card-footer text-muted my-2">
          By {props.author}, Publised on {new Date(props.time).toGMTString()}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
