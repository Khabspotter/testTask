import "./modal.css";
import React from "react";

export const Modal = ({
  isVisible,
  comment,
  onClose,
  imgBig,
  modalID,
  isLoaded,
}) => {
  const addComment = (event) => {
    event.preventDefault();
    const {
      target: { new_comment },
    } = event;
    fetch(
      `https://boiling-refuge-66454.herokuapp.com/images/${modalID}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: new_comment.value }), // не понял что передать в body, поэтому 400
      }
    )
      .then((response) => {
        response.json();
      })
      .then((res) => {
        event.target.new_comment.value = "";
      })
      .catch((err) => {
        alert("Заполните поле комментария");
        console.log(err);
      });
  };
  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal_dialog" onClick={(e) => e.stopPropagation()}>
        {!isLoaded ? (
          <div className="load">Загрузка...</div>
        ) : (
          <div className="modal_body">
            <div className="modal_img">
              <img src={imgBig}></img>
            </div>
            {comment
              ? comment?.map((el) => (
                  <div className="modal_comments" key={el.id}>
                    <div className="modal_comments_1">Комментарии:</div>
                    <div style={{ paddingLeft: "20px" }}>
                      <div
                        style={{
                          color: "blue",
                          fontWeight: "700",
                          fontSize: "16px",
                        }}
                      >
                        {" "}
                        User {el.id}
                      </div>
                      <div style={{ fontSize: "14px" }}>{el.text}</div>
                    </div>
                  </div>
                ))
              : null}

            <div className="modal_form">
              <form onSubmit={addComment}>
                <textarea
                  name="new_comment"
                  placeholder="Add your comment"
                ></textarea>
                <button>Add</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
