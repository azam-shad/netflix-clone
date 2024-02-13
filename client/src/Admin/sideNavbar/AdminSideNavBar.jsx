import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { sidebarData } from '../assets/sidebarData';
// import adminLogo from '../../pages/assets/logo.png'
import { useAuth } from '../../pages/Context/AuthContext';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import './sidebar.scss';

const AdminSideNavBar = () => {
    const { adminLogout } = useAuth();

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    // Function to toggle isSubmenuOpen
    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };


    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="company-logo">
                        {/* <img src={adminLogo} alt="company logo" /> */}
                        <h4>Admin</h4>
                    </div>
                </div>
                <div className="sidebar-main">
                    <ul>
                        {sidebarData.map((section, index) => (
                            <React.Fragment key={index}>
                                <div className="title">{section.title}</div>
                                {section.items.map((item, itemIndex) => (
                                    <React.Fragment key={itemIndex}>
                                        <Link
                                            to={item.link || '#'}
                                            className={`nav-link ${item.text === 'Logout' ? 'logout-btn' : ''}`}
                                            onClick={item.text === 'Logout' ? adminLogout : undefined}
                                        >
                                            <div className="icon">
                                                {item.icon}
                                            </div>
                                            <span>{item.text}</span>
                                            <div className="dropdown-icon">
                                                {item.subItems ? (isSubmenuOpen ? <ArrowDropUpIcon onClick={toggleSubmenu} /> : <ArrowDropDownIcon onClick={toggleSubmenu} />) : null}
                                            </div>
                                        </Link>
                                        {/* {item.subItems &&
                                            item.subItems.length > 0 && (
                                                isSubmenuOpen && (
                                                    <ul className="submenu">
                                                        {item.subItems.map((subItem, subItemIndex) => (
                                                            <Link
                                                                to={subItem.link || '#'}
                                                                className="nav-link sub-menu"
                                                                key={subItemIndex}
                                                            >
                                                                <span>
                                                                    {subItem.text}
                                                                </span>
                                                            </Link>
                                                        )
                                                        )}
                                                    </ul>
                                                )
                                            )} */}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </ul>


                </div>
            </div>
        </>
    );
}

export default AdminSideNavBar
