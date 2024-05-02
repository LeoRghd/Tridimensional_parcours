function setupTimerGUI(scene) {
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const panel = new BABYLON.GUI.StackPanel();
    panel.width = "220px";
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(panel);

    const timerText = new BABYLON.GUI.TextBlock();
    timerText.text = "00:00:00";
    timerText.height = "30px";
    timerText.color = "white";
    timerText.fontSize = 24;
    panel.addControl(timerText);

    app.timer.timerText = timerText; // Store the timerText reference in the app object
}

function updateTimer() {
    if (app.timer.startTime && !app.timer.pauseTime) { // Only update if the timer is not paused
        let elapsedTime = Date.now() - app.timer.startTime - app.timer.elapsedPauseTime;
        let totalSeconds = Math.floor(elapsedTime / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let milliseconds = elapsedTime % 1000; // Get the milliseconds part

        // Formatting time to mm:ss:xxx (where xxx is milliseconds)
        let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
        app.timer.timerText.text = formattedTime;
    }
}

