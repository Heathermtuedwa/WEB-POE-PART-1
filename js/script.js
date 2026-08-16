// Part 3: Product Search and Filter
 
const productSearch = document.getElementById("productSearch");
const productCards = document.querySelectorAll(".card[data-product]");
const noResults = document.getElementById("noResults");
 
if (productSearch) {
    productSearch.addEventListener("input", function () {
        const searchTerm = productSearch.value.toLowerCase().trim();
        let visibleProducts = 0;
 
        productCards.forEach(function (card) {
            const productName = card.dataset.product.toLowerCase();
 
            if (productName.includes(searchTerm)) {
                card.style.display = "";
                visibleProducts++;
            } else {
                card.style.display = "none";
            }
        });
 
        if (noResults) {
            noResults.hidden = visibleProducts !== 0;
        }
    });
}
 
 
// Part 3: Product Image Lightbox
 
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const productImages = document.querySelectorAll(".card picture img");
 
if (lightbox && lightboxImage && closeLightbox) {
 
    // Open the lightbox when a product image is clicked
    productImages.forEach(function (image) {
        image.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.hidden = false;
        });
    });
 
    // Close the lightbox using the X button
    closeLightbox.addEventListener("click", function () {
        lightbox.hidden = true;
    });
 
    // Close the lightbox when clicking the dark background
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.hidden = true;
        }
    });
}
 
 
// Part 3: Enquiry Form Validation and AJAX Submission
 
const enquiryForm = document.getElementById("enquiry-form");
 
if (enquiryForm) {
 
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();
 
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
 
        let valid = true;
 
        // Remove previous error messages
        document.querySelectorAll(".form-error").forEach(function (error) {
            error.remove();
        });
 
        // Validate full name
        if (name.value.trim() === "") {
            showError(name, "Please enter your full name.");
            valid = false;
        }
 
        // Validate email
        if (email.value.trim() === "") {
            showError(email, "Please enter your email address.");
            valid = false;
        } else if (!email.validity.valid) {
            showError(email, "Please enter a valid email address.");
            valid = false;
        }
 
        // Validate message
        if (message.value.trim() === "") {
            showError(message, "Please enter your enquiry message.");
            valid = false;
        }
 
        if (!valid) {
            return;
        }
 
        // Prepare form data for AJAX submission
        const formData = new FormData(enquiryForm);
 
        fetch("https://formsubmit.co/ajax/hello@amaraandco.co.za", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Submission failed.");
            }
 
            return response.json();
        })
        .then(function () {
            showFormMessage(
                "Your enquiry has been submitted successfully. " +
                "Our team will review your message and respond within two business days."
            );
 
            enquiryForm.reset();
        })
        .catch(function () {
            showFormMessage(
                "We could not submit your enquiry. Please check your details and try again.",
                true
            );
        });
    });
}
 
 
// Display a validation error beside a form field
 
function showError(field, message) {
    const error = document.createElement("p");
 
    error.className = "form-error";
    error.textContent = message;
 
    field.insertAdjacentElement("afterend", error);
}
 
 
// Display the form submission result
// Accepts the form itself so it can be reused by both enquiry and contact forms
 
function showFormMessage(message, isError = false, targetForm = enquiryForm) {
    if (!targetForm) {
        return;
    }
 
    const responseId = targetForm.id + "-response";
    let responseMessage = document.getElementById(responseId);
 
    if (!responseMessage) {
        responseMessage = document.createElement("p");
        responseMessage.id = responseId;
        targetForm.appendChild(responseMessage);
    }
 
    responseMessage.textContent = message;
    responseMessage.className = isError
        ? "form-response error"
        : "form-response success";
}
 
 
// Part 3: Interactive Map (Leaflet) with two locations
 
const mapContainer = document.getElementById("storeMap");
 
if (mapContainer && typeof L !== "undefined") {
 
    const storeLocations = [
        {
            name: "Cape Town Showroom",
            details: "22 Loop Street, Cape Town City Centre, 8001<br>Tue–Sat, 10:00–17:00",
            lat: -33.9221,
            lng: 18.4198
        },
        {
            name: "Johannesburg Returns & Collection Point",
            details: "14 Jan Smuts Avenue, Rosebank, 2196<br>Mon–Fri, 09:00–16:00",
            lat: -26.1462,
            lng: 28.0436
        }
    ];
 
    // Centre the map roughly between both locations
    const map = L.map("storeMap").setView([-30.0, 23.5], 5);
 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18
    }).addTo(map);
 
    const markers = [];
 
    storeLocations.forEach(function (store) {
        const marker = L.marker([store.lat, store.lng])
            .addTo(map)
            .bindPopup("<strong>" + store.name + "</strong><br>" + store.details);
 
        markers.push(marker);
    });
 
    // Fit the map so both markers are visible
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.4));
}
 
 
// Part 3: Contact Form Validation and AJAX Submission
 
const contactForm = document.getElementById("contact-form");
 
if (contactForm) {
 
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
 
        const name = document.getElementById("contact-name");
        const email = document.getElementById("contact-email");
        const phone = document.getElementById("contact-phone");
        const message = document.getElementById("contact-message");
 
        let valid = true;
 
        // Remove previous error messages
        contactForm.querySelectorAll(".form-error").forEach(function (error) {
            error.remove();
        });
 
        // Validate full name
        if (name.value.trim() === "") {
            showError(name, "Please enter your full name.");
            valid = false;
        }
 
        // Validate email
        if (email.value.trim() === "") {
            showError(email, "Please enter your email address.");
            valid = false;
        } else if (!email.validity.valid) {
            showError(email, "Please enter a valid email address.");
            valid = false;
        }
 
        // Validate phone number, only if the visitor entered one
        if (phone.value.trim() !== "" && !phone.validity.valid) {
            showError(phone, "Please enter a valid phone number.");
            valid = false;
        }
 
        // Validate message
        if (message.value.trim() === "") {
            showError(message, "Please enter your message.");
            valid = false;
        }
 
        if (!valid) {
            return;
        }
 
        // Prepare form data for AJAX submission, which formsubmit.co
        // compiles and delivers as an email to the organisation
        const formData = new FormData(contactForm);
 
        fetch("https://formsubmit.co/ajax/hello@amaraandco.co.za", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Submission failed.");
            }
 
            return response.json();
        })
        .then(function () {
            showFormMessage(
                "Thanks for reaching out. Your message has been sent to our " +
                "team and we'll respond within two business days.",
                false,
                contactForm
            );
 
            contactForm.reset();
        })
        .catch(function () {
            showFormMessage(
                "We could not send your message. Please check your details " +
                "and try again.",
                true,
                contactForm
            );
        });
    });
}
 
/* ============================
   Content Carousels
   ============================ */

document.querySelectorAll('.carousel-track').forEach(function (track) {
    const cards = Array.from(track.children);

    cards.forEach(function (card) {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
});