
    //  Annual Sales Report Chart
    const ctx1 = document.getElementById('chart1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales',
                data: [30, 45, 25, 60, 40, 70, 55, 75, 65, 85, 50, 95],
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }]
        },
        options: { responsive: true }
    });

    // Monthly Highest Rate of Orders Chart
    const ctx2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['P001', 'P004', 'P006', 'P010', 'P005', 'P012', 'P054', 'P046', 'P076', 'P061'],
            datasets: [{
                label: 'Orders',
                data: [300, 600, 400, 900, 800, 700, 1000, 500, 800, 600],
                backgroundColor: 'purple'
            }]
        },
        options: { responsive: true }
    });

    // Food Items Count Report Chart
    const ctx3 = document.getElementById('chart3').getContext('2d');
    new Chart(ctx3, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Food Items',
                data: [25, 40, 30, 50, 45, 65, 55, 70, 60, 75, 50, 85],
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }]
        },
        options: { responsive: true }
    });

    // Monthly Sales Report Chart 
    const ctx4 = document.getElementById('chart4').getContext('2d');
    new Chart(ctx4, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales',
                data: [1000, 1500, 1250, 2000, 1700, 2500, 2300, 2700, 2500, 2900, 2000, 3100],
                borderColor: 'purple',
                borderWidth: 2,
                fill: true,
                backgroundColor: 'rgba(128, 0, 128, 0.1)'
            }]
        },
        options: { 
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true
                }
            }
        }
    });

