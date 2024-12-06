const slider = document.getElementById('age');
const sliderValue = document.getElementById('slider_value');

slider.addEventListener('input', function() {
    sliderValue.textContent = this.value;
});
