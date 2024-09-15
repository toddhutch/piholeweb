function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dhcpTable");
    switching = true;
    dir = "asc"; // Set the sorting direction to ascending by default
    resetSortIcons(); // Reset the sort icons before applying new sorting

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Sorting by IP Address (column 2)
            if (n === 2) {
                var xIP = parseIP(x.innerHTML.trim());
                var yIP = parseIP(y.innerHTML.trim());
                console.log(`Comparing IPs: ${x.innerHTML.trim()} (${xIP}) vs ${y.innerHTML.trim()} (${yIP})`);

                if (dir == "asc" && xIP > yIP) {
                    shouldSwitch = true;
                    console.log("Switching rows because", xIP, "is greater than", yIP);
                    break;
                } else if (dir == "desc" && xIP < yIP) {
                    shouldSwitch = true;
                    console.log("Switching rows because", xIP, "is less than", yIP);
                    break;
                }
            }
            // Sorting by Time (column 0)
            else if (n === 0) {
                var xTime = parseInt(x.getAttribute("data-timestamp"));
                var yTime = parseInt(y.getAttribute("data-timestamp"));

                if (dir == "asc" && xTime > yTime) {
                    shouldSwitch = true;
                    console.log("Switching rows based on timestamp");
                    break;
                } else if (dir == "desc" && xTime < yTime) {
                    shouldSwitch = true;
                    console.log("Switching rows based on timestamp");
                    break;
                }
            }
            // Default sorting for other columns (Hostname and MAC)
            else {
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        console.log(`Switching rows because ${x.innerHTML.toLowerCase()} is greater than ${y.innerHTML.toLowerCase()}`);
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        console.log(`Switching rows because ${x.innerHTML.toLowerCase()} is less than ${y.innerHTML.toLowerCase()}`);
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            console.log("Swapping rows", i, "and", i + 1);
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            // If no switching has been done, switch direction and try again
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
                console.log("Switching to descending order");
            }
        }
    }
    setSortIcon(n, dir); // Set the sorting icon after sorting is complete
}

// Convert IP address to a sortable integer for comparison
function parseIP(ip) {
    try {
        // Use a regular expression to extract only the IP address from the string
        const plainIP = ip.replace(/<a.*?>|<\/a>/g, '').trim(); // Remove the <a> tags

        return plainIP.split('.').map(Number).reduce(function(total, num) {
            return (total << 8) + num;
        });
    } catch (e) {
        return 0; // Return 0 for invalid IPs to push them to the top/bottom
    }
}

// Reset the sort icons for all columns
function resetSortIcons() {
    document.getElementById('timeSort').innerHTML = '';
    document.getElementById('hostnameSort').innerHTML = '';
    document.getElementById('ipSort').innerHTML = '';
    document.getElementById('macSort').innerHTML = '';
}

// Set the sort icon for the sorted column
function setSortIcon(columnIndex, direction) {
    var icon = direction === 'asc' ? '▲' : '▼';
    if (columnIndex == 0) document.getElementById('timeSort').innerHTML = icon;
    if (columnIndex == 1) document.getElementById('hostnameSort').innerHTML = icon;
    if (columnIndex == 2) document.getElementById('ipSort').innerHTML = icon;
    if (columnIndex == 3) document.getElementById('macSort').innerHTML = icon;
}
