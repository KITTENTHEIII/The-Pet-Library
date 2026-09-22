const walletAddresses = {
    btc: 'bc1qdpqaudfp6wdnd33x28yxyfe7c3h3we8020mnjj',
    eth: '0xe610fFBa72509eFD5713435998C2bE6f120BB212'
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