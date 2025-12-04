$(document).ready(function() {
    // Stop modal from triggering when clicking the App Store button on the card.
    $('.card .appstore-button').on('click', function(event) {
        event.stopPropagation();
    });

    // i18n Logic
    let translations = {};
    let currentLang = ''; // Track the current active language
    const defaultLang = 'zh-CN'; // Set a default language

    function loadTranslations(lang) {
        console.log(`Attempting to load translations for: ${lang}`); // Debug log
        // Fallback to default if language file not found or error
        fetch(`lang/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load translations for ${lang}`);
                }
                return response.json();
            })
            .then(data => {
                translations = data;
                currentLang = lang; // Update currentLang
                console.log(`Translations loaded for ${lang}:`, data); // Debug log
                applyTranslations();
                updateLanguageSwitcherUI(lang); // Update the UI
                // Store selected language in local storage
                localStorage.setItem('lang', lang);
            })
            .catch(error => {
                console.error("Error loading translations:", error);
                // Try to load default language if initial load failed for non-default
                if (lang !== defaultLang) {
                    console.log(`Falling back to default language: ${defaultLang}`);
                    loadTranslations(defaultLang);
                }
            });
    }

    function applyTranslations() {
        $('[data-i18n]').each(function() {
            const key = $(this).attr('data-i18n');
            if (translations[key]) {
                console.log(`Translating key: ${key}, value: ${translations[key]} for element:`, this); // Debug log
                if ($(this).is('input') || $(this).is('textarea')) {
                    $(this).attr('placeholder', translations[key]);
                } else if ($(this).is('img')) {
                    $(this).attr('alt', translations[key]);
                } else if ($(this).is('title')) { // Handle <title> tag separately
                    document.title = translations[key];
                } else if ($(this).is('meta')) { // Handle <meta> tags
                    $(this).attr('content', translations[key]);
                }
                else {
                    $(this).html(translations[key]);
                }
            } else {
                console.warn(`Missing translation for key: ${key}`); // Debug log for missing keys
            }
        });
    }

    function updateLanguageSwitcherUI(activeLang) {
        $('.language-switcher .dropdown-item').removeClass('active'); // Remove active from all
        $(`.language-switcher .dropdown-item[data-lang="${activeLang}"]`).addClass('active'); // Add active to the current one
        // Optional: Update the button text to show current language
        const activeLangText = $(`.language-switcher .dropdown-item[data-lang="${activeLang}"]`).text();
        $('#languageDropdown').text(activeLangText);
    }

    function detectUserLanguage() {
        const storedLang = localStorage.getItem('lang');
        if (storedLang) {
            return storedLang;
        }

        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('zh')) {
            return 'zh-CN';
        } else if (userLang.startsWith('en')) {
            return 'en';
        }
        return defaultLang; // Fallback to default
    }

    // Initialize language
    loadTranslations(detectUserLanguage());

    // Language switcher event listener
    $('.language-switcher .dropdown-item').on('click', function(e) {
        e.preventDefault();
        const selectedLang = $(this).data('lang');
        loadTranslations(selectedLang);
    });
});
