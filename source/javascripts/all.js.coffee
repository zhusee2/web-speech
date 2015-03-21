#= require_tree .

document.addEventListener 'DOMContentLoaded', ->
  speechInput = document.querySelector('#speech-input')
  speechButton = document.querySelector('#speech-button')
  voiceSelect = document.querySelector('#voice-select')
  filteredVoices = []

  return unless window.speechSynthesis?

  window.setTimeout ->
    # Voices list not available yet at the time of DOMContentLoaded
    voicesList = window.speechSynthesis.getVoices()
    voicesArray = Array::slice.call(voicesList)
    filteredVoices = voicesArray.filter (voice) -> voice.lang.match(/^zh/)

    # Removes loading placeholder
    Array::forEach.call voiceSelect.children, (node) -> node.remove()
    voiceSelect.disabled = false

    filteredVoices.forEach (voice, index) ->
      optionNode = document.createElement('option')
      optionNode.text = "#{voice.name} (#{voice.lang})"
      optionNode.value = index
      voiceSelect.appendChild(optionNode)
  , 500

  speechButton.addEventListener 'click', (event) ->
    contentText = speechInput.value
    contentText.replace(/\n/, ',')
    utterancce = new SpeechSynthesisUtterance(contentText)
    utterancce.voice = voice if voice = filteredVoices[voiceSelect.value]

    window.speechSynthesis.speak(utterancce)
