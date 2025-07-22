// public/voiceline-helper/script.js
document.addEventListener('DOMContentLoaded', () => {
    /* global WaveSurfer */
    const elements = {
        audioFile: document.getElementById('audioFile'),
        quoteText: document.getElementById('quoteText'),
        playBtn: document.getElementById('playBtn'),
        autoplayBtn: document.getElementById('autoplayBtn'),
        markBtn: document.getElementById('markBtn'),
        resetTimingsBtn: document.getElementById('resetTimingsBtn'),
        resetAllBtn: document.getElementById('resetAllBtn'),
        copyBtn: document.getElementById('copyBtn'),
        previewBtn: document.getElementById('previewBtn'),
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
    let currentIndex = 0;
    let isAutoplay = false;

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
            elements.status.textContent = 'Finished! Click a word to edit timing.';
            if (isAutoplay) {
                waveSurfer.play();
            }
        });
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
        currentIndex = 0;
        words = (elements.quoteText.value || '').replace(/[^a-zA-Z\s']/g, "").split(' ').filter(w => w);
        elements.output.value = '';
        renderWords();
        updateUIState();
        elements.previewQuote.innerHTML = '';
    }

    function renderWords() {
        elements.wordsDisplay.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            if (index < currentIndex) span.classList.add('completed');
            if (index === currentIndex) span.classList.add('current');
            elements.wordsDisplay.appendChild(span);
        });
    }

    function updateUIState() {
        const isAudioLoaded = waveSurfer && waveSurfer.getDuration() > 0;
        const isQuoteReady = words.length > 0;
        const isPlaying = waveSurfer && waveSurfer.isPlaying();
        const isTimingComplete = timings.length === words.length && isQuoteReady;

        elements.playBtn.disabled = !isAudioLoaded;
        elements.autoplayBtn.disabled = !isAudioLoaded;
        elements.markBtn.disabled = !isAudioLoaded || !isQuoteReady;
        elements.resetTimingsBtn.disabled = timings.length === 0;
        elements.copyBtn.disabled = !isTimingComplete;
        elements.previewBtn.disabled = !isTimingComplete;

        elements.status.classList.remove('error');
        if (!isAudioLoaded) {
            elements.status.innerHTML = 'Load an audio file to begin.';
        } else if (!isQuoteReady) {
            elements.status.innerHTML = 'Audio loaded. Paste the full quote to enable timing.';
        } else if (!isPlaying) {
            elements.status.innerHTML = 'Ready to time. Press Play, then use the (G) key or button.';
        } else {
            elements.status.innerHTML = `Timing word ${currentIndex + 1} of ${words.length}...`;
        }
    }

    function markWord() {
        if (!waveSurfer.isPlaying() || currentIndex >= words.length || words.length === 0) return;

        timings.push(waveSurfer.getCurrentTime());
        currentIndex++;
        renderWords();

        if (currentIndex >= words.length) {
            waveSurfer.pause();
            generateOutput();
            makeWordsEditable();
        }
        updateUIState();
    }

    function generateOutput() {
        const timedQuote = words.map((word, index) => {
            const startTime = timings[index - 1] || 0;
            const endTime = timings[index];
            const duration = Math.round((endTime - startTime) * 1000);
            return { word, duration };
        });
        elements.output.value = JSON.stringify(timedQuote, null, 2);
        updateUIState();
    }

    function makeWordsEditable() {
        Array.from(elements.wordsDisplay.children).forEach((span, index) => {
            span.classList.add('editable');
            span.onclick = () => editTiming(index);
        });
    }

    function editTiming(index) {
        const originalTime = timings[index].toFixed(3);
        const newTimeStr = prompt(`Editing timing for word "${words[index]}".\nEnter the new END time in seconds (current: ${originalTime}s).`, originalTime);

        if (newTimeStr !== null) {
            const newTime = parseFloat(newTimeStr);
            if (!isNaN(newTime) && newTime > (timings[index - 1] || 0)) {
                timings[index] = newTime;
                timings.sort((a, b) => a - b);
                generateOutput();
                alert('Timings updated!');
            } else {
                alert('Invalid time. Must be a number greater than the previous word\'s time.');
            }
        }
    }

    function handlePreview() {
        if (!waveSurfer || timings.length !== words.length) return;

        const fullQuote = elements.quoteText.value;
        const timedQuoteData = JSON.parse(elements.output.value);
        let highlightedLength = 0;

        const updatePreview = () => {
            const glowingPart = fullQuote.substring(0, highlightedLength);
            const normalPart = fullQuote.substring(highlightedLength);
            elements.previewQuote.innerHTML = `"<span class="glow">${glowingPart}</span><span>${normalPart}</span>"`;
        };

        updatePreview(); // Set initial state
        waveSurfer.play(0); // Play from start

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

        // Reset at the end
        waveSurfer.on('finish', () => {
            highlightedLength = 0;
            updatePreview();
            waveSurfer.un('finish'); // remove this specific listener
        });
    }

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
    elements.markBtn.addEventListener('click', markWord);
    elements.resetTimingsBtn.addEventListener('click', resetTimings);
    elements.resetAllBtn.addEventListener('click', resetAll);
    elements.previewBtn.addEventListener('click', handlePreview);

    elements.copyBtn.addEventListener('click', () => {
        elements.output.select();
        document.execCommand('copy');
        elements.copyBtn.textContent = 'Copied!';
        setTimeout(() => { elements.copyBtn.textContent = 'Copy to Clipboard'; }, 1500);
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyG' && !elements.markBtn.disabled) {
            e.preventDefault();
            markWord();
        }
    });

    initialize();
});