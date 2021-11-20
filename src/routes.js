import React from "react";
import { Routes, Redirect, Route, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import GuestBooking from "./components/GuestBooking/GuestBooking";
import GuestMain from './GuestMain';
import CateringMain from './CateringMain';
import GenInfo from './GenInfoMain';
import RoomPriceMain from './RoomPriceMain'

function initializeRoutes(){
    ReactDOM.render((
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<GuestMain />} />
                <Route exact path="/catering" element={<CateringMain />} />
                <Route exact path="/geninfo" element={<GenInfo />} />
                <Route exact path="/room/priceupdate" element={<RoomPriceMain />} />
            </Routes>
        </BrowserRouter>
    ),document.getElementById('root'))
}

export default initializeRoutes;