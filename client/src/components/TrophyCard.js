import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import TrophyDataService from "../services/TrophyService";
import { VscTrash } from "react-icons/vsc";
import Collapse from "react-bootstrap/Collapse";

export default function TrophyCard({ trophy, maxScore, deletedCallback }) {
  const [open, setOpen] = useState(false);
  const [newTrophy, setNewTrophy] = useState(trophy);

  useEffect(() => {
    updateTrophy();
  }, [maxScore]);

  const updateTrophy = () => {
    if (
      (trophy.trophy_type === "T" && maxScore.score >= trophy.goal) ||
      (trophy.trophy_type === "P" && maxScore.projects_done >= trophy.goal)
    ) {
      setNewTrophy({ ...newTrophy, concluded: true });
    }
    TrophyDataService.update(trophy.id, newTrophy)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTrophy = () => [
    TrophyDataService.delete(trophy.id)
      .then((response) => {
        console.log(response.data);
        deletedCallback(trophy);
      })
      .catch((e) => {
        console.log(e);
      }),
  ];

  return (
    <Card
      className={`detail-bg-color mb-2 ${
        newTrophy.concluded === true ? "bg-success" : ""
      }`}
    >
      <ListGroup variant="flush" className="detail-bg-color">
        <ListGroup.Item
          className={`detail-bg-color d-flex justify-content-between ${
            newTrophy.concluded === true ? "bg-success" : ""
          }`}
          onClick={() => setOpen(!open)}
        >
          {trophy.title}{" "}
          <VscTrash
            style={{ cursor: "pointer" }}
            size={"1.3em"}
            onClick={() => deleteTrophy()}
          />
        </ListGroup.Item>
      </ListGroup>
      <Collapse in={open}>
        <Card.Text className="detail-bg-color pt-2 ps-3 pb-2">
          {trophy.description}
        </Card.Text>
      </Collapse>
      {/* <Card.Title>{trophy.title}</Card.Title> */}
      {/* <Card.Text>{trophy.description}</Card.Text> */}
    </Card>
  );
}
