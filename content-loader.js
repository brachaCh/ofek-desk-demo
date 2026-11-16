/* Load site content from content.json and inject into elements with data-content="section.key" */
(function () {
    var S = function () { return window.ContentSanitize || {}; };

    function showContentErrorBanner(message) {
        var el = document.getElementById('contentLoadError');
        if (!el) return;
        var p = el.querySelector('p');
        if (p && message) p.textContent = message;
        el.hidden = false;
    }

    function reportContentError(err, context) {
        console.error('[אופק דסק]', context, err);
        showContentErrorBanner('לא ניתן לטעון את תוכן האתר. נסו לרענן את הדף.');
    }

    function createStepNumberSvg(stepNum) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'step-number-svg');
        svg.setAttribute('viewBox', '0 0 200 200');

        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'step-circle');
        circle.setAttribute('cx', '100');
        circle.setAttribute('cy', '100');
        circle.setAttribute('r', '90');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#EDE7DE');
        circle.setAttribute('stroke-width', '6');

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('class', 'step-number-text');
        text.setAttribute('x', '100');
        text.setAttribute('y', '118');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '54');
        text.setAttribute('fill', '#D9D2C7');
        text.setAttribute('font-weight', '700');
        text.textContent = stepNum;

        svg.appendChild(circle);
        svg.appendChild(text);
        return svg;
    }

    function getByPath(obj, path) {
        const parts = path.split('.');
        let v = obj;
        for (const p of parts) {
            if (v == null) return undefined;
            v = v[p];
        }
        return v;
    }

    function applyContent(data) {
        document.title = data.meta && data.meta.title || document.title;
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && data.meta && data.meta.description)
            metaDesc.setAttribute('content', data.meta.description);

        document.querySelectorAll('[data-content]').forEach(function (el) {
            var key = el.getAttribute('data-content');
            var val = getByPath(data, key);
            if (val == null) return;
            val = String(val).replace(/\\n/g, '\n');

            var attrName = el.getAttribute('data-content-attr');
            if (attrName) {
                el.setAttribute(attrName, val);
                return;
            }

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = val;
            } else if (val.indexOf('\n') !== -1) {
                if (S().setMultilineText) {
                    S().setMultilineText(el, val);
                } else {
                    el.textContent = val;
                }
            } else {
                el.textContent = val;
            }
        });

        document.querySelectorAll('[data-content-attr-alt]').forEach(function (el) {
            var altKey = el.getAttribute('data-content-attr-alt');
            var altVal = getByPath(data, altKey);
            if (altVal != null) el.setAttribute('alt', String(altVal));
        });

        document.querySelectorAll('[data-content-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-content-placeholder');
            var val = getByPath(data, key);
            if (val != null) el.setAttribute('placeholder', String(val));
        });

        var videoUrl = data.demo && data.demo.videoUrl;
        if (videoUrl && String(videoUrl).trim() !== '') {
            var safeVideo = S().sanitizeEmbedUrl
                ? S().sanitizeEmbedUrl(String(videoUrl).trim())
                : String(videoUrl).trim();
            if (safeVideo) {
                var wrap = document.getElementById('system-demo-video-wrap');
                var placeholder = document.querySelector('.system-demo-video-placeholder');
                if (wrap) wrap.hidden = false;
                if (placeholder) placeholder.setAttribute('data-video-url', safeVideo);
            }
        }

        renderSolutionsLibrary(data);
        renderBusinessNeeds(data);
        renderHeroTitle(data);
        renderPuzzle(data);
        renderVision(data);
        renderQuestions(data);
        renderSolutionList(data);
        renderImagine(data);
        renderSmartClosing(data);
        renderBeforeAfter(data);
        renderProcessDemos(data);
        renderFloatingCta(data);
        renderImpact(data);
        renderFaq(data);

        var processTag = document.querySelector('[data-content="process.tag"]');
        if (processTag) {
            var tagVal = data.process && String(data.process.tag || '').trim();
            processTag.hidden = !tagVal;
        }

        var heroSub = document.querySelector('.hero-subtitle[data-content="hero.subtitle"]');
        if (heroSub) {
            var subVal = data.hero && String(data.hero.subtitle || '').trim();
            heroSub.hidden = !subVal;
        }

        var needsTag = document.querySelector('[data-content="businessNeeds.tag"]');
        if (needsTag) {
            var needsTagVal = data.businessNeeds && String(data.businessNeeds.tag || '').trim();
            needsTag.hidden = !needsTagVal;
        }

        var contactTag = document.querySelector('[data-content="contact.tag"]');
        if (contactTag) {
            var contactTagVal = data.contact && String(data.contact.tag || '').trim();
            contactTag.hidden = !contactTagVal;
        }

        var baTag = document.querySelector('[data-content="beforeAfter.tag"]');
        if (baTag) {
            var baTagVal = data.beforeAfter && String(data.beforeAfter.tag || '').trim();
            baTag.hidden = !baTagVal;
        }

        var demoTag = document.querySelector('[data-content="demo.tag"]');
        if (demoTag) {
            var demoTagVal = data.demo && String(data.demo.tag || '').trim();
            demoTag.hidden = !demoTagVal;
        }

        var studioLink = document.querySelector('[data-studio-link]');
        if (studioLink) studioLink.remove();

        document.dispatchEvent(new CustomEvent('contentLoaded', { detail: data }));
        document.dispatchEvent(new CustomEvent('processCarouselReady'));
    }

    function renderHeroTitle(data) {
        var hero = data && data.hero;
        var el = document.getElementById('heroTitle');
        if (!el || !hero) return;

        var line1 = String(hero.titleLine1 || '').trim();
        var line2 = String(hero.titleHighlight || '').trim();
        el.innerHTML = '';

        function addWords(text, glow) {
            text.split(/\s+/).filter(Boolean).forEach(function (word) {
                var wrap = document.createElement('span');
                wrap.className = 'word-wrap';
                var inner = document.createElement('span');
                inner.className = 'word' + (glow ? ' glow-word' : '');
                inner.textContent = word;
                wrap.appendChild(inner);
                el.appendChild(wrap);
                el.appendChild(document.createTextNode(' '));
            });
        }

        addWords(line1, false);
        if (line2) {
            el.appendChild(document.createElement('br'));
            addWords(line2, true);
        }
    }

    function renderPuzzle(data) {
        var puzzle = data && data.puzzle;
        var list = document.getElementById('puzzleBullets');
        if (!list || !puzzle) return;

        var bullets = Array.isArray(puzzle.bullets) ? puzzle.bullets : [];
        list.innerHTML = '';
        bullets.forEach(function (text) {
            var li = document.createElement('li');
            li.textContent = String(text);
            list.appendChild(li);
        });
    }

    function renderVision(data) {
        var vision = data && data.vision;
        var list = document.getElementById('visionTraits');
        if (!list || !vision) return;

        var traits = Array.isArray(vision.traits) ? vision.traits : [];
        list.innerHTML = '';
        traits.forEach(function (text) {
            var li = document.createElement('li');
            li.textContent = String(text);
            list.appendChild(li);
        });
    }

    function renderQuestions(data) {
        var questions = data && data.questions;
        var list = document.getElementById('questionsList');
        if (!list || !questions) return;

        var items = Array.isArray(questions.items) ? questions.items : [];
        list.innerHTML = '';
        items.forEach(function (text) {
            var li = document.createElement('li');
            li.textContent = String(text);
            list.appendChild(li);
        });
    }

    function renderSolutionList(data) {
        var solution = data && data.solution;
        var list = document.getElementById('solutionList');
        if (!list || !solution) return;

        var items = ['item1', 'item2', 'item3', 'item4']
            .map(function (key) { return String(solution[key] || '').trim(); })
            .filter(Boolean);

        list.innerHTML = '';
        items.forEach(function (text) {
            var li = document.createElement('li');
            var check = document.createElement('span');
            check.className = 'check';
            check.textContent = '✓';
            var span = document.createElement('span');
            span.textContent = text;
            li.appendChild(check);
            li.appendChild(span);
            list.appendChild(li);
        });
    }

    function renderImagine(data) {
        var imagine = data && data.imagine;
        var list = document.getElementById('imagineList');
        if (!list || !imagine) return;

        var items = Array.isArray(imagine.items) ? imagine.items : [];
        list.innerHTML = '';
        items.forEach(function (text) {
            var li = document.createElement('li');
            var check = document.createElement('span');
            check.className = 'imagine-check';
            check.textContent = '✓';
            var span = document.createElement('span');
            span.textContent = String(text);
            li.appendChild(check);
            li.appendChild(span);
            list.appendChild(li);
        });
    }

    function renderSmartClosing(data) {
        var closing = data && data.smartClosing;
        var wrap = document.getElementById('smartClosingLines');
        if (!wrap || !closing) return;

        var lines = Array.isArray(closing.lines) ? closing.lines : [];
        wrap.innerHTML = '';
        lines.forEach(function (text) {
            var p = document.createElement('p');
            p.className = 'smart-closing-line';
            p.textContent = String(text);
            wrap.appendChild(p);
        });
    }

    function renderProcessDemos(data) {
        var process = data && data.process;
        var track = document.getElementById('processCarouselTrack');
        if (!track || !process) return;

        var demos = Array.isArray(process.items) ? process.items
            : (Array.isArray(process.demos) ? process.demos : []);
        var defaultImages = ['public/scene-desk.svg', 'public/scene-hub.svg', 'public/scene-order.svg'];
        track.innerHTML = '';

        demos.forEach(function (item, index) {
            if (!item || !item.text) return;

            var stepNum = String(index + 1).padStart(2, '0');
            var image = String(item.image || defaultImages[index % defaultImages.length] || 'public/scene-desk.svg');
            var reverse = index % 2 === 1;

            var article = document.createElement('article');
            article.className = 'process-slide';
            article.setAttribute('data-step', String(index + 1));

            var grid = document.createElement('div');
            grid.className = 'process-slide-grid' + (reverse ? ' reverse' : '');

            var content = document.createElement('div');
            content.className = 'process-slide-content';

            var numWrap = document.createElement('div');
            numWrap.className = 'step-number-wrapper';
            numWrap.setAttribute('aria-hidden', 'true');
            numWrap.appendChild(createStepNumberSvg(stepNum));

            var desc = document.createElement('p');
            desc.className = 'step-description';
            desc.textContent = String(item.text);

            var link = document.createElement('a');
            link.className = 'btn btn-primary process-demo-btn';
            link.href = S().sanitizeUrl
                ? S().sanitizeUrl(item.url, { allowRelative: true, allowHash: true, fallback: 'demos.html' })
                : 'demos.html';
            link.textContent = '(' + String(item.linkLabel || 'הדגמה') + ')';

            content.appendChild(numWrap);
            content.appendChild(desc);
            content.appendChild(link);

            var imageCol = document.createElement('div');
            imageCol.className = 'process-slide-image';

            var drawingContainer = document.createElement('div');
            drawingContainer.className = 'drawing-container';

            var img = document.createElement('img');
            img.className = 'step-drawing';
            var safeImage = S().sanitizeAssetUrl
                ? S().sanitizeAssetUrl(image)
                : '';
            img.src = safeImage || defaultImages[index % defaultImages.length] || defaultImages[0];
            img.alt = String(item.text);

            var strokes = document.createElement('div');
            strokes.className = 'pencil-strokes';
            strokes.setAttribute('aria-hidden', 'true');
            ['stroke-1', 'stroke-2', 'stroke-3'].forEach(function (cls) {
                var stroke = document.createElement('span');
                stroke.className = 'stroke ' + cls;
                strokes.appendChild(stroke);
            });

            drawingContainer.appendChild(img);
            drawingContainer.appendChild(strokes);
            imageCol.appendChild(drawingContainer);

            grid.appendChild(content);
            grid.appendChild(imageCol);
            article.appendChild(grid);
            track.appendChild(article);
        });
    }

    function renderFloatingCta(data) {
        var cta = data && data.floatingCta;
        if (!cta) return;

        var bullets = document.getElementById('floatingCtaBullets');
        if (bullets) {
            var items = Array.isArray(cta.bullets) ? cta.bullets : [];
            bullets.innerHTML = '';
            items.forEach(function (text) {
                var li = document.createElement('li');
                li.textContent = String(text);
                bullets.appendChild(li);
            });
        }

        var action = document.getElementById('floatingCtaAction');
        if (action) {
            action.textContent = String(cta.btn || action.textContent);
            action.setAttribute('href', S().sanitizeUrl
                ? S().sanitizeUrl(cta.btnUrl, { allowRelative: true, allowHash: true, fallback: '#business-needs' })
                : String(cta.btnUrl || '#business-needs'));
        }
    }

    function renderBeforeAfter(data) {
        var ba = data && data.beforeAfter;
        if (!ba) return;

        function fillList(id, items, iconClass, iconChar) {
            var list = document.getElementById(id);
            if (!list) return;
            list.innerHTML = '';
            (Array.isArray(items) ? items : []).forEach(function (text) {
                var li = document.createElement('li');
                var icon = document.createElement('span');
                icon.className = iconClass;
                icon.textContent = iconChar;
                li.appendChild(icon);
                li.appendChild(document.createTextNode(' ' + String(text)));
                list.appendChild(li);
            });
        }

        fillList('baBeforeList', ba.beforeItems, 'ba-x', '\u2717');
        fillList('baAfterList', ba.afterItems, 'ba-check', '\u2713');
    }

    function renderImpact(data) {
        var impact = data && data.impact;
        var grid = document.getElementById('impactGrid');
        if (!grid || !impact) return;

        var items = Array.isArray(impact.items) ? impact.items : [];
        grid.innerHTML = '';

        items.forEach(function (item) {
            if (!item) return;
            var div = document.createElement('div');
            div.className = 'impact-item';

            var num = document.createElement('span');
            num.className = 'impact-number';
            num.setAttribute('data-target', String(item.target != null ? item.target : 0));
            num.setAttribute('data-suffix', String(item.suffix != null ? item.suffix : ''));
            num.textContent = '0';

            var label = document.createElement('span');
            label.className = 'impact-label';
            label.textContent = String(item.label || '');

            div.appendChild(num);
            div.appendChild(label);
            grid.appendChild(div);
        });
    }

    function renderFaq(data) {
        var faq = data && data.faq;
        var list = document.getElementById('faqList');
        if (!list || !faq) return;

        var items = Array.isArray(faq.items) ? faq.items : [];
        list.innerHTML = '';

        items.forEach(function (item) {
            if (!item || !item.question) return;

            var faqItem = document.createElement('div');
            faqItem.className = 'faq-item';

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'faq-question';
            var qSpan = document.createElement('span');
            qSpan.textContent = String(item.question);
            var icon = document.createElement('span');
            icon.className = 'faq-icon';
            icon.textContent = '+';
            btn.appendChild(qSpan);
            btn.appendChild(icon);

            var answer = document.createElement('div');
            answer.className = 'faq-answer';
            var p = document.createElement('p');
            p.textContent = String(item.answer || '');
            answer.appendChild(p);

            faqItem.appendChild(btn);
            faqItem.appendChild(answer);
            list.appendChild(faqItem);
        });
    }

    function createIconSvg(iconKey) {
        var stroke = 'currentColor';
        var common = 'fill="none" stroke="' + stroke + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

        var icons = {
            crm: '<svg viewBox="0 0 24 24" ' + common + '><path d="M20 21V8a2 2 0 0 0-2-2h-5"/><path d="M4 21V6a2 2 0 0 1 2-2h7"/><path d="M8 10h8"/><path d="M8 14h8"/><path d="M8 18h6"/></svg>',
            tasks: '<svg viewBox="0 0 24 24" ' + common + '><path d="M9 11l2 2 4-4"/><path d="M9 17l2 2 4-4"/><path d="M3 7h6"/><path d="M3 13h6"/><path d="M3 19h6"/></svg>',
            automation: '<svg viewBox="0 0 24 24" ' + common + '><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><path d="M12 8a4 4 0 1 0 4 4"/></svg>',
            campaign: '<svg viewBox="0 0 24 24" ' + common + '><path d="M3 11v2"/><path d="M7 9v6"/><path d="M11 7v10"/><path d="M15 9v6"/><path d="M19 11v2"/><path d="M4 21h16"/></svg>',
            reports: '<svg viewBox="0 0 24 24" ' + common + '><path d="M4 19V5a2 2 0 0 1 2-2h10l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M14 3v5h5"/><path d="M8 13h8"/><path d="M8 17h6"/></svg>',
            forms: '<svg viewBox="0 0 24 24" ' + common + '><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>',
            projects: '<svg viewBox="0 0 24 24" ' + common + '><path d="M3 7h18"/><path d="M3 12h18"/><path d="M3 17h18"/><path d="M7 3v18"/></svg>',
            calendar: '<svg viewBox="0 0 24 24" ' + common + '><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M7 14h4"/><path d="M7 18h4"/></svg>',
            support: '<svg viewBox="0 0 24 24" ' + common + '><path d="M4 11a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-1"/><path d="M4 16a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z"/><path d="M20 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z"/></svg>',
            pipeline: '<svg viewBox="0 0 24 24" ' + common + '><path d="M4 7h6v6H4Z"/><path d="M14 7h6v6h-6Z"/><path d="M9 10h6"/><path d="M10 17h10"/><path d="M4 17h2"/></svg>',
            templates: '<svg viewBox="0 0 24 24" ' + common + '><path d="M8 6h13"/><path d="M8 10h13"/><path d="M8 14h13"/><path d="M8 18h8"/><path d="M3 5h2v14H3Z"/></svg>',
            custom: '<svg viewBox="0 0 24 24" ' + common + '><path d="M12 2l2.2 6.1L21 9l-5 4 1.4 7L12 17l-5.4 3 1.4-7-5-4 6.8-.9Z"/></svg>'
        };

        var key = String(iconKey || 'custom');
        if (!Object.prototype.hasOwnProperty.call(icons, key)) key = 'custom';
        return icons[key];
    }

    function renderBusinessNeeds(data) {
        var needs = data && data.businessNeeds;
        var checklist = document.getElementById('needsChecklist');
        if (!checklist || !needs) {
            applyNeedsConfig(needs);
            return;
        }

        var items = Array.isArray(needs.items) ? needs.items : [];
        var previewCount = Number(needs.previewCount) > 0 ? Number(needs.previewCount) : 4;
        checklist.innerHTML = '';
        checklist.classList.remove('needs-checklist--expanded');

        var customList = document.getElementById('needsCustomList');
        if (customList) customList.innerHTML = '';

        items.forEach(function (item, index) {
            if (!item || !item.id) return;

            var label = document.createElement('label');
            label.className = 'needs-check-item';
            if (index >= previewCount) {
                label.classList.add('needs-check-item--extra');
            }

            var input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'needs[]';
            input.value = String(item.id);
            input.id = 'need-' + String(item.id);

            var span = document.createElement('span');
            span.className = 'needs-check-label';
            span.textContent = String(item.label || item.id);

            label.appendChild(input);
            label.appendChild(span);
            checklist.appendChild(label);
        });

        applyNeedsConfig(needs);
        resetNeedsFormCollapsed();
    }

    function applyNeedsConfig(needs) {
        if (!window.DemoNeeds) return;
        var safe = needs || {};
        var itemsMap = {};
        if (Array.isArray(safe.items)) {
            safe.items.forEach(function (it) {
                if (it && it.id) itemsMap[String(it.id)] = String(it.label || it.id);
            });
        }

        var businessTypeLabels = {
            exempt: String(safe.businessTypeExempt || 'עוסק פטור'),
            licensed: String(safe.businessTypeLicensed || 'עסק מורשה'),
            company: String(safe.businessTypeCompany || 'חברה בע"מ'),
            nonprofit: String(safe.businessTypeNonprofit || 'עמותה'),
            other: String(safe.businessTypeOther || 'אחר')
        };

        window.DemoNeeds.submitBtnText = String(safe.submitBtn || 'שלחו את הרשימה');
        window.DemoNeeds.submittingBtnText = String(safe.submittingBtn || 'מכינים תצוגה...');
        window.DemoNeeds.errorMessage = String(safe.errorMessage || 'הייתה תקלה ביצירת האפיון. נסו שוב.');
        window.DemoNeeds.rateLimitMessage = String(safe.rateLimitMessage || 'שלחתם יותר מדי בקשות. נסו שוב מאוחר יותר.');
        window.DemoNeeds.successTitle = String(safe.successTitle || 'תודה! הבקשה התקבלה.');
        window.DemoNeeds.successBody = String(safe.successBody || 'האפיון לדוגמה נשאר על המסך. שום דבר לא נשלח.');
        window.DemoNeeds.itemsLabelMap = itemsMap;
        window.DemoNeeds.businessTypeLabels = businessTypeLabels;
    }

    function resetNeedsFormCollapsed() {
        var checklist = document.getElementById('needsChecklist');
        var expandBtn = document.getElementById('needsExpandBtn');
        var extended = document.getElementById('needsFormExtended');
        var customWrap = document.getElementById('needsCustomWrap');
        var customInput = document.getElementById('needsCustomInput');

        if (checklist) checklist.classList.remove('needs-checklist--expanded');
        if (expandBtn) expandBtn.hidden = false;
        if (extended) extended.hidden = true;
        if (customWrap) customWrap.hidden = true;
        if (customInput) customInput.value = '';

        var otherWrap = document.getElementById('needsBusinessTypeOtherWrap');
        var otherInput = document.getElementById('needs-business-type-other');
        if (otherWrap) otherWrap.hidden = true;
        if (otherInput) {
            otherInput.required = false;
            otherInput.value = '';
        }
    }

    window.DemoNeeds = {
        resetCollapsed: resetNeedsFormCollapsed
    };

    function renderSolutionsLibrary(data) {
        var lib = data && data.solutionsLibrary;
        var controls = document.getElementById('solutionsLibraryControls');
        var grid = document.getElementById('solutionsLibraryGrid');
        if (!controls || !grid || !lib) return;

        var categories = Array.isArray(lib.categories) ? lib.categories : [];
        var items = Array.isArray(lib.items) ? lib.items : [];

        // Render category buttons
        controls.innerHTML = '';
        categories.forEach(function (cat, idx) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'solutions-pill' + (idx === 0 ? ' active' : '');
            btn.setAttribute('data-category', String(cat));
            btn.textContent = String(cat);
            controls.appendChild(btn);
        });

        // Render items
        grid.innerHTML = '';
        items.forEach(function (it) {
            var card = document.createElement('article');
            card.className = 'solutions-card';
            card.setAttribute('data-category', String(it.category || ''));

            var icon = document.createElement('div');
            icon.className = 'solutions-icon';
            icon.innerHTML = createIconSvg(String(it.iconKey || 'custom'));

            var title = document.createElement('h3');
            title.className = 'solutions-title';
            title.textContent = String(it.title || '');

            var text = document.createElement('p');
            text.className = 'solutions-text';
            text.textContent = String(it.text || '');

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(text);
            grid.appendChild(card);
        });
    }

    function loadFromFile() {
        return fetch('content.json?_=' + Date.now())
            .then(function (res) { return res.ok ? res.json() : Promise.reject(new Error('file')); });
    }

    function loadContent() {
        return loadFromFile();
    }

    function loadAndApply() {
        return loadContent()
            .then(applyContent)
            .catch(function (err) {
                reportContentError(err, 'Failed to load content');
            });
    }

    window.DemoContent = {
        apply: applyContent,
        loadAndApply: loadAndApply
    };

    loadAndApply();
})();
