#= require_tree .

document.addEventListener 'DOMContentLoaded', ->
  speechInput = document.querySelector('#speech-input')
  speechButton = document.querySelector('#speech-button')

  return unless window.speechSynthesis?

  speechButton.addEventListener 'click', (event) ->
    contentText = speechInput.value
    contentText.replace(/\n/, ',')
    utterancce = new SpeechSynthesisUtterance(contentText)
    utterancce.lang = "zh-TW"

    window.speechSynthesis.speak(utterancce)
