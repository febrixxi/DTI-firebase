import React, { useEffect, useState } from 'react';
import app from '../../services/firebase';
import 'firebase/database';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  console.log(news);

  return (
    <div className="container">
      <h2>data corona</h2>
      {isLoading ? <p>loading</p> : <p>data</p>}
      {news.map((info, num) => (
        <div
          className="card card-groups col col-4"
          key={num}
          style={{ display: 'inline-flex' }}
        >
          <div className="card-header">
            <span style={{ float: 'left' }}>{info.date.slice(0, 10)}</span>
          </div>
          {info.activity.map((infoNested, subNum) => (
            <div className="card-body" key={subNum}>
              <p style={{ textTransform: 'capitalize' }}>{infoNested.title}</p>
              <a
                href={infoNested.url}
                className="btn btn-primary"
                style={{ float: 'right' }}
              >
                Read Here
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default CoronaNews;
