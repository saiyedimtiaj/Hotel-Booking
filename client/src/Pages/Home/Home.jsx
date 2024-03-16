import React from 'react';
import Banner from '../../Component/Home/Banner';
import Feature from '../../Component/Home/Feature';
import Tastimonial from '../../Component/Home/Tastimonial';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsLatter from '../../Component/Home/NewsLatter';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Feature/>
            <Tastimonial/>
            <NewsLatter/>
        </div>
    );
};

export default Home;