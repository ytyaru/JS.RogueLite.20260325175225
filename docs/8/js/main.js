window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    document.body.appendChild(new Game());
    FocusLooper.setup();
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

