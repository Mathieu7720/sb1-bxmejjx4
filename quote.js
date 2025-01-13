document.getElementById('quoteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pickup = document.getElementById('pickup').value;
    const delivery = document.getElementById('delivery').value;

    // Simple quote calculation based on address length (for demonstration purposes)
    const quote = calculateQuote(pickup, delivery);

    document.getElementById('quoteResult').innerText = `Estimated Quote: $${quote}`;
});

function calculateQuote(pickup, delivery) {
    // Example calculation: $1 per character in the addresses
    const pickupLength = pickup.length;
    const deliveryLength = delivery.length;
    return (pickupLength + deliveryLength) * 1;
}