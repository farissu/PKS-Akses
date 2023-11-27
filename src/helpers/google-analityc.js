import ReactGA from "react-ga";
import React from "react";
import axios from 'axios';


export const initializeGA = () => {
    ReactGA.initialize({ trackingId: ga_id });
}

export const pageViewGA = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
}

export const getIDga = async (host) => {
    try {
        const response = await axios.get('/api/ga', {
            headers: {
                "X-Forwarded-for": host
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data ga:", error);
        return null;
    }
};


export const GA_ID = (async () => {
    if (typeof window !== 'undefined' && window.fbq) {
        const id = await getIDga(window.location.origin);
        return id;
    }
})();


export const Event = ({ action, value }, name) => {
    const track = ReactGA.event({ action, value }, name);
    return track

}