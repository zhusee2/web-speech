#= require_tree .
#= require_self

iOSClient = navigator.userAgent.match(/iPhone|iPad/)

document.addEventListener 'DOMContentLoaded', ->
  speechInput = document.querySelector('#speech-input')
  speechButton = document.querySelector('#speech-button')
  voiceSelect = document.querySelector('#voice-select')
  filteredVoices = []

  return unless window.speechSynthesis?

  getVoicesArray = ->
    # Voices list returns empty array when:
    # 1. DOMContentLoaded just fired
    # 2. Randomly on iOS 8 :(
    new Promise (resolve, reject) ->
      rejectTimeout = window.setTimeout (-> reject("timeout")), 5000

      do fetchList = ->
        if (voicesList = window.speechSynthesis.getVoices()) and voicesList.length
          window.clearTimeout(rejectTimeout)
          resolve(Array::slice.call(voicesList))
        else
          window.setTimeout(fetchList, 300)

  # Get available voices
  getVoicesArray().then (voicesArray) ->
    filteredVoices = voicesArray.filter (voice) -> voice.lang.match(/^zh/)
    filteredVoices.sort (voice) -> if voice.lang.match(/tw$/i) then -1 else 1

    # Removes loading placeholder
    Array::forEach.call voiceSelect.children, (node) -> node.remove()
    voiceSelect.disabled = false

    filteredVoices.forEach (voice, index) ->
      optionNode = document.createElement('option')
      optionNode.text = "#{voice.name} (#{voice.lang})"
      optionNode.value = index
      voiceSelect.appendChild(optionNode)
  .catch ->
    voiceSelect.querySelector('option[placeholder]').text = "Default zh-TW"

  speechButton.addEventListener 'click', (event) ->
    contentText = speechInput.value
    contentText.replace(/\n/, ',')
    utterancce = new SpeechSynthesisUtterance(contentText)
    utterancce.voice = voice if voice = filteredVoices[voiceSelect.value]
    utterancce.rate = if iOSClient then 0.4 else 1.2 # it speaks much faster on iOS
    utterancce.lang = "zh-TW" unless utterancce.voice?

    window.speechSynthesis.speak(utterancce)

window.addEventListener 'unload', (event) ->
  window.speechSynthesis.cancel()  # stops any speech when about to leave
