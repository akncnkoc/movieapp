import React from "react";
import { useHistory } from "react-router-dom";
function Header() {
  let history = useHistory();
  let goToAbout = (e) => {
    history.push("/about");
  };
  return (
    <div className="header w-100">
      <div className="container p-3 bg-primary d-flex justify-content-between align-items-center">
        <h3 className="text-white">Logo</h3>
        <span className="text-white" onClick={(e) => goToAbout(e)}>
          Hakkımızda
        </span>
      </div>
    </div>
  );
}

export default Header;
