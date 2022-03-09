import logo from './logo.svg';
import React from "react";
import './App.css';

/**
 * components
 */
import Title from "./components/common/Title";
import Form from "./components/common/Form";
import MainCard from "./components/common/MainCard";
import Favorites from "./components/Favorites";

/**
 * utils
 */
import jsonLocalStorage from "./modules/utils/jsonLocalStorage";
import Nav from "./components/common/Nav";


const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(
    `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};


const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  // const [counter, setCounter] = React.useState(
  //   jsonLocalStorage.getItem("counter")
  // );
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter")
  });

  const [mainCat, setMainCat] = React.useState(CAT1);

  // const [favorites, setFavorites] = React.useState(
  //   jsonLocalStorage.getItem("favorites") || []
  // );
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || []
  })

  const alreadyFavorite = favorites.includes(mainCat);

  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    console.log(newCat);
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    })
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat}/>
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites}/>
    </div>
  );
};

export default App;
