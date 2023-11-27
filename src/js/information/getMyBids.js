import {getListings} from '../API/GET/getListings.js';
const allListings = await getListings();
const username = localStorage.getItem("username");

const myBids = allListings.filter(listing =>
    listing.bids.some(bid => bid.bidderName === username)
);




export function getMyBids() {
    return myBids;
}