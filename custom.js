function showPosts(post) {
  let newPostWrapper = document.createElement('div');
  newPostWrapper.innerHTML = `
    <div class="card mb-3">
    <div class="card-body d-flex justify-content-between flex-row">
      <div class="d-flex flex-column">
        <h3>${post.topic_title}</h3>
        <p class="text-muted mb-2">${post.topic_details}</p>
        <p class="mb-0 text-muted">
          ${ post.expected_result &&
          `<strong>Expected results:</strong> ${post.expected_result}`}
        </p>
      </div>
      <div class="d-flex flex-column text-center">
        <a id="votes-up-${post._id}" class="btn btn-link">🔺</a>
        <h3 id="votes-score-${post._id}">${post.votes.ups - post.votes.downs}</h3>
        <a id="votes-down-${post._id}" class="btn btn-link">🔻</a>
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

        const votesScore = document.getElementById(`votes-score-${post._id}`);
        const votesUp = document.getElementById(`votes-up-${post._id}`);
        const votesDown = document.getElementById(`votes-down-${post._id}`);

        votesUp.addEventListener('click', (e) => {
          fetch('http://localhost:7777/video-request/vote', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: post._id, vote_type: 'ups' }),
          })
            .then((bolb) => bolb.json())
            .then((data) => {
              votesScore.innerText = data.ups - data.downs;
            })
        });

        votesDown.addEventListener('click', (e) => {
          fetch('http://localhost:7777/video-request/vote', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: post._id, vote_type: 'downs' }),
          })
            .then((bolb) => bolb.json())
            .then((data) => {
              votesScore.innerText = data.ups - data.downs;
            })
        });



      });
    });

  videoReqForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(videoReqForm);

    fetch('http://localhost:7777/video-request', {
      method: 'POST',
      body: formData,
    })
      .then((bolb) => bolb.json())
      .then((data) => {
        listOfRequests.prepend(showPosts(data));
      });
  });
});