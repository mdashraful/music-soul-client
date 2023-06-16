import React from 'react';

const Banner = () => {
    return (
        <div className="container mx-auto carousel w-full max-h-[700px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src="https://imgeng.jagran.com/images/2022/nov/best%20guitar1669205342381.jpg"
                    className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">
                        ❮
                    </a>
                    <a href="#slide2" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src="https://www.sweetwater.com/sweetcare/media/2023/02/Flute-Quickstart-Guide.jpg"
                    className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">
                        ❮
                    </a>
                    <a href="#slide3" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src="https://drumhelper.b-cdn.net/wp-content/uploads/2022/10/Open-Handed-Drumming-Everything-You-Need-to-Know.png"
                    className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">
                        ❮
                    </a>
                    <a href="#slide4" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src="https://www.ystmusic.nus.edu.sg/wp-content/uploads/2019/12/piano-major-banner-e1644548563967.jpeg"
                    className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">
                        ❮
                    </a>
                    <a href="#slide1" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Banner;