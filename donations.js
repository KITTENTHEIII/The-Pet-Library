// Wallet addresses live here so they only need updating in one place.
// Replace these placeholders with your real addresses before publishing.
const walletAddresses = {
    btc: 'bc1qqx978drgg59h3pcxlsjvam9lvf0y3yqrmps6nc',
    eth: '0x57aD77A0e7A5639Df4De7dE755E778bC1A83Eff3'
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