function submitQuiz() {
  const form = document.getElementById('quiz_form');
  const formData = new FormData(form);
  const answers = [];

  form.querySelectorAll('.radio-group').forEach((group, index) => {
    const selectedOption = group.querySelector('input:checked');
    if (selectedOption) {
      answers[index] = parseInt(selectedOption.value); // Convert value to integer
    } else {
      answers[index] = null; // Handle the case where no option is selected
    }
  });


  // Assume you have a way to get the user's name, for example from an input or session
  const userName = new URLSearchParams(window.location.search).get('name'); // Get the name from the URL query parameter
  const correctAnswers = [0, 3, 2, 1, 2, 1, 0, 1, 2, 2, 3, 1, 2, 1, 2, 3, 3, 3, 0, 0];
  const finalAnswers = answers.map((answer, index) => {
    return answer === correctAnswers[index];
  });
  fetch(`/exp/submit-answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: userName, answers: finalAnswers })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    console.log(finalAnswers);
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    alert('Quiz submitted successfully');
    console.log(data);
    window.location.href = '/exp'; // Redirect to another page
  })
  .catch(error => console.error('Error submitting quiz:', error));
}
