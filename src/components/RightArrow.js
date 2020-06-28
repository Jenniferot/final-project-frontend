import React from 'react';

export const RightArrow = ({ visible }) => {

  return (
    <div className="right-arrow-container">
      <svg className={`svgarrow ${visible ? "rotate" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 438.5 438.5"
        version="1.1"
        viewBox="0 0 438.5 438.5"
        xmlSpace="preserve"
      >
        <path d="M104.2 131.6c-3.6-3.6-5.4-7.9-5.4-12.8s1.8-9.2 5.4-12.8l29.1-29.1c3.6-3.6 7.9-5.4 12.8-5.4 5 0 9.2 1.8 12.9 5.4l129.6 129.6c3.6 3.6 5.4 7.9 5.4 12.8s-1.8 9.2-5.4 12.8L159 361.7c-3.6 3.6-7.9 5.4-12.9 5.4-4.9 0-9.2-1.8-12.8-5.4l-29.1-29.1c-3.6-3.6-5.4-7.9-5.4-12.8s1.8-9.2 5.4-12.8l87.6-87.7-87.6-87.7z" ></path>
      </svg>
    </div>
  )
}


