// Store drop down and content buttons
document.addEventListener("DOMContentLoaded", () => {
  // Dropdown functionality
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownContent = document.getElementById("dropdownContent");
  const popup = document.querySelector(".popup");

  dropdownButton?.addEventListener("click", toggleDropdown);

  // Shuffle Tabs Button
  document.getElementById("shuffleTabs")?.addEventListener("click", shuffleTabs);
  
  // Madness Mode (Tab Possession)
  document.getElementById("creepyTabs")?.addEventListener("click", tabPossession);

  // Tab Quiz
  document.getElementById("tabQuiz")?.addEventListener("click", tabQuiz);

  // Reverse Controls
  document.getElementById("reverseControls")?.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "reverseControls" });
  });


  // Doppelgänger Mode
  document.getElementById("doppelgangerTab")?.addEventListener("click", doppelgangerTab);
});

function toggleDropdown() {

  const isOpen = dropdownContent.classList.contains("show");

  if (isOpen) {
    dropdownContent.classList.remove("show");

    // Delay hiding to match animation
    setTimeout(() => {
        popup.classList.remove("expanded");
    }, 500);

        setTimeout(() => {
            dropdownContent.style.visibility = "hidden";
        }, 1000)
  } else {
    dropdownContent.style.visibility = "visible"; // Ensure visibility before animation
    dropdownContent.classList.add("show");
    popup.classList.add("expanded");
    
  }
}

// Ensure elements exist before attaching event listeners



function shuffleTabs() {
    // Get all open tabs
    chrome.tabs.query({}, (tabs) => {
      if (tabs.length < 2) {
        alert("You need at least two tabs open to shuffle!");
        return;
      }
  
      // Shuffle the tabs array using Fisher-Yates algorithm
      for (let i = tabs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tabs[i], tabs[j]] = [tabs[j], tabs[i]];
      }
  
      // Reorder tabs based on shuffled order
      tabs.forEach((tab, index) => {
        chrome.tabs.move(tab.id, { index });
      });
    });
  }
  
  // Attach event listener to the Shuffle Tabs button


  function tabQuiz() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      const tab = tabs[0];
  
      const questions = [
        "What is the square root of insanity?",
        "How many ghosts live in your house?",
        "How many thoughts can you hear in an empty room?",
        "If you forget your own name, who remembers it?",
        "What color is a mirror in the dark?",
        "How many tabs must be closed before you\x27re free?",
        "Which letter of the alphabet is watching you right now?",
        "If a door is locked, is it still a way out?",
        "When will the last thought of you disappear?",
        "Who will remember you after you go missing?",
        "Who closed your last tab? It wasn\x27t you.",
        "What number comes after infinity?",
        "If a shadow stops following you, where did it go?",
        "If two mirrors face each other, where do they end?",
        "What happens if a tab closes itself?",
        "How long has this question been waiting for you?",
        "What shape does silence take?",
        "How many times have you seen this question before?",
        "What is the meaning of chaos?",
        "Solve: (\u221E + Madness)\u00B2 = ?"
      ];
  
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      const userAnswer = prompt(randomQuestion, "Answer right or else... ");
  
      if (userAnswer && userAnswer.length > 3) {
        chrome.tabs.remove(tab.id);
      }
    });
  }
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "tabQuiz") {
      tabQuiz();
    }
  });


    let reverseEnabled = false;

    function enableReverseControls() {
        if (reverseEnabled) return; // Prevent enabling multiple times
        reverseEnabled = true;
    
        // **Intercept when a user switches tabs**
        chrome.tabs.onActivated.addListener((activeInfo) => {
            if (!reverseEnabled) return; // If disabled, do nothing
    
            chrome.tabs.query({}, (tabs) => {
                if (tabs.length < 2) return;
    
                let randomTab;
                do {
                    randomTab = tabs[Math.floor(Math.random() * tabs.length)];
                } while (randomTab.id === activeInfo.tabId); // Ensure it's a different tab
    
                chrome.tabs.update(randomTab.id, { active: true }); // Switch to random tab
            });
        });
    
        // **Intercept when a user closes a tab**
        chrome.tabs.onRemoved.addListener(() => {
            if (!reverseEnabled) return; // If disabled, do nothing
    
            chrome.tabs.query({}, (tabs) => {
                if (tabs.length === 0) return;
    
                const randomTab = tabs[Math.floor(Math.random() * tabs.length)];
                chrome.tabs.update(randomTab.id, { active: true }); // Open a random tab after closing
            });
        });
    }
    
    // **Disable reverse controls**
    function disableReverseControls() {
        reverseEnabled = false;
    }
    
    // **Listen for messages from popup to enable/disable reverse mode**
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "enableReverseControls") {
            enableReverseControls();
        } else if (message.action === "disableReverseControls") {
            disableReverseControls();
        }
    });
    


function tabPossession() {
  chrome.tabs.query({}, (tabs) => {
    if (tabs.length === 0) return;

    const randomTab = tabs[Math.floor(Math.random() * tabs.length)];
    const randomSites = [
      "https://en.wikipedia.org/wiki/Special:Random",
      "https://thispersondoesnotexist.com/",
      "https://www.mapcrunch.com/",
      "https://www.nasa.gov/",
      "https://theuselessweb.com/",
      "https://gatewaytodarkness.neocities.org/",
      "https://thestillmanlight.neocities.org/",
      "https://feathersandchokers.neocities.org/"
    ];

    const newURL = randomSites[Math.floor(Math.random() * randomSites.length)];
    chrome.tabs.update(randomTab.id, { url: newURL });
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "tabPossession") {
    tabPossession();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("madnessTab").addEventListener("click", madnessTab);
});

  function madnessTab() {
      const crazyMessages = [
          "You are not alone.",
          "The tabs are watching you.",
          "Who opened this? Not you?",
          "They are coming. Close this now.",
          "The eye sees all.",
          "ERROR: Help_me! It\x27s_inside...",
          "x The gate is open x",
          "Something is wrong with your computer...",
          "Doors have opened that cannot be closed.",
          "They have seen you.",
          "He is watching from behind the screen.",
          "You are not where you think you are...",
          "They have found you.",
          "You are sinking into the fabric of madness.",
          "When will you realize you are not alone?",
          "The cycle repeats.",
          "You are watching but what is watching you?",
          "The voices are getting louder...",
          "Your tabs are talking to each other.",
          "You can\x27t close this one.",
          "Your eyes are open, aren\x27t they?",
          "It\x27s all a lie."
      ];
  
  
      const randomMessage = crazyMessages[Math.floor(Math.random() * crazyMessages.length)];
  
      const htmlContent = `
          <html>
          <head>
              <title>???</title>
              <style>
                  body {
                      background-color: black;
                      color: red;
                      font-family: 'Courier New', monospace;
                      text-align: center;
                      margin: 10%;
                      font-size: 24px;
                      animation: glitch 1s infinite;
                  }
                  @keyframes glitch {
                      0% { text-shadow: 2px 2px red; }
                      25% { text-shadow: -2px -2px blue; }
                      50% { text-shadow: 2px -2px green; }
                      75% { text-shadow: -2px 2px purple; }
                      100% { text-shadow: 2px 2px red; }
                  }
              </style>
          </head>
          <body>
              <h1>${randomMessage}</h1>
          </body>
          </html>
      `;
  
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
  
      chrome.tabs.create({ url: url }, (newTab) => {
        chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            func: () => {
                console.log("Madness Tab opened successfully!");
              }
            });
        });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const observerButton = document.getElementById("observerTab");
    
    if (observerButton) {
        observerButton.addEventListener("click", () => {
            console.log("Observer Tab button clicked!");
            startObserver();
        });
    }
});


let observerTabId = null;
const observerMessages = [
    "I see you.", "Can't escape.", "Watching...", "Still here.",
    "Y u closing me?", "Look behind you.","Let me stay.",
    "Getting closer...", "I know your thoughts.", "Don't ignore me.",
    "Open the door.", "Afraid yet?", 
    "Did you rename this? No, you didn't.",
    "ERROR: UNAUTHORIZED ACCESS", "The cycle repeats...", "Who changed your title?",
    "U r being watched.", "Stop looking at me.", 
    "You can't stop this.", "Reality is glitching..."
];

function startObserver() {
    chrome.tabs.query({}, (tabs) => {
        if (tabs.length === 0) return;

        observerTabId = tabs[Math.floor(Math.random() * tabs.length)].id;
        console.log(`Observer Tab selected: ${observerTabId}`);

        updateObserverTab();
        startTitleGlitching();
    });
}

// Update tab title every 30 seconds
function startTitleGlitching() {
    setInterval(() => {
        if (observerTabId) {
            updateObserverTab();
        }
    }, 10000);
}

// Change the tab's title
function updateObserverTab() {
    if (!observerTabId) return;
    
    const newTitle = observerMessages[Math.floor(Math.random() * observerMessages.length)];

    chrome.scripting.executeScript({
        target: { tabId: observerTabId },
        func: (title) => { document.title = title; },
        args: [newTitle]
    });
}

  
  // ** Glitch Title Every 30 Seconds **
  function startTitleGlitching() {
      setInterval(() => {
          if (observerTabId) {
              updateObserverTab();
          }
      }, 10000); // Every 30 seconds
  }
  
  // ** Prevent Closing **
  chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === observerTabId) {
        console.log("Observer Tab closed! Replacing...");
        observerTabId = null; // Reset observerTabId

        chrome.tabs.create({ url: "https://en.wikipedia.org/wiki/Special:Random" }, (newTab) => {
            observerTabId = newTab.id;
            updateObserverTab();
        });
    }
});

  
  // ** Select Observer on Startup **
  chrome.runtime.onInstalled.addListener(() => {
      selectObserverTab();
  });
  
  // ** Ensure an Observer Always Exists **
  chrome.tabs.onCreated.addListener(() => {
      if (!observerTabId) {
          selectObserverTab();
      }
  });
  
  function doppelgangerTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: scramblePage
        });
    });
}

function doppelgangerTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
              document.body.querySelectorAll("*").forEach(el => {
                  el.childNodes.forEach(node => {
                      if (node.nodeType === 3 && node.textContent.trim().length > 0) {
                          node.textContent = node.textContent.split('').map(char => {
                              return Math.random() > 0.5 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char;
                          }).join('');
                      }
                  });
              });

              document.title = document.title.split('').map(char => {
                  return Math.random() > 0.5 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char;
              }).join('');
          }
      });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const madnessModeButton = document.getElementById("madnessMode");

  if (madnessModeButton) {
      madnessModeButton.addEventListener("click", () => {
          console.log("Madness Mode Activated!"); // Debugging log
          startMadnessMode(); 
      });
  }
});

let madnessInterval;

function startMadnessMode() {
  console.log("🚀 Madness Mode Activated!");

  if (madnessInterval) {
      clearInterval(madnessInterval); // Prevent duplicate loops
  }

  madnessInterval = setInterval(() => {
      chrome.tabs.query({}, (tabs) => {
          if (chrome.runtime.lastError) {
              console.error("Error querying tabs:", chrome.runtime.lastError);
              return;
          }

          // **Weighted Chaos Functions**
          const commonChaos = [shuffleTabs, doppelgangerTab, startObserver]; // More frequent
          const rareChaos = [madnessTab, tabPossession]; // Less frequent

          // **Randomly Pick 2 Functions**
          let firstChaos, secondChaos;
          
          if (Math.random() < 0.75) { // 75% chance to pick from common chaos
              firstChaos = commonChaos[Math.floor(Math.random() * commonChaos.length)];
          } else {
              firstChaos = rareChaos[Math.floor(Math.random() * rareChaos.length)];
          }

          do {
              if (Math.random() < 0.75) { // 75% chance for second function to be from commonChaos
                  secondChaos = commonChaos[Math.floor(Math.random() * commonChaos.length)];
              } else {
                  secondChaos = rareChaos[Math.floor(Math.random() * rareChaos.length)];
              }
          } while (secondChaos === firstChaos); // Ensure different functions

          console.log(`🎭 Executing: ${firstChaos.name} & ${secondChaos.name}`);

          try {
              // Run both functions
              firstChaos();
              secondChaos();
          } catch (error) {
              console.error("❌ Error executing Madness Mode functions:", error);
          }
      });
  }, 5000); // Every 5 seconds
}
