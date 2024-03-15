import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
            <div className="sidebar-container" style={{ backgroundColor: '#E1D6E7' }}>
                {isOpen && (
                    <div className="sidebar-content">
                        <Link to="/home"><h2 className="sidebar-title">InsightConnect</h2></Link>
                        <div className="links-container" style={{ backgroundColor: '#F3F5F9' }}>
                            <ul className="sidebar-menu">
                                <li className="sidebar-item"><Link to="/patients" className="sidebar-link">Patients</Link></li>
                                <li className="sidebar-item"><Link to="/agenda" className="sidebar-link">Appointments</Link></li>
                                <li className="sidebar-item"><Link to="/errorpage" className="sidebar-link">Prescriptions</Link></li>
                                <li className="sidebar-item"><Link to="/errorpage" className="sidebar-link">Mood Tracker</Link></li>
                                <li className="sidebar-item"><Link to="/about" className="sidebar-link">About</Link ></li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <div className="sidebar-toggle-container">
                <button className="sidebar-toggle-button" onClick={toggleSidebar}>
                    {isOpen ? (
                        <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z" fill="currentColor" />
                        </svg>)
                        : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
                                fill="currentColor" /></svg>)}
                </button>
            </div>
        </div>
    );
}

export default Sidebar;