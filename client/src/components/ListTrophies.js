import React, { useEffect, useState } from "react";
import TrophyDataService from "../services/TrophyService";
import NewTrophy from "./NewTrophy";
import TrophyCard from "./TrophyCard";

export default function ListTrophies({ maxScore }) {
  const [trophies, setTrophies] = useState([]);
  const [newTrophy, setNewTrophy] = useState([]);
  const [deletedTrophy, setDeletedTrophy] = useState([]);

  useEffect(() => {
    retrieveTrophies();
  }, [newTrophy, deletedTrophy]);

  useEffect(() => {
    retrieveTrophies();
  }, []);

  const retrieveTrophies = () => {
    TrophyDataService.getAll()
      .then((response) => {
        setTrophies(response.data.trophies);
        console.log(response.data.trophies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNewCallback = (newTrophyProp) => {
    setNewTrophy(newTrophyProp);
  };

  const handleDeletedCallback = (deletedTrophyProp) => {
    setDeletedTrophy(deletedTrophyProp);
  };

  return (
    <>
      {trophies.map((trophy) => (
        <TrophyCard
          key={trophy.id}
          trophy={trophy}
          maxScore={maxScore}
          deletedCallback={handleDeletedCallback}
        />
      ))}
      <NewTrophy newCallback={handleNewCallback} />
    </>
  );
}
