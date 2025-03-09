chrome.runtime.onInstalled.addListener(() => {
    console.log("Tabsanity has been unleashed!");
  });

chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({}, (tabs) => {
      if (tabs.length > 1) {
        let randomTab = tabs[Math.floor(Math.random() * tabs.length)];
        chrome.tabs.update(randomTab.id, { active: true });
      }
    });
});

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
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("shuffleTabs").addEventListener("click", shuffleTabs);
  });

  function tabQuiz() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      const tab = tabs[0];
  
      const questions = [
        "What is the square root of insanity?",
        "How many ghosts live in your house?",
        "What is the meaning of chaos?",
        "Solve: (∞ + Madness)² = ?"
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

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tabQuiz").addEventListener("click", tabQuiz);
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
    
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("reverseControls").addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "reverseControls" });
        });
    
        document.getElementById("madnessMode").addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "tabPossession" });
        });
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
      "https://theuselessweb.com/"
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
    document.getElementById("madnessMode").addEventListener("click", tabPossession);
    });
