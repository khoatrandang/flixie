import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardHeader, CardHeaderTitle, CardHeaderIcon, Icon, CardImage, Image, CardContent, Content, Media, MediaLeft, MediaContent, Title, Subtitle } from 'bloomer';

import "./MovieCard.css";

export default class MovieCard extends Component {
    render() {
        const { title, poster_path, backdrop_path, overview, release_date } = this.props.movie;
        return (
            <Card>
                <CardHeader>
                    <CardHeaderTitle>
                        { title }
                    </CardHeaderTitle>
                    <CardHeaderIcon>
                        <Icon className="fa fa-angle-down" />
                    </CardHeaderIcon>
                </CardHeader>
                <CardImage>
                    <Image isRatio='4:3' src={'https://image.tmdb.org/t/p/w342' + poster_path} />
                </CardImage>
                <CardContent>
                    <Media>
                        <MediaLeft>
                            <Image isSize='48x48' src={'https://image.tmdb.org/t/p/w45' + backdrop_path} />
                        </MediaLeft>
                        <MediaContent>
                            <Title isSize={4}>{ title }</Title>
                            <Subtitle isSize={6}>{ release_date }</Subtitle>
                        </MediaContent>
                    </Media>
                    <Content>
                        { overview }
                    </Content>
                </CardContent>
            </Card>
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        poster_path: PropTypes.string,
        backdrop_path: PropTypes.string,
        overview: PropTypes.string,
        release_date: PropTypes.string
    }),
}
