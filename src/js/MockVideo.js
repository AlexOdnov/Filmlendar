export class MockVideo {
  constructor(selector = '.video') {
    this.videoContainer = document.querySelector(selector);
    this.playBtn = this.videoContainer.querySelector('.play-btn');
    this.init();
  }

  init() {
    this.playBtn.addEventListener('click', this.startVideo.bind(this));
  }

  startVideo(e) {
    e.preventDefault();

    this.video = document.createElement('iframe');
    this.video.width = this.videoContainer.offsetWidth;
    this.video.height = this.videoContainer.offsetHeight;
    this.video.src =
      'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&iv_load_policy=3';
    this.video.frameBorder = '0';
    this.video.allowfullscreen = '';
    this.video.allow = 'autoplay';

    this.videoContainer.append(this.video);

    this.playBtn.remove();
    delete this.playBtn;
    window.addEventListener('resize', this.updateVideo.bind(this));
  }

  updateVideo() {
    this.video.width = this.videoContainer.offsetWidth;
    this.video.height = this.videoContainer.offsetHeight;
  }
}

// ширина iframe не будет обновляться если videoContainer является grid-item с шириной заданной в fr. Ширину необходимо задавать в % либо minmax(1px, 1fr)
