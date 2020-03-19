import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'

class App extends Component {

  // Render : componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps)_ -> shouldComponentUpdate() == true (업데이트 될게 있으면) -> componentWillUpdate() -> render() -> compnentDidUpdate()

  state = {}

  // componentWillMount() {
  //   // willMount : 사이클이 시작됨을 알림
  //   // api에 작업 요청
  //   console.log("will mount")
  // };

  componentDidMount() {
    this._getMovies()
  }

  // 영화를 불러오는 function 작성
  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      console.log(movie)
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image}
        genres={movie.genres}
        rate={movie.rating}
        synopsis={movie.synopsis}
        key={movie.id} 
      />
    })
    // const movies = [<Movie props />, <Movie props/>]
    return movies
  }

  // 이전 작업이 끝날때까지 기다리지 않음
  _getMovies = async() => {
    const movies = await this._callAPI()
    this.setState({
      movies
    })
    // this._callAPI()를 수행하여 return 된 결과를 movies에 넣고, 그걸 setState할 것.
    // await가 있기 때문에, _callAPI가 완료되기 전까지 setState는 수행되지않는다.
  }

  _callAPI = () => {
    return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    // .catch(err => console.log(err))
  }

  // 컴포너늩 안에 state가 바뀔 때 마다, render가 발생한다
  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App-loading"}>
        {this.state.movies ? this._renderMovies() : "Loading..."}
      </div>
    );
  }
}

/* 
Warning: Each child in a list should have a unique "key" prop. 라는 오류 뜬다.
이 오류를 없애기 위해서 각 movie(map 요소)마다 고유의 key값을 주어야함
*/

export default App;
