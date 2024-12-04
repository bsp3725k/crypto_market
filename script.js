const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let cryptoData = [];

// Fetch Data from API
async function fetchData() {
    try {
        const response = await fetch(apiURL);
        cryptoData = await response.json();
        renderTable(cryptoData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Render Table
function renderTable(data) {
    const tableBody = document.querySelector("#cryptoTable tbody");
    tableBody.innerHTML = ""; // Clear the table before rendering new rows
    data.forEach(crypto => {
        const priceChangeClass = crypto.price_change_percentage_24h > 0 ? "positive" : "negative";
        const row = `
            <tr>
                <td><img src="${crypto.image}" alt="${crypto.name}"> ${crypto.name}</td>
                <td>${crypto.symbol.toUpperCase()}</td>
                <td>${crypto.current_price.toLocaleString()}</td>
                <td>${crypto.total_volume.toLocaleString()}</td>
                <td class="${priceChangeClass}">${crypto.price_change_percentage_24h.toFixed(2)}%</td>
                <td>${crypto.market_cap.toLocaleString()}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Search Functionality
document.getElementById("searchInput").addEventListener("input", () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = cryptoData.filter(crypto =>
        crypto.name.toLowerCase().includes(query) || crypto.symbol.toLowerCase().includes(query)
    );
    renderTable(filteredData);
});

// Sort by Market Cap
function sortByMarketCap() {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
}

// Sort by 24h Percentage Change
function sortByChange() {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
}

// Initial Data Fetch
fetchData();
