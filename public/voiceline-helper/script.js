// public/voiceline-helper/script.js
document.addEventListener('DOMContentLoaded', () => {
    /* global WaveSurfer */
    const elements = {
        audioFile: document.getElementById('audioFile'),
        quoteText: document.getElementById('quoteText'),
        playBtn: document.getElementById('playBtn'),
        autoplayBtn: document.getElementById('autoplayBtn'),
        setTimeBtn: document.getElementById('setTimeBtn'),
        resetTimingsBtn: document.getElementById('resetTimingsBtn'),
        resetAllBtn: document.getElementById('resetAllBtn'),
        copyBtn: document.getElementById('copyBtn'),
        previewBtn: document.getElementById('previewBtn'),
        formatToggleBtn: document.getElementById('formatToggleBtn'),
        shortcutsPanel: document.getElementById('shortcuts-panel'),
        shortcutsToggle: document.getElementById('shortcuts-toggle'),
        waveform: document.getElementById('waveform'),
        wordsDisplay: document.getElementById('words-display'),
        output: document.getElementById('output'),
        status: document.getElementById('status'),
        timeDisplay: document.getElementById('time-display'),
        previewQuote: document.getElementById('glowing-quote-preview'),
    };

    let waveSurfer;
    let words = [];
    let timings = [];
    let selectedIndex = -1;
    let isAutoplay = false;
    let isJsonMinified = false;

    function initialize() {
        waveSurfer = WaveSurfer.create({
            container: elements.waveform,
            waveColor: '#f1c40f',
            progressColor: '#f1c40f',
            cursorColor: '#e74c3c',
            barWidth: 3,
            barRadius: 3,
            height: 128,
            responsive: true,
            interact: true,
        });

        waveSurfer.on('ready', () => {
            updateUIState();
            updateTimeDisplay();
            elements.status.textContent = 'Audio ready. Paste quote to enable timing.';
        });
        waveSurfer.on('audioprocess', updateTimeDisplay);
        waveSurfer.on('seek', updateTimeDisplay);
        waveSurfer.on('play', updateUIState);
        waveSurfer.on('pause', updateUIState);
        waveSurfer.on('finish', () => {
            elements.status.textContent = 'Finished!';
            if (isAutoplay) {
                waveSurfer.play();
            }
        });

        // Sidebar logic
        const isCollapsed = localStorage.getItem('shortcutsCollapsed') === 'true';
        if (isCollapsed) {
            elements.shortcutsPanel.classList.add('collapsed');
        }
    }

    function updateTimeDisplay() {
        if (!waveSurfer) return;
        const currentTime = waveSurfer.getCurrentTime().toFixed(2);
        const totalDuration = waveSurfer.getDuration().toFixed(2);
        elements.timeDisplay.textContent = `${currentTime}s / ${totalDuration}s`;
    }

    function resetAll() {
        elements.quoteText.value = '';
        elements.audioFile.value = '';
        if (waveSurfer) waveSurfer.empty();
        resetTimings();
        elements.timeDisplay.textContent = '0.00s / 0.00s';
        updateUIState();
    }

    function resetTimings() {
        timings = [];
        selectedIndex = -1;
        words = (elements.quoteText.value || '').replace(/[^a-zA-Z\s']/g, "").split(' ').filter(w => w);
        elements.output.value = '';
        if (words.length > 0) {
            selectWord(0);
        } else {
            renderWords();
        }
        updateUIState();
        elements.previewQuote.innerHTML = '';
    }

    function selectWord(index) {
        selectedIndex = index;
        renderWords();
        updateUIState();
    }

    function renderWords() {
        elements.wordsDisplay.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.classList.add('word-span');
            span.classList.toggle('untimed', timings[index] === undefined);
            span.classList.toggle('timed', timings[index] !== undefined);
            span.classList.toggle('selected', index === selectedIndex);
            span.onclick = () => selectWord(index);
            elements.wordsDisplay.appendChild(span);
        });
    }

    function updateUIState() {
        const isAudioLoaded = waveSurfer && waveSurfer.getDuration() > 0;
        const isQuoteReady = words.length > 0;
        const isPlaying = waveSurfer && waveSurfer.isPlaying();
        const isTimingComplete = isQuoteReady && timings.length === words.length && timings.every(t => t !== undefined);

        elements.playBtn.disabled = !isAudioLoaded;
        elements.autoplayBtn.disabled = !isAudioLoaded;
        elements.setTimeBtn.disabled = !isAudioLoaded || !isQuoteReady || selectedIndex === -1;
        elements.resetTimingsBtn.disabled = timings.length === 0;
        elements.copyBtn.disabled = !isTimingComplete;
        elements.previewBtn.disabled = !isTimingComplete;
        elements.formatToggleBtn.disabled = !isTimingComplete;

        elements.status.classList.remove('error');
        if (!isAudioLoaded) {
            elements.status.innerHTML = 'Load an audio file to begin.';
        } else if (!isQuoteReady) {
            elements.status.innerHTML = 'Audio loaded. Paste the full quote to start timing.';
        } else if (selectedIndex === -1) {
            elements.status.innerHTML = 'Click a word to begin timing.';
        } else {
            elements.status.innerHTML = `Selected word: <strong>${words[selectedIndex]}</strong>. Scrub audio and set time.`;
        }
    }

    function setTimeForSelectedWord() {
        if (selectedIndex === -1 || !waveSurfer) return;

        timings[selectedIndex] = waveSurfer.getCurrentTime();

        let nextIndex = -1;
        for (let i = selectedIndex + 1; i < words.length; i++) {
            if (timings[i] === undefined) {
                nextIndex = i;
                break;
            }
        }
        if (nextIndex === -1) {
            for (let i = 0; i < selectedIndex; i++) {
                if (timings[i] === undefined) {
                    nextIndex = i;
                    break;
                }
            }
        }

        selectWord(nextIndex);
        generateOutput();
    }

    function generateOutput() {
        if (timings.some(t => t === undefined)) {
            elements.output.value = 'Timing is not yet complete...';
            updateUIState();
            return;
        }

        const sortedTimings = [...timings].sort((a, b) => a - b);
        const timedQuote = words.map((word, index) => {
            const wordEndTime = timings[index];
            const sortedIndex = sortedTimings.indexOf(wordEndTime);
            const startTime = sortedTimings[sortedIndex - 1] || 0;
            const duration = Math.round((wordEndTime - startTime) * 1000);
            return { word, duration };
        });

        const space = isJsonMinified ? 0 : 2;
        elements.output.value = JSON.stringify(timedQuote, null, space);
        updateUIState();
    }

    function handlePreview() {
        if (!waveSurfer || !elements.output.value || elements.output.value.startsWith('Timing')) return;

        const fullQuote = elements.quoteText.value;
        const timedQuoteData = JSON.parse(elements.output.value);
        let highlightedLength = 0;

        const updatePreview = () => {
            const glowingPart = fullQuote.substring(0, highlightedLength);
            const normalPart = fullQuote.substring(highlightedLength);
            elements.previewQuote.innerHTML = `"<span class="glow">${glowingPart}</span><span>${normalPart}</span>"`;
        };

        updatePreview();
        waveSurfer.play(0);

        let cumulativeDelay = 0;
        let charCount = 0;

        timedQuoteData.forEach(item => {
            setTimeout(() => {
                const nextIndex = fullQuote.indexOf(item.word, charCount);
                if (nextIndex !== -1) {
                    charCount = nextIndex + item.word.length;
                    highlightedLength = charCount;
                    updatePreview();
                }
            }, cumulativeDelay);
            cumulativeDelay += item.duration;
        });

        const onFinish = () => {
            highlightedLength = 0;
            updatePreview();
            waveSurfer.un('finish', onFinish);
        };
        waveSurfer.on('finish', onFinish);
    }

    // --- Event Listeners ---
    elements.audioFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            elements.status.innerHTML = 'Decoding waveform...';
            waveSurfer.load(URL.createObjectURL(file));
            resetTimings();
        }
    });

    elements.quoteText.addEventListener('input', resetTimings);
    elements.playBtn.addEventListener('click', () => waveSurfer.playPause());
    elements.autoplayBtn.addEventListener('click', () => {
        isAutoplay = !isAutoplay;
        elements.autoplayBtn.classList.toggle('active', isAutoplay);
        if (isAutoplay && !waveSurfer.isPlaying()) {
            waveSurfer.play();
        }
    });
    elements.setTimeBtn.addEventListener('click', setTimeForSelectedWord);
    elements.resetTimingsBtn.addEventListener('click', resetTimings);
    elements.resetAllBtn.addEventListener('click', resetAll);
    elements.previewBtn.addEventListener('click', handlePreview);
    elements.formatToggleBtn.addEventListener('click', () => {
        isJsonMinified = !isJsonMinified;
        elements.formatToggleBtn.textContent = isJsonMinified ? 'Prettify JSON' : 'Minify JSON';
        generateOutput();
    });

    elements.copyBtn.addEventListener('click', () => {
        elements.output.select();
        document.execCommand('copy');
        elements.copyBtn.textContent = 'Copied!';
        setTimeout(() => { elements.copyBtn.textContent = 'Copy to Clipboard'; }, 1500);
    });

    elements.shortcutsToggle.addEventListener('click', () => {
        const isCollapsed = elements.shortcutsPanel.classList.toggle('collapsed');
        localStorage.setItem('shortcutsCollapsed', isCollapsed);
    });

    document.addEventListener('keydown', (e) => {
        if (e.target === elements.quoteText) {
            return;
        }

        let handled = true;
        switch (e.code) {
            case 'Space':
                if (!elements.playBtn.disabled) waveSurfer.playPause();
                break;
            case 'KeyG':
                if (!elements.setTimeBtn.disabled) setTimeForSelectedWord();
                break;
            case 'KeyR':
                if (!elements.playBtn.disabled) waveSurfer.seekTo(0);
                break;
            case 'ArrowLeft':
                if (!elements.playBtn.disabled) waveSurfer.skip(-1);
                break;
            case 'ArrowRight':
                if (!elements.playBtn.disabled) waveSurfer.skip(1);
                break;
            default:
                handled = false;
                break;
        }

        if (handled) {
            e.preventDefault();
        }
    });

    initialize();
});