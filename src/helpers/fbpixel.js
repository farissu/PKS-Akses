// import { is } from "express/lib/request";
import getUrlKey from "./getUrlKey";
import axiosHandler from "./axios";
import axios from 'axios';
import { getCookie, getCookies } from 'cookies-next';
export const API_URL = process.env.API_URL;
// https://github.com/vercel/next.js/blob/canary/examples/with-facebook-pixel
// https://developers.facebook.com/docs/facebook-pixel/advanced/

export const getDataPixel = async (host) => {
    try {
        const response = await axios.get('/api/fbpixel', {
            headers: {
                "X-Forwarded-for": host
            }
        });
        return response.data;

    } catch (error) {
        console.error("Error fetching data pixel:", error);
        return null;
    }
};

export const FB_PIXEL_ID = (async () => {

    if (typeof window !== 'undefined' && window.fbq) {
        const id = await getDataPixel(window.location.origin);
        return id;
    }
})();

const addConversionApi = async ({ event_name, event_id, order_id }) => {
    if (typeof window !== 'undefined') {
        const urlString = window.location.href;
        const url = new URL(urlString);
        const fbclid = url.searchParams.get("fbclid");

        const formData = {
            "fbclid": fbclid,
            "event_name": event_name,
            "event_id": event_id,
            "url": urlString,
            "_fbp": getFbpFromCookie()
        };

        if (order_id) {
            formData.order_id = order_id;
        }

        try {
            if (fbclid) {
                const response = await axiosHandler({
                    method: 'post',
                    url: '/api/fbsendEvent',
                    params: ``,
                    formData: formData,
                });

                try {
                    if (response.data.status == 20) {
                        // console.log("RESPONSE HIT TO PROGRAM_SUBSCRIPTION", response);
                    }
                } catch (error) {
                    console.log("ERROR CONVERSION API => ", error);
                }
            } else {
                // console.log("FBCLID not found");
            }
        } catch (error) {
            console.log("error on FBCLID");
        }
    }

}

export const pageview = () => {
    const data = Date.now()
    const event_id_from_date = parseInt(data / 1000);
    if (typeof window !== 'undefined' && window.fbq) {
        // Now you can safely use the fbq function
        window.fbq('track', 'PageView', {}, { eventID: event_id_from_date });
    }

    // console.log("FBP", getFbpFromCookie());
    addConversionApi({
        event_name: "PageView",
        event_id: event_id_from_date,
        _fbp: getFbpFromCookie()
    });
}

export const event = (name, options = {}, event_id) => {
    let event_id_from_date = parseInt(new Date() / 1000);

    let event;

    if (name == "Purchase") {
        event = {
            eventID: event_id ? event_id : event_id_from_date
        };
    } else if (name == "Donate") {
        let eventIdAdd5minutes;
        if (getUrlKey("fbclid")) {
            const currentTimeAsMs = new Date(parseInt(event_id));
            eventIdAdd5minutes = currentTimeAsMs.getTime() + (60 * 5);
        } else {
            eventIdAdd5minutes = event_id_from_date + (60 * 5);
        }
        event = {
            eventID: eventIdAdd5minutes
        };
    } else {
        event = {
            eventID: event_id_from_date
        }
    }

    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', name, options, event);
    }


    if (name != "Donate") {
        addConversionApi({
            event_name: name,
            event_id: name != "Purchase" ? event_id_from_date : event_id,
            order_id: name == "Purchase" ? options.order_id : "",
            _fbp: getFbpFromCookie()
        });
    }
}

export const getFbpFromCookie = () => {
    const cookies = getCookies();
    const fbp = getCookie("_fbp");

    // console.log("1111", cookies._ga);
    // console.log("2222",fbp);

    return fbp || "";
}


export const initPixelIdCampaign = ({ pixel_id_campaign }) => {
    if (typeof window != "undefined") {
        window.fbq('init', pixel_id_campaign);
    }

}
