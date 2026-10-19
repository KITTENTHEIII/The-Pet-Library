const walletAddresses = {
    btc: 'bc1q5f9t3cfyvm27f3tlemc2g9z63z7v5v8gn0daus',
    xmr: '41wNWLTaU9UA84mnLDs62qMiHgpt5hbhg72ttDPXEsCw4xRsjbsVJeJHb4A6DDSRJ6cMrZmnxzid8Joz9JorzNx6JMnnKvY'
};

function copyAddress(coin, button) {
    const address = walletAddresses[coin];

    navigator.clipboard.writeText(address).then(function () {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(function () {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(function () {
        // Fallback for browsers/contexts without clipboard API access
        const addressBox = document.getElementById('addr-' + coin);
        const range = document.createRange();
        range.selectNodeContents(addressBox);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });
}
