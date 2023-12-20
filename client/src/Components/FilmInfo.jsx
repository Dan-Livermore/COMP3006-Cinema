import React from 'react';

// import Image1 from '../assets/Posters/Drive.webp'
// import Image2 from '../assets/Posters/BladeRunner2049.webp';
// import Image3 from '../assets/Posters/Barbie.webp';
// import Image4 from '../assets/Posters/TheNiceGuys.webp';
// import Image5 from '../assets/Posters/LaLaLand.webp';
// import Image6 from '../assets/Posters/TheFallGuy.webp';

const Film = ({ imageSrc, title, director, releaseDate, ageRating, runtime, description}) => {
  return (
    <><div className='flex items-center mb-8'>
      <div className='w-1/3 mr-4'>
        <img src={imageSrc} alt={title} className='w-3/4 rounded-lg' />
      </div>
      <div className='w-2/3'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold mb-0 '>{title} </h3>
          <span className='text-lg font-bold mx-2'> ({releaseDate})</span>
        </div>
        <p>Certified: {ageRating} | {runtime} mins</p>
        <p>{description}</p>
        <br />
        <div className='flex'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 w-1/4 px-4 rounded-lg mr-3'>
            Tues 2nd Jan <br /> 10:00
          </button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 w-1/4 px-4 rounded-lg mr-3'>
            Thurs 4th Jan <br /> 14:00
          </button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 w-1/4 px-4 rounded-lg mr-3'>
            Sat 6th Jan <br /> 20:00
          </button>
        </div>

      </div>
    </div><hr className='my-8 border-t border-gray-300' /></>
    
  );
};

const FilmInfo = () => {
  const items = [
    {
      id: 1,
      // imageSrc: Image1,
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/1/13/Drive2011Poster.jpg',
      title: 'Drive',
      director: 'Nicholas Winding Refn',
      releaseDate: 2011,
      ageRating: '15',
      runtime: 100,
      description: `A getaway driver falls in love with Irene, a criminal's wife. He gets involved in a robbery attempt and lands himself in trouble with the mob to protect his lover.`,
    },
    {
      id: 2,
      // imageSrc: Image2,
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png',
      title: 'Blade Runner 2049',
      director: 'Denis Villeneuve',
      releaseDate: 2017,
      ageRating: '15',
      runtime: 163,
      description: `K, an officer with the Los Angeles Police Department, unearths a secret that could create chaos. He goes in search of a former blade runner who has been missing for over three decades.`,
    },
    {
      id: 3,
      // imageSrc: Image3,
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg',
      title: 'Barbie',
      director: 'Greta Gerwig',
      releaseDate: 2023,
      ageRating: '12A',
      runtime: 114,
      description: `Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.`,
    },
    {
      id: 4,
      // imageSrc: Image4,
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/e/e9/The_Nice_Guys_poster.png',
      title: 'The Nice Guys',
      director: 'Shane Black',
      releaseDate: 2016,
      ageRating: '15',
      runtime: 116,
      description: `Amelia, a girl in hiding, hires Healy to put March, a detective seeking her, in his place. After two hitmen try to get Healy to reveal her whereabouts, he concernedly pairs with March to find her.`,
    },
    {
      id: 5,
      // imageSrc: Image5,
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png',
      title: 'La La Land',
      director: 'Damien Chazelle',
      releaseDate: 2017,
      ageRating: '12',
      runtime: 128,
      description: `When Sebastian, a pianist, and Mia, an actress, follow their passion and achieve success in their respective fields, they find themselves torn between their love for each other and their careers.`,
    },
    {
      id: 6,
      // imageSrc: Image6,
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Fall_Guy_%282024%29_poster.jpg',
      title: 'The Fall Guy',
      director: 'David Leitch',
      releaseDate: 2024,
      ageRating: 'N/A',
      runtime: 0,
      description: `After leaving the business one year earlier, battle-scarred stuntman Colt Seavers springs back into action when the star of a big studio movie suddenly disappears. As the mystery surrounding the missing actor deepens, Colt soon finds himself ensnared in a sinister plot that pushes him to the edge of a fall more dangerous than any stunt.`,
    },
  ];
  
  // Sort the items array by releaseDate
  items.sort((a, b) => a.releaseDate - b.releaseDate);

  return (
    <div className='max-w-4xl mx-auto mt-8'>
      <p className='text-xl text-center mb-4 mt-2'>(1st - 7th January 2024)</p>
      {items.map((item) => (
        <Film
          key={item.id}
          imageSrc={item.imageSrc}
          title={item.title}
          director={item.director}
          releaseDate={item.releaseDate}
          ageRating={item.ageRating}
          runtime={item.runtime}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default FilmInfo;