const base_url = "https://api.noroff.dev/api/v1";
const listing_url = "/auction/listings";
const url = base_url + listing_url;
const accessToken = localStorage.getItem("token");



export function addListing() {
const title = document.getElementById("sellTitle").value;
const description = document.getElementById("sellDescription").value;

const tagsContainer = document.getElementById("tagContainer");
const tags = tagsContainer.children;
const tagsArray = Array.from(tags);
const tagValues = tagsArray.map(tag => tag.innerText.replace("\nx", '').trim());

const mediaContainer = document.getElementById("imageUrlsContainer");
const media = mediaContainer.getElementsByClassName("imagePreview");
const mediaArray = Array.from(media);
const mediaValues = mediaArray.map(media => {
    const backgroundImage = media.style.backgroundImage;
    const urlMatch = backgroundImage.match(/url\(["']?([^"']*)["']?\)/);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];

    } else {
      return null; 
    }
  });
 
const endsAt = document.getElementById("sellDeadline").value;

const listingElement = {
title: title,
description: description,
tags: tagValues,
media: mediaValues,
endsAt: endsAt,
};

async function postListing(url, data) {
try {
const postData = {
method: "POST",
body: JSON.stringify(data),
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${accessToken}`,
},
};
const response = await fetch(url, postData);
const json = await response.json();

if (response.ok) {
    console.log("Listing added");
} else {
throw new Error(json.error);
}

return json;
} catch (error) {
console.log(error.name + " " + error.message);
}
}
    postListing(url, listingElement);
}

