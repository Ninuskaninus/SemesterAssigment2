import { getListings } from "../API/GET/getListings.js";

export async function removeEnded() {
    const listings = await getListings();

    const now = new Date();
    const nowFormatted = now.toLocaleDateString('no-NO'); // Set the desired date format

    const endedListings = listings.filter((listing) => {
        const deadline = new Date(listing.endsAt);
        const deadlineFormatted = deadline.toLocaleDateString('no-NO'); // Set the desired date format

        // Check if the deadline has passed
        return nowFormatted < deadlineFormatted;
    });

    console.log(endedListings);

}

