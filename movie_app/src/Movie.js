import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import LinesEllipsis from 'react-lines-ellipsis'

// App.js 로 보내지는 component는 Movie 컴포넌트임.
// class Movie extends Component {
//     // 컴포넌트 안에는 render / return 필수!

//     static propTypes = {
//         // 원하는 출력 방식 설정
//         title: PropTypes.string.isRequired,
//         poster: PropTypes.string.isRequired
//     }

//     render() {
//         // console.log(this.props);
//         // props로 정보가 넘어온다. 영화 제목은 title이라고 정의해서 넘겨주었다.
//         // 부모 컴포넌드(App)가 자식컴포넌트(Movie)한테 정보를 넘겨주는 것.
//         return(
//             <div>
//                 <MoviePoster poster={this.props.poster}/>
//                 {/* MoviePoster 컴포넌트를 만들지 않고, 이런 식으로 포스터를 받을 수 잇음 */}
//                 {/* <img src={this.props.poster}></img> */}
//                 <h1>{this.props.title}</h1>
//             </div>
//         )
//     }
// }

// MoviePoster컴포넌트를 통해 Poster img를 받는 방법
// Movie -> MoviePoster props를 통해 정보를 받아오고, Movie에서는 MoviePoster를 사용함.
/* class MoviePoster extends Component{
    
    static propTypes = {
        poster: PropTypes.string.isRequired
    }
    
    render() {
        console.log(this.props)
        return(
            <img src={this.props.poster}></img>
            )
        }
    }
    */


function Movie({ title, poster, genres, synopsis, rate }) {
    console.log(genres)
    return (
        <div className="Movie_Card">
            <div className="Movie_columns">
                <MoviePoster poster={poster} alt={title} />
            </div>

            <div className="Movie_columns">
                <h1>{title}</h1>
                <div className="Movie_Genres">
                    genre : {genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
                </div>
                <div className="Movie_Sysnopsis">
                    <LinesEllipsis
                        text={synopsis}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />
                </div>
                <p className="Movie_rate">
                    rate : {rate}
                </p>
            </div>
        </div>
    )
}

// dump Component (state, willmount, ... 필요 없고, return 만 해주면 됨 --> class Comp 대신, functional Comp 사용)
function MoviePoster({ poster, alt }) {
    return (
        //  클래스 컴포넌트가 아니니까 this.props도 써주지 않는다.
        <img src={poster} alt={alt} title={alt} className="Movie_Poster" />
    )
}

function MovieGenre({ genre }) {
    return (
        <span className="Movie_Genres">{genre}</span>
    )
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    rate: PropTypes.number.isRequired,
    synopsis: PropTypes.string.isRequired

}

MoviePoster.propTypes = {
    poster: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

// genre : ["Action", "Adventure", "Drama", "Fantasy"]
MovieGenre.propTypes = {
    genre: PropTypes.string.isRequired
}

export default Movie
