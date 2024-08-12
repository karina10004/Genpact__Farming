import React, { useEffect, useState } from 'react';
import './News.css';
import Navbar from '../../components/home/Navbar';
function News() {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=agriculture&sortBy=popularity&apiKey=c43690ec9a31422bb267d83deb968e73');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        console.error('There was a problem fetching data from the API:', error);
      }
    };
    fetchNews();
  }, []);

  // Get current news
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />

      <div className="News">
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 shape-primary">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index}></span>
            ))}
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 mx-auto text-center">
                <span className="badge badge-danger badge-pill mb-3">News</span>
              </div>
            </div>
            <div className="row row-content">
              <div className="col-md-12 mb-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card text-white bg-gradient-secondary mb-3">
                      <div className="card-header">
                        <span className="text-warning display-4">Agriculture News</span>
                      </div>
                      <div className="card-body text-dark">
                        <table className="table table-striped table-hover table-responsive table-bordered bg-gradient-white text-center display" id="myTable">
                          <thead>
                            <tr className="font-weight-bold text-default">
                              <th><center>Image</center></th>
                              <th><center>Title</center></th>
                              <th><center>Author</center></th>
                              <th><center>Published</center></th>
                              <th><center>Visit</center></th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentNews.map((news, index) => (
                              <tr key={index} className="text-center">
                                <td><img className="img img-thumbnail" src={news.urlToImage || 'https://via.placeholder.com/100'} alt="News thumbnail" width="100px" /></td>
                                <td className="text-wrap text-justify">{news.title}</td>
                                <td className="text-wrap text-justify">{news.author || 'Unknown'}</td>
                                <td className="text-justify">{new Date(news.publishedAt).toLocaleDateString()}</td>
                                <td><button className="btn btn-sm btn-info"><a href={news.url} className="nav-link text-white" target="_blank" rel="noopener noreferrer">Visit</a></button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="pagination">
                          {[...Array(Math.ceil(newsData.length / newsPerPage)).keys()].map(number => (
                            <button key={number + 1} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
                              {number + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default News;
