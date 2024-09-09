# Custom DHCP Leases Widget for Pi-hole

This enhancement adds a custom DHCP leases widget to the Pi-hole dashboard. The widget displays real-time information about DHCP leases, including sortable columns for time, hostname, IP address, and MAC address. The goal of this widget is to provide more visibility into the devices on your network and their DHCP assignments.

![alt text](image.png)

## Features:
- Sortable columns for Time, Hostname, IP Address, and MAC Address.
- Easy integration with the existing Pi-hole dashboard.
- Responsive table that works across different screen sizes.

## Installation Instructions:

### 1. Clone the Repository
First, clone this repository to your Pi-hole server and switch to the appropriate branch:
```bash
git clone https://github.com/toddhutch/piholeweb.git
cd piholeweb
git checkout custom-dhcp-widget

2. Copy the JavaScript File
You need to copy the dhcp.js file into the appropriate folder on your Pi-hole server:

cp admin/scripts/custom/dhcp.js /var/www/html/admin/scripts/custom/

3. Modify the Pi-hole Dashboard
To add the DHCP leases widget to your Pi-hole dashboard, modify the index.php file located in /var/www/html/admin/:
3.1 Add the following code where you want the widget to appear (typically below existing dashboard elements like "Top Clients"):

<div class="row">
    <div class="<?php echo $tablelayout; ?>">
        <div class="box" id="dhcp-leases">
            <div class="box-header with-border">
                <h3 class="box-title">Recent DHCP Leases</h3>
            </div>
            <div class="box-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dhcpTable">
                        <thead>
                            <tr>
                                <th onclick="sortTable(0)">Time <span id="timeSort"></span></th>
                                <th onclick="sortTable(1)">Hostname <span id="hostnameSort"></span></th>
                                <th onclick="sortTable(2)">IP Address <span id="ipSort"></span></th>
                                <th onclick="sortTable(3)">MAC Address <span id="macSort"></span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- PHP to fetch and display DHCP lease data here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
3.2 At the bottom of the index.php file, add the reference to the dhcp.js file:

<script src="/admin/scripts/custom/dhcp.js"></script>