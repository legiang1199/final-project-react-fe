import React, { useState } from "react";

function Admin() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="admin flex">
            <div className={`sidebar ${isOpen ? "open" : ""} bg-gray-800 text-white w-1/4`}>
                <ul>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Users</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
                </ul>
            </div>
            <div className="content w-3/4 p-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleSidebar}>Toggle Sidebar</button>
                <p className="mt-4">This is the content area.</p>
            </div>
        </div>
    );
}

export default Admin;
