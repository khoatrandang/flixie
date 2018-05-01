import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  { Container, Field, Control, Label, Input, Columns, Column, Button } from 'bloomer';
import "bulma/css/bulma.css";
import MoviesList from "./MoviesList";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allMovies: [],
			movies:    [],
			isLoading: true,
			page:      1
		}
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async fetchMovies(page) {
		const movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=${page}`;
		const results = await fetch(
			movieUrl
		);
		const data = await results.json();
		return data.results;
	}

	async componentDidMount() {
		this.movies = await this.fetchMovies(this.state.page);

		this.sleep(3000);

		this.setState({
			allMovies: this.movies,
			movies: this.movies,
			isLoading: false
		});
	}

	async loadMore(e) {
		const page = this.state.page + 1;
		const newResults = await this.fetchMovies(page);
		this.newMoviesList = this.state.movies.concat(newResults);
		this.setState({
			page,
			movies: this.newMoviesList
		});
	}

	handleSearch(value) {
		const filteredMovies = this.state.allMovies.filter( m => m.title.indexOf(value) !== -1 );
		this.setState({
			movies: filteredMovies !== undefined ? filteredMovies : this.state.allMovies
		});
	}

	handleSortByRatingClick(e) {
		alert("Sorting by rating");
	}

	render() {
		let content;
		if ( this.state.isLoading ) {
			content = <h1>I am loading! </h1>
		} else {
			content = <MoviesList isLoading={ this.state.isLoading } handleLoadMoreClick={ (e) => this.loadMore(e) } movies={ this.state.movies }></MoviesList>
		}
		return (
			<Container>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Welcome to React</h1>
					</header>
					<Columns isCentered>
						<Column isSize='1/2'>
							<Field>
								<Label>Search</Label>
								<Control>
									<Input type="text" placeholder='Search' onChange={ (e) => this.handleSearch(e.target.value) } />
								</Control>
							</Field>
						</Column>
						<Column isSize={{mobile: 8}}>
							<Button isColor="primary" onClick={ (e) => this.handleSortByRatingClick(e) }>Sort by rating</Button>
						</Column>
					</Columns>
					<Container>
						{ content }
					</Container>
				</div>
			</Container>
		);
	}
}

export default App;
