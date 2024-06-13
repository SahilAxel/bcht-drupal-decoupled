(function (Drupal, $, once) {
  Drupal.behaviors.global = {
    attach: function (context) {
      once('video-embed', '.video-embed__wrapper', context).forEach(
        (element) => {
          const overlay = element.querySelector('.video-player__overlay');
          const videoContainer = element.querySelector('.video-player__video');

          if (overlay && videoContainer) {
            overlay.addEventListener('click', handleOverlayClick);
            videoContainer.addEventListener('click', handleVideoContainerClick);
          }

          function handleOverlayClick() {
            overlay.style.display = 'none';
            playVideo();
          }

          function handleVideoContainerClick() {
            toggleVideo();
          }

          function playVideo() {
            const video = videoContainer.querySelector('video');
            if (video) {
              video.play();
            } else {
              const iframe = videoContainer.querySelector('iframe');
              if (iframe) {
                iframe.src = appendAutoplay(iframe.src, true);
              }
            }
          }

          function toggleVideo() {
            const video = videoContainer.querySelector('video');
            if (video) {
              video.paused ? video.play() : video.pause();
            } else {
              const iframe = videoContainer.querySelector('iframe');
              if (iframe) {
                const isPlaying = iframe.src.includes('autoplay=1');
                iframe.src = appendAutoplay(iframe.src, !isPlaying);
              }
            }
          }

          function appendAutoplay(src, autoplay) {
            const url = new URL(src);
            url.searchParams.set('autoplay', autoplay ? '1' : '0');
            return url.toString();
          }
        },
      );
    },
  };
})(Drupal, jQuery, once);
