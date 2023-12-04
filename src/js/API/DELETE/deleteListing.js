


export function deleteListing(listingId){
    const base_url = "https://api.noroff.dev/api/v1/auction/listings/";
    const token = localStorage.getItem("token");
    const url = base_url + listingId;

    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));

} 