const content = document.querySelector(".content");
const pagination = document.querySelector(".pagination .page-container");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

let page = 0;
let pageSize = 8;
let totalDataSize = 0;
let totalPageCount = 0;

function fetchData(page, pageSize) {
    fetch(`https://dummyjson.com/recipes`)
        .then(res => res.json())
        .then(data => {
            totalDataSize = data.recipes.length;
            totalPageCount = Math.ceil(totalDataSize / pageSize);
            showData(data.recipes.slice(page * pageSize, (page + 1) * pageSize));
            updatePagination();
        });
}

function showData(data) {
    content.innerHTML = "";
    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = item.name;
        content.appendChild(card);
    });
}

function updatePagination() {
    pagination.innerHTML = ""; 

    for (let i = 0; i < totalPageCount; i++) {
        const pageButton = document.createElement("button");
        pageButton.classList.add("btn");
        pageButton.innerText = i + 1;
        pageButton.addEventListener("click", () => goToPage(i));
        if (i === page) {
            pageButton.classList.add("active");
        }
        pagination.appendChild(pageButton);
    }

    prev.style.visibility = page === 0 ? 'hidden' : 'visible';
    next.style.visibility = page === totalPageCount - 1 ? 'hidden' : 'visible';
}

function goToPage(pageNumber) {
    page = pageNumber;
    fetchData(page, pageSize);
}

prev.addEventListener("click", () => {
    if (page > 0) {
        page--;
        fetchData(page, pageSize);
    }
});

next.addEventListener("click", () => {
    if (page < totalPageCount - 1) {
        page++;
        fetchData(page, pageSize);
    }
});

fetchData(page, pageSize);
