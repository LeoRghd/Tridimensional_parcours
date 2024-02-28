function getSound(scene) {
    var AudioContext = window.AudioContext || window.webkitAudioContext
    var audioContext = new AudioContext()
    const throwHook = new BABYLON.Sound(
        'throwHook',
        'utils/sounds/throw_hook.wav',
        scene,
        null,
        { loop: false, autoplay: false, volume: 0.5 }
    )
    const hookHit = new BABYLON.Sound(
        'hookHit',
        'utils/sounds/hook_hit.wav',
        scene,
        null,
        { loop: false, autoplay: false, volume: 0.7 }
    )
    const hookReturned = new BABYLON.Sound(
        'hookReturn',
        'utils/sounds/hook_returned.wav',
        scene,
        null,
        { loop: false, autoplay: false, volume: 0.7 }
    )
    const hookIn = new BABYLON.Sound(
        'hookIn',
        'utils/sounds/hook_in.wav',
        scene,
        null,
        { loop: false, autoplay: false, volume: 0.7 }
    )
    const gasBurst = new BABYLON.Sound(
        'gasBurst',
        'utils/sounds/gas_burst.wav',
        scene,
        null,
        { loop: false, autoplay: false, volume: 0.7 }
    )
    return { audioContext, throwHook, hookHit, hookReturned, hookIn, gasBurst }
}
