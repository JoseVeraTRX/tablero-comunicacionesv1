import React from "react";
import "../styles.css";

const Header = () => {
  return (
    <div className="header-container">
      <img src={`${import.meta.env.BASE_URL}SECRETARIA DE INFRAESTRUCTURA FÍSICA.png`} alt="Cabecera" />
    </div>
  );
};


export default Header;
