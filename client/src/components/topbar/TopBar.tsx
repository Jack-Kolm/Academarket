import {Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from 'react';
import DefaultProfilePic from "../../style/icons/DefaultProfilePic";
import Button from "../button/Button";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import sendRequest from "../../utils/request";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Exception } from "sass";

// Define a custom interface that extends JwtPayload
interface CustomJwtPayload extends JwtPayload {
    user_id: string;
  }

function TopBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const [username, setUsername] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);



    const updateUserInfo = async (access_token : string) => {
        const response = await sendRequest('/user_info', 'GET', undefined, access_token);

        if (response.ok) {
            const responseData = await response.json();
            setUsername(responseData.username);
            setBalance(responseData.balance);
        } else {
            console.log("Error when getting user info");
        }

    }

    // When topbar loads, access token is fetched and userinfo updated
    useEffect(() => {
        const access_token = localStorage.getItem(ACCESS_TOKEN);
        if (access_token){
            updateUserInfo(access_token);
        } else {
            console.log("No access token");
        }
    },[]);
    
    
    const handleLogout = async () => {
        const refresh_token = localStorage.getItem(REFRESH_TOKEN);
        const response = await sendRequest('/token/blacklist/', 'POST', {refresh: refresh_token});

        if (response.ok) {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            navigate('/signin');
        }
    }

    return (
        <div className="text-secondary-color w-full h-20 flex px-8 text-base">
            <div id="logo-area" className="flex items-center">
                <div className="text-lg font-bold">Academarket</div>
            </div>
            <div id="menu-area" className="flex-grow flex justify-center">
                <ul className="flex gap-x-8 items-center">
                    <Link to="/dashboard">
                        <li className={`px-4 py-1.5 rounded-full ${path === '/dashboard' ? 'bg-primary-color text-white font-medium' : ''}`}>Dashboard</li>
                    </Link>

                    <Link to="/portfolio">
                        <li className={`px-4 py-1.5 rounded-full ${path === '/portfolio' ? 'bg-primary-color text-white font-medium' : ''}`}>Portfolio</li>
                    </Link>

                    <Link to="/trading">
                        <li className={`px-4 py-1.5 rounded-full ${path === '/trading' ? 'bg-primary-color text-white font-medium' : ''}`}>Trading</li>
                    </Link>
                </ul>
            </div>
            <div id="profile-area" className="flex items-center">
                <div id="pfp" className="w-10 h-10 rounded-full bg-light-gray overflow-hidden">  
                    <DefaultProfilePic />
                </div>
                <div id="user-details" className="ml-4 text-sm">
                    <p className="font-semibold text-secondary-color text-sm max-w-36 overflow-hidden whitespace-nowrap overflow-ellipsis">{username ? username : "Loading..."}</p>
                    <p className="font-semibold text-primary-color">APE {balance}</p>
                </div>
                <Button className="ml-4 text-white bg-coral px-2 py-1 rounded-md font-medium" onClick={handleLogout}>Log out</Button>
            </div>
        </div>
    );
}

export default TopBar;