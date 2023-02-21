import Head from "next/head";
import React, { useState } from "react";
import { Navbar } from "../components";
import { Calendar, Star1 } from "iconsax-react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const Home = ({ movies }) => {
  const imageBaseURL = "https://image.tmdb.org/t/p/original/";
  const posterUrl = "https://image.tmdb.org/t/p/w500/";
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const backgroundImg = imageBaseURL + movies[currentMovieIndex].backdrop_path;
  const handleMovieClick = (index) => {
    setCurrentMovieIndex(index);
  };

  return (
    <div
      className="app h-screen text-white font-oswald"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${backgroundImg})`,
      }}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="md:px-32 px-5">
        <Navbar />
        <div>
          <div className="md:mt-4 mt-5 space-y-3 md:mr-96">
            <h3 className="font-bold text-white md:text-5xl text-3xl uppercase ">
              {movies[currentMovieIndex].title}
            </h3>
            <p className="title font-light">
              {movies[currentMovieIndex].overview}
            </p>
            <div className="flex items-center space-x-10">
              <p className="flex items-center space-x-3 font-light">
                <Calendar size="32" color="#fff" variant="Bulk" />
                <span> {movies[currentMovieIndex].release_date}</span>
              </p>
              <p className="flex items-center space-x-3 font-light">
                <Star1 size="32" color="#fff" variant="Bulk" />
                <span>{movies[currentMovieIndex].vote_average}/10</span>
              </p>
            </div>
          </div>

          <div className="bg-white bg-opacity-20 md:mt-10 mt-5 md:p-5 p-2">
            <Swiper
              slidesPerView={2}
              spaceBetween={7}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              className="mySwiper"
            >
              {movies.map((movie, index) => (
                <SwiperSlide>
                  <div key={movie.id} onClick={() => handleMovieClick(index)}>
                    <img
                      src={posterUrl + movie.poster_path}
                      alt={movie.title}
                      title={movie.title}
                      className="rounded-md md:w-auto cursor-pointer border border-transparent hover:border-2 hover:border-gray-400 transition duration-300 hover:-translate-y-2"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const apiKey = process.env.NEXT_TMDB_API;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();
  const movies = data.results;

  return {
    props: {
      movies,
    },
  };
}
