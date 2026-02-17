import React, { useState } from "react";
import "./SideNav.css";
import { useTranslation } from "react-i18next";

const SideNav = ({ items = [], width = "280px", isOpen = false, onClose }) => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item, index) => {
    setActiveItem(index);
    if (item.onClick) {
      item.onClick(item);
    }
    // Close mobile menu after clicking an item
    if (onClose) {
      onClose();
    }
  };

  const renderMenuItem = (item, index, level = 0) => {
    const isActive = activeItem === index;

    return (
      <React.Fragment key={index}>
        <li
          className={`side-nav-item ${isActive ? "active" : ""} ${
            item.disabled ? "disabled" : ""
          } level-${level}`}
          onClick={() => !item.disabled && handleItemClick(item, index)}
        >
          <span className="nav-label">
            {item.label}
            {item.badge && <span className="nav-badge">({item.badge})</span>}
          </span>
        </li>
        {item.children &&
          item.children.map((child, childIndex) =>
            renderMenuItem(child, `${index}-${childIndex}`, level + 1)
          )}
      </React.Fragment>
    );
  };

  return (
    <div
      className={`side-nav ${isOpen ? "mobile-open" : ""}`}
      style={{ width }}
    >
      <nav className="side-nav-content">
        <ul className="side-nav-list">
          {items.map((item, index) => renderMenuItem(item, index))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
