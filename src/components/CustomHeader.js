import React from 'react';
import { Navigate } from 'react-big-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; 

const CustomHeader = ({ label, onNavigate }) => {
  const navigateBack = () => {
    onNavigate(Navigate.PREVIOUS);
  };

  const navigateNext = () => {
    onNavigate(Navigate.NEXT);
  };

  return (
    <div className="custom-header">
      <h2 className="header-label">{label}</h2>
      <div className="header-buttons">
        <button onClick={navigateBack} className="btn">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <button onClick={navigateNext} className="btn">
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default CustomHeader;
