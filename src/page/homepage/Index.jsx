import { useSearchMoviesQuery } from "../../redux/service";
import { Form, Field } from "react-final-form";
import validate from "validate.js";
import { useEffect, useState } from "react";

const constraints = {
  movie_title: {
    presence: true,
  },
};

function Index() {
  const [term, setTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };
  const { data, error, isLoading } = useSearchMoviesQuery(term);

  useEffect(() => {
    console.log("Search Result:", data);
  }, [data, error, isLoading]);

  useEffect(() => {
    console.log("Search Result:", data);
  }, [data, error, isLoading]);

  const onSubmit = (values) => {
    const newTerm = values.movie_title;

    setSearchHistory((prevSearchHistory) => {
      const updatedHistory = [...prevSearchHistory, newTerm].slice(-5);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });

    // Update the search term
    setTerm(newTerm);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };
  return (
    <div className="container">
      <div className="row justify-content-center pt-5">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header">Enter Movie Title</div>
            <div className="card-body">
              <div className="p-3">
                <Form
                  onSubmit={onSubmit}
                  validate={validateForm}
                  render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex gap-3">
                        <Field
                          name="movie_title"
                          component="input"
                          type="text"
                          className="form-control shadow-none"
                          placeholder="Enter Movie Title"
                        />

                        <button type="submit" className="btn btn-success">
                          Search
                        </button>
                      </div>
                      {form.getState().submitFailed &&
                        form.getState().errors.movie_title && (
                          <span className="text-danger">
                            {form.getState().errors.movie_title}
                          </span>
                        )}
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center pt-4 pb-2">
        <div className="col-lg-8">
          <div className="d-flex gap-3">
            {searchHistory.length > 0 && <h4>Recent Searches:</h4>}
            {searchHistory.map((search, index) => (
              <button
                key={index}
                className="btn badge rounded-pill text-bg-success text-sm"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center lead pt-4">Loading search results...</p>
      ) : error ? (
        <p className="text-center text-danger pt-4">
          Error fetching data: {error.message}
        </p>
      ) : (
        <div className="row pt-5 row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {data.Search &&
            data.Search.map((movie) => (
              <div key={movie.imdbID} className="col mb-4">
                <div
                  className="card"
                  onClick={() => handleMovieClick(movie)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={movie.Poster}
                    className="card-img-top"
                    alt={movie.Title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            ))}
          {selectedMovie && (
            <div
              className="modal"
              style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Movie Details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setSelectedMovie(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="card mb-3" style={{ maxWidth: "600px" }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={selectedMovie.Poster}
                            className="img-fluid rounded-start"
                            alt={selectedMovie.Title}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {selectedMovie.Title}
                            </h5>
                            <p className="card-text">
                              Type: {selectedMovie.Type}
                            </p>
                            <p className="card-text">
                              Year: {selectedMovie.Year}
                            </p>
                            <p className="card-text">
                              imdbID: {selectedMovie.imdbID}
                            </p>
                            <p>
                              <small className="text-muted">
                                No description & IMDB score for the search
                                results
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Index;
