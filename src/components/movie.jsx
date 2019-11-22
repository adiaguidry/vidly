import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../util/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie.movie._id);
    console.log(movie.movie._id, movies);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  numberInDatabase() {
    if (this.state.movies.length === 0)
      return "Sorry, there are no movies in our database at this time.";
    return `Showing ${this.state.movies.length} in the database`;
  }
  getPageData() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  }
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no movies</p>;

    const { totalCount, data: movies } = this.getPageData();
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <div className="m-2">
              <NavLink to="/movies/new" className="btn btn-primary">
                New Movie
              </NavLink>
            </div>
            <p>Showing {totalCount} movies in the database</p>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
          </div>
        </div>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Movie;
