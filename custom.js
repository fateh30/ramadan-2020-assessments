function showPosts(post) {
    let newPostWrapper = document.createElement('div');
    newPostWrapper.innerHTML = `
    <div class="card mb-3">
    <div class="card-body d-flex justify-content-between flex-row">
      <div class="d-flex flex-column">
        <h3>${post.topic_title}</h3>
        <p class="text-muted mb-2">${post.topic_details}</p>
        <p class="mb-0 text-muted">
          <strong>Expected results:</strong> ${post.expected_result}
        </p>
      </div>
      <div class="d-flex flex-column text-center">
        <a class="btn btn-link">🔺</a>
        <h3>0</h3>
        <a class="btn btn-link">🔻</a>
      </div>
    </div>
    <div class="card-footer d-flex flex-row justify-content-between">
      <div>
        <span class="text-info">${post.status.toUpperCase()}</span>
        &bullet; added by <strong>${post.author_name}</strong> on
        <strong>${new Date(post.submit_date).toLocaleDateString()}</strong>
      </div>
      <div class="d-flex justify-content-center flex-column 408ml-auto mr-2">
        <div class="badge badge-success">${post.target_level}</div>
      </div>
    </div>
  </div>
`
    return newPostWrapper;
}


document.addEventListener('DOMContentLoaded', function () {
    const videoReqForm = document.getElementById('videoReqForm');
    const listOfRequests = document.getElementById('listOfRequests');



    fetch('http://localhost:7777/video-request')
        .then((blob) => blob.json())
        .then((posts) => {

            posts.forEach(post => {
                listOfRequests.appendChild(showPosts(post));
            });
        });

    videoReqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log(e);

        const formData = new FormData(videoReqForm);

        fetch('http://localhost:7777/video-request', {
            method: 'POST',
            body: formData,
        });
    });
});