$(document).ready(function() {
    // Initialize Cropper
    var cropper;
    $('#input-profile-pic').change(function(event) {
      var files = event.target.files;
      var reader = new FileReader();
      reader.onload = function() {
        if (cropper) {
          cropper.replace(this.result);
        } else {
          $('#profile-pic').attr('src', this.result);
          cropper = new Cropper($('#profile-pic')[0], {
            aspectRatio: 1, // Default aspect ratio for cropping
            viewMode: 1,
            autoCropArea: 1,
            crop: function(event) {}
          });
        }
      }
      reader.readAsDataURL(files[0]);
    });

    // Crop Picture
    $('#crop-btn').click(function() {
      var canvas = cropper.getCroppedCanvas({
        width: 200, // Set width of cropped image
        height: 200 // Set height of cropped image
      });
      var croppedImg = canvas.toDataURL(); // Get base64 representation of cropped image
      // You can now upload 'croppedImg' to your server or display it somewhere else
      $('#profile-pic').attr('src', croppedImg);
      // Destroy cropper instance
      cropper.destroy();
      cropper = null;
      $('#input-profile-pic').val(''); // Clear input value
    });

    // Handle shape selection
    $('#shape-select').change(function() {
      var shape = $(this).val();
      if (shape === 'circle') {
        $('#profile-pic').addClass('rounded-circle');
      } else {
        $('#profile-pic').removeClass('rounded-circle');
      }
    });
  });