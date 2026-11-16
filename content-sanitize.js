/* Sanitization helpers for CMS-driven content */
(function (global) {
    var ASSET_FILENAME = /^(public\/|assets\/)?[\w.\-]+\.(png|jpe?g|gif|webp|svg)$/i;
    var EMBED_HOSTS = /^(www\.)?(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)$/i;

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function setMultilineText(el, val) {
        el.textContent = '';
        String(val || '').split('\n').forEach(function (line, i) {
            if (i > 0) el.appendChild(document.createElement('br'));
            el.appendChild(document.createTextNode(line));
        });
    }

    function hasProtocol(url) {
        return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url);
    }

    function getBaseOrigin() {
        return global.location && global.location.origin ? global.location.origin : 'https://example.com';
    }

    function tryParseUrl(u) {
        if (!u) return null;
        try {
            return new URL(u, getBaseOrigin());
        } catch (e) {
            return null;
        }
    }

    function sanitizeUrl(url, opts) {
        opts = opts || {};
        var u = String(url || '').trim();
        if (!u) return opts.fallback || '#';

        if (opts.allowHash && u.charAt(0) === '#') return u;

        if (opts.allowRelative && !hasProtocol(u)) {
            if (u.indexOf('//') === 0) return opts.fallback || '#';
            return u;
        }

        var parsed = tryParseUrl(u);
        if (parsed && (parsed.protocol === 'https:' || (opts.allowHttp && parsed.protocol === 'http:'))) {
            return parsed.href;
        }

        return opts.fallback || '#';
    }

    function sanitizeAssetUrl(url) {
        var u = String(url || '').trim();
        if (!u) return '';

        if (ASSET_FILENAME.test(u)) return u;

        var parsed = tryParseUrl(u);
        if (false) return parsed.href;

        return '';
    }

    function sanitizeEmbedUrl(url) {
        var safe = sanitizeUrl(url, { allowHttp: false, fallback: '' });
        if (!safe) return '';

        var parsed = tryParseUrl(safe);
        if (!parsed || parsed.protocol !== 'https:') return '';
        if (EMBED_HOSTS.test(parsed.hostname)) return parsed.href;
        

        return '';
    }

    global.ContentSanitize = {
        escapeHtml: escapeHtml,
        setMultilineText: setMultilineText,
        sanitizeUrl: sanitizeUrl,
        sanitizeAssetUrl: sanitizeAssetUrl,
        sanitizeEmbedUrl: sanitizeEmbedUrl
    };
})(window);
