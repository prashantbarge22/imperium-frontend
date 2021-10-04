<template>
    <div id="app">

      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
</template>

<script>
    const fLoadLazyImages = function() {
        let lazyloadThrottleTimeout;

        function lazyload() {
            let lazyloadImages = document.querySelectorAll("img.lazy");

            if (lazyloadImages.length === 0)
            {
                return;
            }

            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                let scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length === 0) {
                    document.removeEventListener("scroll", lazyload);
                    // window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        // window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    };

    export default {
        mounted() {
            this.$nextTick(function () {
                fLoadLazyImages();
            });
        },
        updated() {
            this.$nextTick(function () {
                fLoadLazyImages();
            });
        }
    }
</script>

<style>
#app {
    overflow-x:hidden;
}
</style>