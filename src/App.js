import React, { useState, useEffect } from "react";
import { Element } from "./components/Element/Element";
import { Modal } from "./components/Modal/Modal";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState(null);
  const [imgBig, setImgBig] = useState(null);
  const [modalID, setModalID] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://boiling-refuge-66454.herokuapp.com/images")
      .then((response) => response.json())
      .then((result) => {
        setImage(result);
      })
      .catch((err) => alert(err));
  }, []);

  const modalContent = (id) => {
    fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setImgBig(result.url);
        setComment(result.comments);
        setModalID(result.id);
        setIsLoaded(true);
      })
      .catch((err) => {
        alert(err);
        setIsLoaded(true);
      });
  };

  return (
    <div className="App">
      <header>Тестовое задание от Галкина Владимира</header>
      <div className="elements">
        <div className="elements_images">
          {image?.map((el) => (
            <div key={el.id}>
              <Element
                picture={el.url}
                id={el.id}
                setModal={setModal}
                modalContent={modalContent}
                comment={comment}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        isVisible={modal}
        onClose={() => {
          setModal(false);
          setImgBig(null);
          setComment(null);
          setModalID(null);
        }}
        imgBig={imgBig}
        comment={comment}
        modalID={modalID}
        setComment={setComment}
        isLoaded={isLoaded}
      />
    </div>
  );
}

export default App;
