function searchWiki() {
    let searchInputEl = document.getElementById("searchInput");
    let spinnerEl = document.getElementById("spinner");
    let searchResultsEl = document.getElementById("searchResults");

    function createAndAppendSearchResult(result) {
        let {
            link,
            title,
            description
        } = result;
        let resultItemEl = document.createElement("div");
        resultItemEl.classList.add("result-item");
        let titleEl = document.createElement("a");
        titleEl.href = link;
        titleEl.target = "_blank";
        titleEl.textContent = title;
        titleEl.classList.add("result-title");
        resultItemEl.appendChild(titleEl);
        let titleBreakEl = document.createElement("br");
        resultItemEl.appendChild(titleBreakEl);
        let urlEl = document.createElement("a");
        urlEl.href = link;
        urlEl.target = "_blank";
        urlEl.textContent = link;
        urlEl.classList.add("result-url");
        resultItemEl.appendChild(urlEl);
        let LinkBreakEl = document.createElement("br");
        resultItemEl.appendChild(LinkBreakEl);
        let DescrptionEl = document.createElement("p");
        DescrptionEl.classList.add("link-description");
        DescrptionEl.textContent = description;
        resultItemEl.appendChild(DescrptionEl);
        searchResultsEl.appendChild(resultItemEl);
    }

    function displayResults(searchResults) {
        spinnerEl.classList.add("d-none");
        for (let result of searchResults) {
            createAndAppendSearchResult(result);
        }
    }

    function searchWikipedia(event) {
        if (event.key === "Enter") {
            spinnerEl.classList.remove("d-none");
            searchResultsEl.textContent = "";
            let value = searchInputEl.value;
            let url = "https://apis.ccbp.in/wiki-search?search=" + value;
            let options = {
                method: "GET"
            };
            fetch(url, options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonData) {
                    let {
                        search_results
                    } = jsonData;
                    displayResults(search_results);
                });
        }
    }
    searchInputEl.addEventListener("keydown", searchWikipedia);
}