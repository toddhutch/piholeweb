function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dhcpTable");
    switching = true;
    dir = "asc";
    resetSortIcons();

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (n === 2) { // If the column is IP Address
                var xIP = parseIP(x.innerHTML);
                var yIP = parseIP(y.innerHTML);

                if (dir == "asc" && xIP > yIP) {
                    shouldSwitch = true;
                    break;
                } else if (dir == "desc" && xIP < yIP) {
                    shouldSwitch = true;
                    break;
                }
            } else if (n === 0) { // If the column is Time
                var xTime = parseInt(x.getAttribute("data-timestamp"));
                var yTime = parseInt(y.getAttribute("data-timestamp"));

                if (dir == "asc" && xTime > yTime) {
                    shouldSwitch = true;
                    break;
                } else if (dir == "desc" && xTime < yTime) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                // For other columns, continue with the default string comparison
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    setSortIcon(n, dir);
}

function parseIP(ip) {
    return ip.split('.').map(Number).reduce(function(total, num) {
        return (total << 8) + num;
    });
}

function resetSortIcons() {
    document.getElementById('timeSort').innerHTML = '';
    document.getElementById('hostnameSort').innerHTML = '';
    document.getElementById('ipSort').innerHTML = '';
    document.getElementById('macSort').innerHTML = '';
}

function setSortIcon(columnIndex, direction) {
    var icon = direction === 'asc' ? '▲' : '▼';
    if (columnIndex == 0) document.getElementById('timeSort').innerHTML = icon;
    if (columnIndex == 1) document.getElementById('hostnameSort').innerHTML = icon;
    if (columnIndex == 2) document.getElementById('ipSort').innerHTML = icon;
    if (columnIndex == 3) document.getElementById('macSort').innerHTML = icon;
}
