
import React from "react";
import govLogo from "../assets/gov-logo.png";

export default function Header() {
  return (
    <div className="w-full bg-white py-4 shadow">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <img src={govLogo} alt="gov.br" className="h-12" />
      </div>
    </div>
  );
}
