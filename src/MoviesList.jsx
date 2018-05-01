import React, { Component } from 'react';
import MovieCard from "./MovieCard";
import { Button } from 'bloomer';

export default class MoviesList extends Component {
    render() {
        const { movies, isLoading, handleLoadMoreClick } = this.props;
        return (
            <div>
                {
                    movies.map( (m, i) => <MovieCard key={i} movie={m} />)
                }
                <Button isLoading={ isLoading } isColor="primary" onClick={ (e) => handleLoadMoreClick(e) }>Load More</Button>
            </div>
        )
    }
}
