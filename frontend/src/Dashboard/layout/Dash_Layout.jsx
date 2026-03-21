import { Outlet } from 'react-router';
import Dash_Navbar from './Dash_Navbar';
import Sidebar from './Sidebar';

function Dash_Layout() {
    return (
        <div className='dash-container'>
            <Dash_Navbar />
            <div className="main-container">
                <Sidebar />
                <div className='dash-content'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dash_Layout;
