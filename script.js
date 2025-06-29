document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Simulate blockchain initialization
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Show auth modal after preloader
        setTimeout(() => {
            document.getElementById('authModal').classList.add('active');
        }, 500);
    }, 3000);
    
    // Auth Modal
    const authModal = document.getElementById('authModal');
    const closeAuth = document.getElementById('closeAuth');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authContents = document.querySelectorAll('.auth-content');
    const forgotPasswordLinks = document.querySelectorAll('.forgot-password');
    
    // Switch between auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            authContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabName) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Forgot password link
    forgotPasswordLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Switch to recover tab
            authTabs.forEach(t => t.classList.remove('active'));
            document.querySelector('.auth-tab[data-tab="recover"]').classList.add('active');
            
            authContents.forEach(content => {
                content.classList.remove('active');
                document.getElementById('recover').classList.add('active');
            });
        });
    });
    
    // Close auth modal
    closeAuth.addEventListener('click', () => {
        authModal.classList.remove('active');
    });
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate login
        simulateLogin()
            .then(() => {
                authModal.classList.remove('active');
                document.querySelector('.app-container').style.display = 'block';
                
                // Show success notification
                showNotification('Login Successful', 'You have successfully logged in to your account.');
                
                // Initialize blockchain visualization
                initBlockchainVisualization();
                
                // Initialize network graph
                initNetworkGraph();
            })
            .catch(error => {
                showNotification('Login Failed', error, 'error');
            });
    });
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    const registerPassword = document.getElementById('registerPassword');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    registerPassword.addEventListener('input', () => {
        const password = registerPassword.value;
        const strength = calculatePasswordStrength(password);
        
        // Update strength bars
        strengthBars.forEach((bar, index) => {
            if (index < strength) {
                bar.style.backgroundColor = getStrengthColor(strength);
                bar.style.width = '100%';
            } else {
                bar.style.backgroundColor = '#eee';
                bar.style.width = '0%';
            }
        });
        
        // Update strength text
        const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        strengthText.textContent = strengthLabels[strength - 1];
        strengthText.style.color = getStrengthColor(strength);
    });
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate registration
        simulateRegistration()
            .then(() => {
                showNotification('Account Created', 'Your account has been successfully created.');
                
                // Switch to login tab
                authTabs.forEach(t => t.classList.remove('active'));
                document.querySelector('.auth-tab[data-tab="login"]').classList.add('active');
                
                authContents.forEach(content => {
                    content.classList.remove('active');
                    document.getElementById('login').classList.add('active');
                });
            })
            .catch(error => {
                showNotification('Registration Failed', error, 'error');
            });
    });
    
    // Recover Form
    const recoverForm = document.getElementById('recoverForm');
    recoverForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate recovery
        simulateRecovery()
            .then(() => {
                showNotification('Wallet Recovered', 'Your wallet has been successfully recovered.');
                
                // Switch to login tab
                authTabs.forEach(t => t.classList.remove('active'));
                document.querySelector('.auth-tab[data-tab="login"]').classList.add('active');
                
                authContents.forEach(content => {
                    content.classList.remove('active');
                    document.getElementById('login').classList.add('active');
                });
            })
            .catch(error => {
                showNotification('Recovery Failed', error, 'error');
            });
    });
    
    // App Container
    const appContainer = document.querySelector('.app-container');
    
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Menu Navigation
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active menu item
            menuLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Show corresponding content
            const target = link.getAttribute('href').substring(1);
            contentSections.forEach(section => {
                section.style.display = 'none';
                if (section.id === `${target}Content`) {
                    section.style.display = 'block';
                }
            });
        });
    });
    
    // Transaction Modal
    const transactionModal = document.getElementById('transactionModal');
    const createTransactionBtn = document.getElementById('createTransactionBtn');
    const closeTransaction = document.getElementById('closeTransaction');
    const transactionTabs = document.querySelectorAll('.transaction-tab');
    const transactionContents = document.querySelectorAll('.transaction-content');
    
    // Open transaction modal
    createTransactionBtn.addEventListener('click', () => {
        transactionModal.classList.add('active');
    });
    
    // Close transaction modal
    closeTransaction.addEventListener('click', () => {
        transactionModal.classList.remove('active');
    });
    
    // Switch between transaction tabs
    transactionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Update active tab
            transactionTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            transactionContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabName) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Send Form
    const sendForm = document.getElementById('sendForm');
    const scanQR = document.getElementById('scanQR');
    const sendMax = document.getElementById('sendMax');
    const gasOptions = document.querySelectorAll('.gas-option');
    const gasPriceSlider = document.getElementById('gasPrice');
    
    sendForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate transaction
        simulateTransaction()
            .then(() => {
                transactionModal.classList.remove('active');
                showNotification('Transaction Sent', 'Your transaction has been broadcasted to the network.');
            })
            .catch(error => {
                showNotification('Transaction Failed', error, 'error');
            });
    });
    
    // Scan QR code
    scanQR.addEventListener('click', () => {
        openQRScanner('recipientAddress');
    });
    
    // Send max amount
    sendMax.addEventListener('click', () => {
        document.getElementById('sendAmount').value = '5.42';
    });
    
    // Gas options
    gasOptions.forEach(option => {
        option.addEventListener('click', () => {
            gasOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            const speed = option.getAttribute('data-speed');
            let price = 20; // slow
            
            if (speed === 'average') price = 32;
            if (speed === 'fast') price = 45;
            
            gasPriceSlider.value = price;
        });
    });
    
    // Gas price slider
    gasPriceSlider.addEventListener('input', () => {
        const price = gasPriceSlider.value;
        
        // Update active gas option
        gasOptions.forEach(o => o.classList.remove('active'));
        
        if (price < 25) {
            document.querySelector('.gas-option[data-speed="slow"]').classList.add('active');
        } else if (price < 40) {
            document.querySelector('.gas-option[data-speed="average"]').classList.add('active');
        } else {
            document.querySelector('.gas-option[data-speed="fast"]').classList.add('active');
        }
    });
    
    // Receive Tab
    const copyAddress = document.getElementById('copyAddress');
    
    copyAddress.addEventListener('click', () => {
        const address = document.querySelector('.wallet-address span').textContent;
        navigator.clipboard.writeText(address)
            .then(() => {
                showNotification('Copied', 'Wallet address copied to clipboard.');
            })
            .catch(err => {
                showNotification('Error', 'Failed to copy address', 'error');
            });
    });
    
    // Swap Tab
    const swapForm = document.getElementById('swapForm');
    const swapDirection = document.getElementById('swapDirection');
    const refreshRate = document.getElementById('refreshRate');
    
    swapForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate swap
        simulateSwap()
            .then(() => {
                transactionModal.classList.remove('active');
                showNotification('Swap Completed', 'Your tokens have been successfully swapped.');
            })
            .catch(error => {
                showNotification('Swap Failed', error, 'error');
            });
    });
    
    // Swap direction
    swapDirection.addEventListener('click', () => {
        const fromCurrency = document.getElementById('swapFromCurrency');
        const toCurrency = document.getElementById('swapToCurrency');
        
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        
        // Update amounts
        const fromAmount = document.getElementById('swapFromAmount').value;
        document.getElementById('swapFromAmount').value = document.getElementById('swapToAmount').value;
        document.getElementById('swapToAmount').value = fromAmount;
    });
    
    // Refresh rate
    refreshRate.addEventListener('click', () => {
        refreshRate.classList.add('rotating');
        setTimeout(() => {
            refreshRate.classList.remove('rotating');
        }, 500);
    });
    
    // Smart Contract Tab
    const contractForm = document.getElementById('contractForm');
    const loadABI = document.getElementById('loadABI');
    const contractFunction = document.getElementById('contractFunction');
    
    contractForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate contract interaction
        simulateContractInteraction()
            .then(() => {
                transactionModal.classList.remove('active');
                showNotification('Contract Executed', 'The smart contract function was successfully executed.');
            })
            .catch(error => {
                showNotification('Execution Failed', error, 'error');
            });
    });
    
    // Load ABI
    loadABI.addEventListener('click', () => {
        // Simulate ABI loading
        document.getElementById('contractABI').value = `[
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [{"name": "", "type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"name": "amount", "type": "uint256"}],
                "name": "deposit",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }
        ]`;
        
        // Enable function selector
        contractFunction.disabled = false;
        contractFunction.innerHTML = `
            <option value="">Select a function</option>
            <option value="getBalance">getBalance()</option>
            <option value="deposit">deposit(uint256 amount)</option>
        `;
    });
    
    // QR Scanner Modal
    const qrModal = document.getElementById('qrModal');
    const closeQR = document.getElementById('closeQR');
    const switchCamera = document.getElementById('switchCamera');
    const uploadQR = document.getElementById('uploadQR');
    
    // Close QR scanner
    closeQR.addEventListener('click', () => {
        qrModal.classList.remove('active');
        stopQRScanner();
    });
    
    // Switch camera
    switchCamera.addEventListener('click', () => {
        showNotification('Info', 'Camera switching functionality would be implemented here.');
    });
    
    // Upload QR image
    uploadQR.addEventListener('click', () => {
        showNotification('Info', 'QR code image upload functionality would be implemented here.');
    });
    
    // Notification Toast
    const notificationToast = document.getElementById('notificationToast');
    const toastClose = document.querySelector('.toast-close');
    
    toastClose.addEventListener('click', () => {
        notificationToast.classList.remove('show');
    });
    
    // Helper Functions
    function simulateLogin() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const username = document.getElementById('loginUsername').value;
                const password = document.getElementById('loginPassword').value;
                
                if (username && password) {
                    resolve();
                } else {
                    reject('Please enter both username and password');
                }
            }, 1000);
        });
    }
    
    function simulateRegistration() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const username = document.getElementById('registerUsername').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('registerConfirmPassword').value;
                const termsAgree = document.getElementById('termsAgree').checked;
                
                if (!username || !email || !password || !confirmPassword) {
                    reject('Please fill in all fields');
                } else if (password !== confirmPassword) {
                    reject('Passwords do not match');
                } else if (!termsAgree) {
                    reject('You must agree to the terms of service');
                } else {
                    resolve();
                }
            }, 1000);
        });
    }
    
    function simulateRecovery() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const email = document.getElementById('recoverEmail').value;
                const recoveryPhrase = document.getElementById('recoveryPhrase').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmNewPassword = document.getElementById('confirmNewPassword').value;
                
                if (!email || !recoveryPhrase || !newPassword || !confirmNewPassword) {
                    reject('Please fill in all fields');
                } else if (newPassword !== confirmNewPassword) {
                    reject('Passwords do not match');
                } else if (recoveryPhrase.split(' ').length !== 12) {
                    reject('Recovery phrase must be 12 words');
                } else {
                    resolve();
                }
            }, 1000);
        });
    }
    
    function simulateTransaction() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
    
    function simulateSwap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
    
    function simulateContractInteraction() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
    
    function calculatePasswordStrength(password) {
        if (password.length === 0) return 0;
        if (password.length < 6) return 1;
        if (password.length < 8) return 2;
        if (password.length < 10) return 3;
        if (password.length < 12) return 4;
        return 5;
    }
    
    function getStrengthColor(strength) {
        const colors = ['#f44336', '#ff9800', '#ffc107', '#4caf50', '#2e7d32'];
        return colors[strength - 1] || '#f44336';
    }
    
    function showNotification(title, message, type = 'success') {
        const toast = document.getElementById('notificationToast');
        const toastIcon = toast.querySelector('.toast-icon i');
        const toastTitle = toast.querySelector('.toast-content h3');
        const toastMessage = toast.querySelector('.toast-content p');
        
        // Set content
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        // Set icon and color based on type
        if (type === 'error') {
            toastIcon.className = 'fas fa-exclamation-circle';
            toastIcon.style.color = 'var(--danger-color)';
        } else if (type === 'warning') {
            toastIcon.className = 'fas fa-exclamation-triangle';
            toastIcon.style.color = 'var(--warning-color)';
        } else if (type === 'info') {
            toastIcon.className = 'fas fa-info-circle';
            toastIcon.style.color = 'var(--info-color)';
        } else {
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = 'var(--success-color)';
        }
        
        // Show toast
        toast.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
    
    function openQRScanner(targetFieldId) {
        const qrModal = document.getElementById('qrModal');
        qrModal.classList.add('active');
        
        // Simulate QR scanning
        setTimeout(() => {
            document.querySelector('.qr-result p').textContent = 'Scanned address: 0x5e6f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v';
            
            // Auto-fill the target field if provided
            if (targetFieldId) {
                document.getElementById(targetFieldId).value = '0x5e6f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v';
            }
        }, 2000);
    }
    
    function stopQRScanner() {
        document.querySelector('.qr-result p').textContent = 'Scanning...';
    }
    
    function initBlockchainVisualization() {
        const blockchainChain = document.querySelector('.blockchain-chain');
        
        // Clear existing blocks
        blockchainChain.innerHTML = '';
        
        // Add sample blocks
        for (let i = 0; i < 8; i++) {
            const block = document.createElement('div');
            block.className = 'block';
            block.style.backgroundColor = getRandomBlockColor();
            block.style.animationDelay = `${i * 0.2}s`;
            block.innerHTML = `
                <div class="block-header">Block #${1234567 + i}</div>
                <div class="block-hash">${generateRandomHash()}</div>
                <div class="block-transactions">${Math.floor(Math.random() * 10) + 1} TX</div>
            `;
            blockchainChain.appendChild(block);
        }
    }
    
    function getRandomBlockColor() {
        const colors = [
            'rgba(110, 69, 226, 0.8)',
            'rgba(136, 211, 206, 0.8)',
            'rgba(255, 126, 95, 0.8)',
            'rgba(33, 150, 243, 0.8)',
            'rgba(76, 175, 80, 0.8)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function generateRandomHash() {
        const chars = '0123456789abcdef';
        let hash = '0x';
        for (let i = 0; i < 16; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash + '...';
    }
    
    function initNetworkGraph() {
        const ctx = document.getElementById('networkGraph').getContext('2d');
        
        // Sample data for the graph
        const labels = [];
        const data = [];
        
        for (let i = 0; i < 24; i++) {
            labels.push(`${i}:00`);
            data.push(Math.floor(Math.random() * 100) + 50);
        }
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Network Activity',
                    data: data,
                    borderColor: 'rgba(110, 69, 226, 1)',
                    backgroundColor: 'rgba(110, 69, 226, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
});

// Add this JavaScript to handle the new functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching for settings
    const settingsTabs = document.querySelectorAll('.settings-tab');
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            settingsTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.settings-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Show/hide custom RPC settings
    const networkSelect = document.getElementById('networkSelection');
    networkSelect.addEventListener('change', function() {
        const customRpc = document.getElementById('customRpcSettings');
        if (this.value === 'custom') {
            customRpc.style.display = 'block';
        } else {
            customRpc.style.display = 'none';
        }
    });
    
    // Handle password change
    document.getElementById('changePassword').addEventListener('click', function() {
        // In a real app, this would show a modal with password change form
        alert('Password change functionality would be implemented here');
    });
    
    // Handle 2FA enable
    document.getElementById('enable2FA').addEventListener('click', function() {
        // In a real app, this would show a modal with 2FA setup
        alert('2FA setup would be implemented here');
    });
    
    // Handle wallet deletion confirmation
    document.getElementById('deleteWallet').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your wallet? This action cannot be undone.')) {
            alert('Wallet deletion would be implemented here');
        }
    });
    
    // Handle cache clearing
    document.getElementById('clearCache').addEventListener('click', function() {
        if (confirm('Clear all application cache? This will log you out and refresh the application.')) {
            alert('Cache clearing would be implemented here');
        }
    });
    
    // Handle settings reset
    document.getElementById('resetSettings').addEventListener('click', function() {
        if (confirm('Reset all settings to default values?')) {
            alert('Settings reset would be implemented here');
        }
    });
    
    // Handle export private key
    document.getElementById('exportPrivateKey').addEventListener('click', function() {
        const password = prompt('Please enter your password to export private key');
        if (password) {
            // In a real app, this would verify password and show private key
            alert('Private key export would be implemented here after password verification');
        }
    });
    
    // Handle wallet backup
    document.getElementById('backupWallet').addEventListener('click', function() {
        const password = prompt('Please enter your password to backup wallet');
        if (password) {
            // In a real app, this would verify password and download backup file
            alert('Wallet backup would be implemented here after password verification');
        }
    });
    
    // Handle transaction filtering
    document.getElementById('filterTransactions').addEventListener('click', function() {
        // In a real app, this would show advanced filtering options
        alert('Advanced transaction filtering would be implemented here');
    });
    
    // Handle adding new token
    document.getElementById('addToken').addEventListener('click', function() {
        const tokenAddress = prompt('Enter token contract address:');
        if (tokenAddress) {
            // In a real app, this would validate and add the token
            alert(`Token with address ${tokenAddress} would be added here`);
        }
    });
    
    // Handle importing NFT
    document.getElementById('importNFT').addEventListener('click', function() {
        const nftAddress = prompt('Enter NFT contract address:');
        if (nftAddress) {
            // In a real app, this would validate and import NFTs
            alert(`NFTs from contract ${nftAddress} would be imported here`);
        }
    });
    
    // Handle exporting transactions
    document.getElementById('exportTransactions').addEventListener('click', function() {
        // In a real app, this would export transactions as CSV
        alert('Transactions would be exported as CSV file');
    });
    
    // Handle network settings save
    document.getElementById('saveNetworkSettings').addEventListener('click', function() {
        // In a real app, this would save network settings
        alert('Network settings would be saved here');
    });
    
    // Handle general settings save
    document.getElementById('generalSettingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would save general settings
        alert('General settings would be saved here');
    });
});

// Handle navigation between different content sections
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Show the selected content section
    const target = this.getAttribute('data-target');
    document.getElementById(target).style.display = 'block';
  });
});

// Handle settings tabs
document.querySelectorAll('.settings-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    // Remove active class from all tabs
    document.querySelectorAll('.settings-tab').forEach(t => {
      t.classList.remove('active');
    });
    
    // Add active class to clicked tab
    this.classList.add('active');
    
    // Hide all settings content
    document.querySelectorAll('.settings-content').forEach(content => {
      content.classList.remove('active');
    });
    
    // Show the selected content
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId + 'Settings').classList.add('active');
  });
});

// Implement copy button functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const address = this.parentElement.querySelector('span').textContent;
    navigator.clipboard.writeText(address);
    // You might want to show a "copied" tooltip here
  });
});

// Add other button click handlers as needed
document.getElementById('exportWallet').addEventListener('click', exportWallet);
document.getElementById('addFunds').addEventListener('click', addFunds);
// ... and so on for all other buttons

function exportWallet() {
  // Implementation for exporting wallet
}

function addFunds() {
  // Implementation for adding funds
}