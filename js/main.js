$(document).ready(function () {

    function isWeChat() {
        return /MicroMessenger/i.test(navigator.userAgent);
    }

    $('.card .appstore-button').on('click', function (event) {
        const href = $(this).attr('href');

        if (!href) return;

        const isStoreLink = href.includes('apps.apple.com') || href.includes('play.google.com');

        if (isStoreLink) {
            if (isWeChat()) {
                // 微信内打开，不允许跳转，弹提示即可
                event.preventDefault();
                event.stopPropagation();
                alert('检测到您正在使用微信内置浏览器，请点击右上角菜单，选择“在浏览器中打开”或“在Safari中打开”来访问应用商店。');
                return false;
            } else {
                // 非微信浏览器，正常跳转
                event.preventDefault(); // 不走 a 标签默认行为
                event.stopPropagation();
                window.location.href = href; // 强制跳转，App Store/Google Play 可正常打开
            }
        }
    });

    //（以下为你的原有翻译、多语言逻辑，不变）
    let translations = {};
    let currentLang = '';
    const defaultLang = 'en';

    function loadTranslations(lang) {
        fetch(`lang/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load translations for ${lang}`);
                }
                return response.json();
            })
            .then(data => {
                translations = data;
                currentLang = lang;
                applyTranslations();
                updateLanguageSwitcherUI(lang);
                localStorage.setItem('lang', lang);
            })
            .catch(error => {
                console.error("Error loading translations:", error);
                if (lang !== defaultLang) {
                    loadTranslations(defaultLang);
                }
            });
    }

    function applyTranslations() {
        $('[data-i18n]').each(function () {
            const key = $(this).attr('data-i18n');
            if (translations[key]) {
                if ($(this).is('input') || $(this).is('textarea')) {
                    $(this).attr('placeholder', translations[key]);
                } else if ($(this).is('img')) {
                    $(this).attr('alt', translations[key]);
                } else if ($(this).is('title')) {
                    document.title = translations[key];
                } else if ($(this).is('meta')) {
                    $(this).attr('content', translations[key]);
                } else {
                    $(this).html(translations[key]);
                }
            }
        });
    }

    function updateLanguageSwitcherUI(activeLang) {
        $('.language-switcher .dropdown-item').removeClass('active');
        $(`.language-switcher .dropdown-item[data-lang="${activeLang}"]`).addClass('active');
        const activeLangText = $(`.language-switcher .dropdown-item[data-lang="${activeLang}"]`).text();
        $('#languageDropdown').text(activeLangText);
    }

    function detectUserLanguage() {
        const storedLang = localStorage.getItem('lang');
        if (storedLang) return storedLang;

        const userLang = navigator.language || navigator.userLanguage;

        if (userLang.startsWith('zh')) return 'zh-CN';
        if (userLang.startsWith('en')) return 'en';

        return defaultLang;
    }

    loadTranslations(detectUserLanguage());

    $('.language-switcher .dropdown-item').on('click', function (e) {
        e.preventDefault();
        const selectedLang = $(this).data('lang');
        loadTranslations(selectedLang);
    });

});
