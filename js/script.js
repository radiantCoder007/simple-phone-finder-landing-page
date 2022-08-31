// Enter button to perform search
document.getElementById("search-field")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("search-btn").click();
        }
    });


const getPhoneData = (phone) => {

    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    getPhoneData(searchText);
    searchField.value = '';
}

const displayPhone = phone => {
    const phoneDisplay = document.getElementById('phone-display-area');
    phoneDisplay.innerHTML = '';

    phone.forEach(phone => {

        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                <div class="card">
                    <img src="${phone.image}" class="card-img-top p-2">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>

                       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal" onclick="viewPhoneDetails('${phone.slug}')">View Details</button>
                                
                    </div>
                </div>
                `
        phoneDisplay.appendChild(phoneDiv);
    });
}

// View phone Details
const viewPhoneDetails = model => {
    // console.log(model);
    const url = `https://openapi.programming-hero.com/api/phone/${model}`;
    fetch(url)
        .then(res => res.json())
        .then(data => updateModalInfo(data.data))
}

const updateModalInfo = phoneDetails => {
    // console.log(phoneDetails);
    const modalLabel = document.getElementById('ModalLabel');
    modalLabel.innerText = phoneDetails.brand;
    const otherInfo = document.getElementById('other-info');
    otherInfo.innerHTML = '';
    const otherInfoPara = document.createElement('p');
    otherInfoPara.innerHTML = `
        <p>
        <strong>Release Date</strong>: ${phoneDetails.releaseDate}
        </p> 
        <p>
        <strong>ChipSet</strong>: ${phoneDetails.mainFeatures.chipSet}
        </p>
        <p>
        <strong>Memory</strong>: ${phoneDetails.mainFeatures.memory}
        </p>    
        <p>
        <strong>Sensors</strong>: ${phoneDetails.mainFeatures.sensors}
        </p>    
    
    `
    otherInfo.appendChild(otherInfoPara);
}

getPhoneData('apple'); 