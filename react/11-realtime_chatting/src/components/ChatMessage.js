import React from "react";
import tempImg from "../assets/profile.png";

function ChatMessage({ message, auth }) {
  // console.log(message);
  const { text, photoUrl, uid } = message;
  const messageClass = uid === auth?.currentUser.uid ? "sent" : "received";
  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoUrl} />
        <p>{text}</p>
      </div>
      {/* <div className="message received">
        <img src={photoUrl} />
        <p>{text}</p>
      </div> */}
    </>
  );
}

export default ChatMessage;
