import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsComponent = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `${capitalizeFirstLetter(props.category)}- NewsMonkey`;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  const updateArticle = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?${props.category}&country=${props.country}&category=${props.category}&apiKey=184f6cbcf1fd41bf92059744bd1ef359&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateArticle();
    // eslint-disable-next-line
  }, []);

  const handleBackTop = async () => {
    setPage(1);
    setArticles([]);
    updateArticle();
  };

  const fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?${props.catergory}&country=${props.country}&category=${props.category}&apiKey=184f6cbcf1fd41bf92059744bd1ef359&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
  };

  return (
    <>
      <h3 className="mt-5 pt-5 text-center">
        Latest News on {capitalizeFirstLetter(props.category)} by | NewsMonkey
      </h3>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length !== totalResult}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>
              Yay! You have seen it all <br />{" "}
              <button className="btn btn-primary" onClick={handleBackTop}>
                Go back to top
              </button>{" "}
            </b>
          </p>
        }
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 mb-3" key={element.url}>
                  <NewsItem
                    tittle={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    newsUrl={element ? element.url : ""}
                    photoUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://english.cdn.zeenews.com/sites/default/files/2021/08/30/965902-google-pixel-6-1.jpg"
                    }
                    author={element.author ? element.author : "unkown"}
                    time={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

NewsComponent.defaultProp = {
  country: "in",
  category: "general",
  pageSize: "8",
};

NewsComponent.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default NewsComponent;
