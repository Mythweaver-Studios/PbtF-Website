document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navUl = document.querySelector('header nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            if (navUl.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'true');
                menuToggle.textContent = '✕';
            } else {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            }
        });

        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                     menuToggle.textContent = '☰';
                }
            });
        });
    }

    // Story Section Interaction
    const storyContentEl = document.getElementById('story-content');
    const storyContinueBtn = document.getElementById('story-continue-button');
    const storyImageEl = document.getElementById('story-image'); // Image element for story visuals

    // Story content - replace placeholders
    const storyData = [
        {
            text: "In a world fractured by celestial chaos, ancient portals began to awaken, spitting forth heroes and monsters from countless dimensions...",
            image: "images/placeholder_story_image.png"
        },
        {
            text: "You emerge, memory fragmented, possessing only a strange artifact humming with power - the 'Nexus Shard'. It allows you to 'Pick Up' echoes of legendary figures.",
            image: "images/placeholder_story_image_2.png"
        },
        {
            text: "But you are not alone. Sinister forces seek the Shard's power to reshape reality to their dark whims. You must gather allies, unlock forgotten legends, and fight back.",
            image: "images/placeholder_story_image_3.png"
        },
        {
            text: "Your journey begins now. Will you master the infinite gacha and save the multiverse, or will all timelines crumble into oblivion?",
            image: "images/placeholder_story_image_final.png"
        }
    ];

    let currentStoryIndex = 0;
    let isTransitioning = false; // Prevent button spam during transitions

    function displayStorySegment(index) {
        if (index < 0 || index >= storyData.length || !storyContentEl || isTransitioning) {
            return; // Exit if invalid index, element missing, or mid-transition
        }

        isTransitioning = true;
        const segment = storyData[index];

        // Fade out current content
        storyContentEl.classList.add('fade-out');
        if(storyImageEl) storyImageEl.style.opacity = 0;

        setTimeout(() => {
            // Update text and image after fade
            storyContentEl.innerHTML = `<p>${segment.text}</p>`;
            if (storyImageEl && segment.image) {
                storyImageEl.src = segment.image;
                storyImageEl.alt = `Story illustration ${index + 1}`;
            } // Add else if needed to hide image element if segment has no image

            // Fade in new content
            storyContentEl.classList.remove('fade-out');
            if(storyImageEl) storyImageEl.style.opacity = 1;

             // Update button text/state
            if (index >= storyData.length - 1) {
                storyContinueBtn.textContent = "The End";
                storyContinueBtn.disabled = true;
            } else {
                storyContinueBtn.textContent = "Continue...";
                storyContinueBtn.disabled = false;
            }

            // Re-enable button after transition + buffer
             setTimeout(() => { isTransitioning = false; }, 500);


        }, 400); // Sync with CSS opacity transition duration
    }

    // Story 'Continue' button click
    if (storyContinueBtn) {
        storyContinueBtn.addEventListener('click', () => {
            if (!isTransitioning && currentStoryIndex < storyData.length - 1) {
                currentStoryIndex++;
                displayStorySegment(currentStoryIndex);
            }
        });
    }

    // Load the first story segment on page load
    if (storyData.length > 0) {
         displayStorySegment(0);
    } else if (storyContentEl) {
        storyContentEl.innerHTML = "<p>The story is yet to be written...</p>";
        if (storyContinueBtn) storyContinueBtn.style.display = 'none'; // No story, no button
    }

    console.log("Pick Me Up website script loaded.");

}); // End of DOMContentLoaded listener
