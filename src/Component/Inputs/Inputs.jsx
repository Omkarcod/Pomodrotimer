import React from "react";

const Inputs = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {props.label && (
        <label
          style={{ fontWeight: "700", fontSize: "1rem", color: "#4b4b4b" }}
        >
          {props.label}
        </label>
      )}
      <input
        style={{
          borderRadius: "5px",
          border: "1px solid #eee",
          outline: "none",
          padding: "8px 15px",
          color: "#000",
        }}
        type="text"
        {...props}
      />
    </div>
  );
};

export default Inputs;
