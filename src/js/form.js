function validateAndRedirect() {
    // Check if all required fields are filled
    const fullName = document.getElementById('full_name').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const pcUsage = document.querySelector('input[name="pc_usage"]:checked');
    const visual = document.querySelector('input[name="visual"]:checked');
    const videoG = document.querySelector('input[name="videoG"]:checked');
    const sports = document.querySelector('input[name="sports"]:checked');

    console.log('Full Name:', fullName);
    console.log('Gender:', gender ? gender.value : 'Not selected');
    console.log('PC Usage:', pcUsage ? pcUsage.value : 'Not selected');
    console.log('Visual Impairment:', visual ? visual.value : 'Not selected');
    console.log('Video Games:', videoG ? videoG.value : 'Not selected');
    console.log('Sports:', sports ? sports.value : 'Not selected');
    // Validate required fields
    if (!fullName || !gender || !pcUsage || !visual || !videoG || !sports) {
      alert("Please fill out all required fields before proceeding.");
      return;  // Stop the function if validation fails
    }

    document.getElementById('myForm').submit();
  }