document.addEventListener('DOMContentLoaded', function () {
    let videoReqForm = document.getElementById('videoReqForm');
    console.log(videoReqForm);

    videoReqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e);

        const formData = new FormData(videoReqForm);

        fetch('http://localhost:7777/video-request', {
            method: 'POST',
            body: formData,
        });
    });
});