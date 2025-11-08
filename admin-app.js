// Dönerbude Admin System - Complete Application

// ========== AUTHENTICATION ==========
const AUTH = {
    // Demo credentials
    users: {
        'admin': 'admin123'
    },
    
    login: function(username, password) {
        if (this.users[username] && this.users[username] === password) {
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            return true;
        }
        return false;
    },
    
    logout: function() {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        window.location.href = 'admin-login.html';
    },
    
    checkAuth: function() {
        if (localStorage.getItem('adminLoggedIn') !== 'true') {
            window.location.href = 'admin-login.html';
        }
    },
    
    getUsername: function() {
        return localStorage.getItem('adminUsername') || 'Admin';
    }
};

// ========== DATA MANAGEMENT ==========
const DATA = {
    // Initialize with demo data
    init: function() {
        if (!localStorage.getItem('orders')) {
            const demoOrders = this.generateDemoOrders();
            localStorage.setItem('orders', JSON.stringify(demoOrders));
        }
    },
    
    generateDemoOrders: function() {
        const products = ['Döner Tasche', 'Döner Teller', 'Pizza Margherita', 'Lahmacun', 'Pommes', 'Salat'];
        const orders = [];
        const now = new Date();
        
        // Generate 50 orders over last 30 days
        for (let i = 0; i < 50; i++) {
            const daysAgo = Math.floor(Math.random() * 30);
            const hour = Math.floor(Math.random() * 10) + 11; // 11-20 Uhr
            const minute = Math.floor(Math.random() * 60);
            
            const orderDate = new Date(now);
            orderDate.setDate(orderDate.getDate() - daysAgo);
            orderDate.setHours(hour, minute, 0, 0);
            
            const numItems = Math.floor(Math.random() * 3) + 1;
            const items = [];
            let total = 0;
            
            for (let j = 0; j < numItems; j++) {
                const product = products[Math.floor(Math.random() * products.length)];
                const quantity = Math.floor(Math.random() * 2) + 1;
                const price = (Math.random() * 8 + 5).toFixed(2);
                items.push(`${quantity}x ${product}`);
                total += parseFloat(price) * quantity;
            }
            
            let status = 'completed';
            if (daysAgo === 0) {
                const rand = Math.random();
                if (rand < 0.3) status = 'pending';
                else if (rand < 0.6) status = 'in-progress';
            }
            
            orders.push({
                id: `#${1000 + i}`,
                customer: `Kunde ${i + 1}`,
                phone: `0${Math.floor(Math.random() * 900000000 + 100000000)}`,
                type: ['pickup', 'delivery', 'dine-in'][Math.floor(Math.random() * 3)],
                address: status === 'delivery' ? 'Musterstraße 123, 48346 Beelen' : '',
                items: items.join(', '),
                total: total.toFixed(2),
                payment: ['cash', 'card', 'online'][Math.floor(Math.random() * 3)],
                status: status,
                notes: '',
                timestamp: orderDate.getTime()
            });
        }
        
        return orders.sort((a, b) => b.timestamp - a.timestamp);
    },
    
    getOrders: function() {
        return JSON.parse(localStorage.getItem('orders')) || [];
    },
    
    saveOrders: function(orders) {
        localStorage.setItem('orders', JSON.stringify(orders));
    },
    
    addOrder: function(order) {
        const orders = this.getOrders();
        order.id = `#${1000 + orders.length}`;
        order.timestamp = Date.now();
        order.status = 'pending';
        orders.unshift(order);
        this.saveOrders(orders);
        return order;
    },
    
    updateOrderStatus: function(orderId, newStatus) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            this.saveOrders(orders);
        }
    },
    
    deleteOrder: function(orderId) {
        let orders = this.getOrders();
        orders = orders.filter(o => o.id !== orderId);
        this.saveOrders(orders);
    }
};

// ========== UI HELPERS ==========
const UI = {
    formatDateTime: function(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    formatDate: function(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('de-DE');
    },
    
    formatTime: function(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    },
    
    updateCurrentDateTime: function() {
        const elem = document.getElementById('currentDateTime');
        if (elem) {
            const now = new Date();
            elem.textContent = now.toLocaleString('de-DE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }
};

// ========== LOGIN PAGE ==========
if (window.location.pathname.includes('admin-login.html')) {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        window.location.href = 'admin-dashboard.html';
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (AUTH.login(username, password)) {
            window.location.href = 'admin-dashboard.html';
        } else {
            errorMessage.textContent = 'Ungültiger Benutzername oder Passwort';
            errorMessage.classList.add('show');
        }
    });
}

// ========== DASHBOARD PAGE ==========
if (window.location.pathname.includes('admin-dashboard.html')) {
    AUTH.checkAuth();
    DATA.init();
    
    let currentFilter = 'all';
    
    // Update UI elements
    function updateDashboard() {
        const orders = DATA.getOrders();
        const today = new Date().toDateString();
        
        // Calculate stats
        const pending = orders.filter(o => o.status === 'pending').length;
        const inProgress = orders.filter(o => o.status === 'in-progress').length;
        const completedToday = orders.filter(o => {
            return o.status === 'completed' && new Date(o.timestamp).toDateString() === today;
        }).length;
        
        const todayOrders = orders.filter(o => new Date(o.timestamp).toDateString() === today);
        const todayRevenue = todayOrders.filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + parseFloat(o.total), 0);
        
        // Update stats cards
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('inProgressCount').textContent = inProgress;
        document.getElementById('completedToday').textContent = completedToday;
        document.getElementById('todayRevenue').textContent = todayRevenue.toFixed(2) + ' €';
        
        // Display orders
        displayOrders(orders);
    }
    
    function displayOrders(orders) {
        const container = document.getElementById('ordersContainer');
        
        // Filter orders
        let filtered = orders;
        if (currentFilter !== 'all') {
            filtered = orders.filter(o => o.status === currentFilter);
        }
        
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>Keine Bestellungen</h3>
                    <p>Es gibt keine Bestellungen in dieser Kategorie.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filtered.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <span class="order-number">${order.id}</span>
                        <div class="order-time">
                            <i class="fas fa-clock"></i>
                            ${UI.formatDateTime(order.timestamp)}
                        </div>
                    </div>
                    <span class="order-status-badge ${order.status}">${getStatusText(order.status)}</span>
                </div>
                <div class="order-body">
                    <div class="order-customer">
                        <div class="customer-info">
                            <i class="fas fa-user"></i>
                            <span>${order.customer}</span>
                        </div>
                        <div class="customer-info">
                            <i class="fas fa-phone"></i>
                            <span>${order.phone}</span>
                        </div>
                        <div class="customer-info">
                            <i class="fas fa-${order.type === 'delivery' ? 'truck' : order.type === 'pickup' ? 'shopping-bag' : 'utensils'}"></i>
                            <span>${getOrderType(order.type)}</span>
                        </div>
                        <div class="customer-info">
                            <i class="fas fa-${order.payment === 'cash' ? 'money-bill' : order.payment === 'card' ? 'credit-card' : 'globe'}"></i>
                            <span>${getPaymentText(order.payment)}</span>
                        </div>
                    </div>
                    ${order.address ? `<div class="customer-info"><i class="fas fa-map-marker-alt"></i><span>${order.address}</span></div>` : ''}
                    <div class="order-items">
                        <h4>Bestellung:</h4>
                        <p>${order.items}</p>
                    </div>
                    ${order.notes ? `<div class="order-notes"><strong>Notizen:</strong> ${order.notes}</div>` : ''}
                </div>
                <div class="order-footer">
                    <div class="order-total">${order.total} €</div>
                    <div class="order-actions">
                        ${order.status === 'pending' ? `<button class="btn-action btn-start" onclick="updateStatus('${order.id}', 'in-progress')">
                            <i class="fas fa-play"></i> Starten
                        </button>` : ''}
                        ${order.status === 'in-progress' ? `<button class="btn-action btn-complete" onclick="updateStatus('${order.id}', 'completed')">
                            <i class="fas fa-check"></i> Erledigt
                        </button>` : ''}
                        <button class="btn-action btn-delete" onclick="deleteOrder('${order.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    function getStatusText(status) {
        const texts = {
            'pending': 'Offen',
            'in-progress': 'In Bearbeitung',
            'completed': 'Erledigt'
        };
        return texts[status] || status;
    }
    
    function getOrderType(type) {
        const types = {
            'pickup': 'Abholung',
            'delivery': 'Lieferung',
            'dine-in': 'Vor Ort'
        };
        return types[type] || type;
    }
    
    function getPaymentText(payment) {
        const payments = {
            'cash': 'Bar',
            'card': 'Karte',
            'online': 'Online'
        };
        return payments[payment] || payment;
    }
    
    // Make functions global
    window.updateStatus = function(orderId, newStatus) {
        DATA.updateOrderStatus(orderId, newStatus);
        updateDashboard();
    };
    
    window.deleteOrder = function(orderId) {
        if (confirm('Bestellung wirklich löschen?')) {
            DATA.deleteOrder(orderId);
            updateDashboard();
        }
    };
    
    // Filter tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.status;
            updateDashboard();
        });
    });
    
    // New order modal
    const modal = document.getElementById('newOrderModal');
    const newOrderBtn = document.getElementById('newOrderBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelOrder = document.getElementById('cancelOrder');
    const newOrderForm = document.getElementById('newOrderForm');
    const orderType = document.getElementById('orderType');
    const addressGroup = document.getElementById('addressGroup');
    
    newOrderBtn.addEventListener('click', () => modal.classList.add('show'));
    closeModal.addEventListener('click', () => modal.classList.remove('show'));
    cancelOrder.addEventListener('click', () => modal.classList.remove('show'));
    
    orderType.addEventListener('change', function() {
        if (this.value === 'delivery') {
            addressGroup.style.display = 'block';
            document.getElementById('customerAddress').required = true;
        } else {
            addressGroup.style.display = 'none';
            document.getElementById('customerAddress').required = false;
        }
    });
    
    newOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const order = {
            customer: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            type: document.getElementById('orderType').value,
            address: document.getElementById('customerAddress').value,
            items: document.getElementById('orderItems').value,
            total: document.getElementById('orderTotal').value,
            payment: document.getElementById('paymentMethod').value,
            notes: document.getElementById('orderNotes').value
        };
        
        DATA.addOrder(order);
        modal.classList.remove('show');
        newOrderForm.reset();
        updateDashboard();
    });
    
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', updateDashboard);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        AUTH.logout();
    });
    
    // Update username
    document.getElementById('currentUser').innerHTML = `Angemeldet als: <strong>${AUTH.getUsername()}</strong>`;
    
    // Update time
    UI.updateCurrentDateTime();
    setInterval(UI.updateCurrentDateTime, 60000);
    
    // Initial load
    updateDashboard();
}

// ========== STATISTICS PAGE ==========
if (window.location.pathname.includes('admin-stats.html')) {
    AUTH.checkAuth();
    DATA.init();
    
    let currentPeriod = 'month';
    
    function updateStatistics() {
        const orders = DATA.getOrders();
        const filtered = filterOrdersByPeriod(orders, currentPeriod);
        
        // Calculate summary stats
        const totalRevenue = filtered.filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + parseFloat(o.total), 0);
        const totalOrders = filtered.filter(o => o.status === 'completed').length;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        
        // Find top product
        const productCounts = {};
        filtered.forEach(order => {
            const items = order.items.split(',');
            items.forEach(item => {
                const product = item.trim().replace(/^\d+x\s*/, '');
                productCounts[product] = (productCounts[product] || 0) + 1;
            });
        });
        
        const topProduct = Object.keys(productCounts).length > 0 
            ? Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b)
            : '-';
        
        // Update summary cards
        document.getElementById('totalRevenue').textContent = totalRevenue.toFixed(2) + ' €';
        document.getElementById('totalOrders').textContent = totalOrders;
        document.getElementById('avgOrderValue').textContent = avgOrderValue.toFixed(2) + ' €';
        document.getElementById('topProduct').textContent = topProduct;
        
        // Create charts
        createRevenueChart(filtered);
        createOrderTypesChart(filtered);
        createHourlyChart(filtered);
        createPaymentChart(filtered);
        
        // Update product table
        updateProductTable(filtered);
        
        // Update monthly table
        updateMonthlyTable(orders);
    }
    
    function filterOrdersByPeriod(orders, period) {
        const now = new Date();
        const completed = orders.filter(o => o.status === 'completed');
        
        switch(period) {
            case 'today':
                return completed.filter(o => new Date(o.timestamp).toDateString() === now.toDateString());
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return completed.filter(o => new Date(o.timestamp) >= weekAgo);
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                return completed.filter(o => new Date(o.timestamp) >= monthAgo);
            case 'year':
                const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                return completed.filter(o => new Date(o.timestamp) >= yearAgo);
            default:
                return completed;
        }
    }
    
    // Chart creation functions
    let charts = {};
    
    function createRevenueChart(orders) {
        const canvas = document.getElementById('revenueChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Group by date
        const dailyRevenue = {};
        orders.forEach(order => {
            const date = UI.formatDate(order.timestamp);
            dailyRevenue[date] = (dailyRevenue[date] || 0) + parseFloat(order.total);
        });
        
        const sortedDates = Object.keys(dailyRevenue).sort();
        const last7Days = sortedDates.slice(-7);
        const data = last7Days.map(date => dailyRevenue[date]);
        
        if (charts.revenue) charts.revenue.destroy();
        
        charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Umsatz (€)',
                    data: data,
                    borderColor: '#ffd700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        ticks: { color: '#fff' },
                        grid: { color: '#333' }
                    },
                    x: { 
                        ticks: { color: '#fff' },
                        grid: { color: '#333' }
                    }
                }
            }
        });
    }
    
    function createOrderTypesChart(orders) {
        const canvas = document.getElementById('orderTypesChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const types = { pickup: 0, delivery: 0, 'dine-in': 0 };
        orders.forEach(o => types[o.type]++);
        
        if (charts.types) charts.types.destroy();
        
        charts.types = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Abholung', 'Lieferung', 'Vor Ort'],
                datasets: [{
                    data: [types.pickup, types.delivery, types['dine-in']],
                    backgroundColor: ['#ffd700', '#3b82f6', '#10b981']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                }
            }
        });
    }
    
    function createHourlyChart(orders) {
        const canvas = document.getElementById('hourlyChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const hourly = new Array(24).fill(0);
        orders.forEach(o => {
            const hour = new Date(o.timestamp).getHours();
            hourly[hour]++;
        });
        
        if (charts.hourly) charts.hourly.destroy();
        
        charts.hourly = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({length: 24}, (_, i) => i + ':00'),
                datasets: [{
                    label: 'Bestellungen',
                    data: hourly,
                    backgroundColor: '#ffd700'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        ticks: { color: '#fff' },
                        grid: { color: '#333' }
                    },
                    x: { 
                        ticks: { color: '#fff' },
                        grid: { color: '#333' }
                    }
                }
            }
        });
    }
    
    function createPaymentChart(orders) {
        const canvas = document.getElementById('paymentChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const payments = { cash: 0, card: 0, online: 0 };
        orders.forEach(o => payments[o.payment]++);
        
        if (charts.payment) charts.payment.destroy();
        
        charts.payment = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Bar', 'Karte', 'Online'],
                datasets: [{
                    data: [payments.cash, payments.card, payments.online],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#fff' } }
                }
            }
        });
    }
    
    function updateProductTable(orders) {
        const productStats = {};
        
        orders.forEach(order => {
            const items = order.items.split(',');
            items.forEach(item => {
                const match = item.trim().match(/^(\d+)x\s*(.+)$/);
                if (match) {
                    const quantity = parseInt(match[1]);
                    const product = match[2];
                    if (!productStats[product]) {
                        productStats[product] = { count: 0, revenue: 0 };
                    }
                    productStats[product].count += quantity;
                    productStats[product].revenue += parseFloat(order.total) / items.length;
                }
            });
        });
        
        const sorted = Object.entries(productStats)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 10);
        
        const totalRevenue = sorted.reduce((sum, [, stats]) => sum + stats.revenue, 0);
        
        const tbody = document.getElementById('productTable');
        tbody.innerHTML = sorted.map(([product, stats], index) => {
            const percentage = (stats.revenue / totalRevenue * 100).toFixed(1);
            const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'other';
            
            return `
                <tr>
                    <td><span class="rank-badge ${rankClass}">${index + 1}</span></td>
                    <td>${product}</td>
                    <td>${stats.count}</td>
                    <td>${stats.revenue.toFixed(2)} €</td>
                    <td>
                        <div class="percentage-bar">
                            <div class="percentage-fill" style="width: ${percentage}%"></div>
                        </div>
                        ${percentage}%
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    function updateMonthlyTable(orders) {
        const monthlyStats = {};
        const completed = orders.filter(o => o.status === 'completed');
        
        completed.forEach(order => {
            const date = new Date(order.timestamp);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!monthlyStats[monthKey]) {
                monthlyStats[monthKey] = { orders: 0, revenue: 0 };
            }
            monthlyStats[monthKey].orders++;
            monthlyStats[monthKey].revenue += parseFloat(order.total);
        });
        
        const sorted = Object.entries(monthlyStats)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .slice(0, 12);
        
        const tbody = document.getElementById('monthlyTable');
        tbody.innerHTML = sorted.map(([month, stats], index) => {
            const [year, monthNum] = month.split('-');
            const monthName = new Date(year, monthNum - 1).toLocaleString('de-DE', { month: 'long', year: 'numeric' });
            const avg = stats.revenue / stats.orders;
            
            let trend = '';
            if (index < sorted.length - 1) {
                const prevRevenue = sorted[index + 1][1].revenue;
                const change = ((stats.revenue - prevRevenue) / prevRevenue * 100).toFixed(1);
                trend = change > 0 
                    ? `<span class="trend-positive"><i class="fas fa-arrow-up"></i> +${change}%</span>`
                    : `<span class="trend-negative"><i class="fas fa-arrow-down"></i> ${change}%</span>`;
            }
            
            return `
                <tr>
                    <td>${monthName}</td>
                    <td>${stats.orders}</td>
                    <td>${stats.revenue.toFixed(2)} €</td>
                    <td>${avg.toFixed(2)} €</td>
                    <td>${trend}</td>
                </tr>
            `;
        }).join('');
    }
    
    // Period filter
    document.getElementById('periodFilter').addEventListener('change', function() {
        currentPeriod = this.value;
        updateStatistics();
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        AUTH.logout();
    });
    
    // Update username
    document.getElementById('currentUser').innerHTML = `Angemeldet als: <strong>${AUTH.getUsername()}</strong>`;
    
    // Update time
    UI.updateCurrentDateTime();
    setInterval(UI.updateCurrentDateTime, 60000);
    
    // Initial load
    updateStatistics();
}
