import { Outlet } from 'react-router';
import Dash_Navbar from './Dash_Navbar';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

function Dash_Layout() {
    return (
        <div className='h-screen w-full'>
            <Dash_Navbar />
            <div className="md:h-[90%] h-full w-full flex justify-center items-center">
                <Sidebar />
                <div className='h-full w-[90%] flex justify-center items-center pl-[4%] box-border bg-transparent md:overflow-visible overflow-scroll'>
                    <Outlet />
                </div>
                <MobileSidebar />
            </div>
        </div>
    );
}

export default Dash_Layout;
