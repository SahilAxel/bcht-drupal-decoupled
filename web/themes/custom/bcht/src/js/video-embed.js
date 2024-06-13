(function (Drupal, $, once) {
  Drupal.behaviors.global = {
    attach: function (context) {
      once('video-embed', '.video-embed__wrapper', context).forEach(
        (element) => {
          const overlay = element.querySelector('.video-player__overlay');
          const videoContainer = element.querySelector('.video-player__video');

          if (overlay && videoContainer) {
            overlay.addEventListener('click', () => {
              overlay.style.display = 'none';

              const video = videoContainer.querySelector('video');
              if (video) {
                video.play();
              } else {
                const iframe = videoContainer.querySelector('iframe');
                if (iframe) {
                  const iframeSrc = iframe.src;
                  iframe.src =
                    iframeSrc +
                    (iframeSrc.includes('?') ? '&' : '?') +
                    'autoplay=1';
                }
              }
            });

            videoContainer.addEventListener('click', () => {
              const video = videoContainer.querySelector('video');
              if (video) {
                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              } else {
                const iframe = videoContainer.querySelector('iframe');
                if (iframe) {
                  const iframeSrc = iframe.src;
                  const isPlaying = iframeSrc.includes('autoplay=1');
                  if (isPlaying) {
                    iframe.src = iframeSrc.replace('autoplay=1', 'autoplay=0');
                  } else {
                    iframe.src = iframeSrc.replace('autoplay=0', 'autoplay=1');
                  }
                }
              }
            });
          }
        },
      );
    },
  };
})(Drupal, jQuery, once);
