

const NewsLatter = () => {
    return (
        <div className="container mx-auto my-12 text-white bg-cover" style={{backgroundImage: 'url(../../assets/map.jpg)',backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}>
            <div className="flex flex-col items-center bg-[#111] bg-opacity-75 md:flex-row gap-10 py-10">
            <div className="flex-1 px-3">
                <h1 className="text-3xl font-bold">Wonderful House Experiences in there!</h1>
                <p>The Advanture subranking is based on an equally weighted averag of scores from meny countrys </p>
            </div>
            <div className="flex-1 px-3">
                <video className="rounded-md lg:h-64 border-4" src='../../assets/video.mp4' autoPlay muted loop></video>
            </div>
            </div>
        </div>
    );
};

export default NewsLatter;