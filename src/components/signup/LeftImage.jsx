import React from "react";

function LeftImage() {
  return (
    <div className="w-1/3 h-screen overflow-hidden ">
      <img
        className="w-full h-full object-cover object-left"
        src="/resources/signupImg.png"
        alt="left"
      />
    </div>
  );
}

export default LeftImage;
