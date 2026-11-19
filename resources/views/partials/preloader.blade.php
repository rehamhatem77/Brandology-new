{{-- Brandology preloader: the dotted "O" ring from the logo. Removed by resources/js/lib/site/preloader.ts. --}}
<div id="preloader" role="status" aria-label="Loading Brandology">
    <div class="mark">
        <div class="ring" id="pl-ring"></div>
        <div class="b">B</div>
        <div class="bar"></div>
    </div>
</div>
<script>
    (function () {
        var ring = document.getElementById('pl-ring'), colors = ['#f99d1b', '#fdca0f'], html = '';
        for (var i = 0; i < 24; i++) {
            var s = 4 + (i % 4) * 2.5;
            html += '<i style="--a:' + i * 15 + 'deg;--d:' + i * 0.05 + 's;width:' + s + 'px;height:' + s + 'px;margin:' + -s / 2 + 'px 0 0 ' + -s / 2 + 'px;background:' + colors[i % 2] + '"></i>';
        }
        ring.innerHTML = html;
        if (location.pathname.indexOf('/ar') === 0) {
            document.getElementById('preloader').setAttribute('aria-label', 'جارٍ التحميل');
        }
    })();
</script>
