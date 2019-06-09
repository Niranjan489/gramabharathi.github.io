function loadSearch() {
    // Create a new Index
    idx = lunr(function () {
        this.field('id')
        this.field('title', { boost: 10 })
        this.field('summary')
    })

    // Send a request to get the content json file
    $.getJSON('/content.json', function (data) {

        // Put the data into the window global so it can be used later
        window.searchData = data
        console.log("Test the search");

        // Loop through each entry and add it to the index
        $.each(data, function (index, entry) {
            idx.add($.extend({ "id": index }, entry))
        })
    })

    // When search is pressed on the menu toggle the search box
    $('#search').on('click', function () {
        $('.searchForm').toggleClass('show')
    })

    // When the search form is submitted
    $('#searchForm').on('submit', function (e) {
        // Stop the default action
        e.preventDefault()

        // Find the results from lunr
        results = idx.search($('#searchField').val())

        // Empty #content and put a list in for the results
        $('#content').html('Search Results (' + results.length + ')')
        $('#content').append('')

        // Loop through results
        $.each(results, function (index, result) {
            // Get the entry from the window global
            entry = window.searchData[result.ref]

            // Append the entry to the list.
            $('#searchResults').append(' + entry.url + '>' + entry.title + ')
        })
    })
}