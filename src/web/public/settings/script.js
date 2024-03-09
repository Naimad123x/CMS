function handleClick(e) {
  return function() {
    const siteName = document.querySelector('#siteName').value;
    const data = {
      siteName: siteName,
    };

    function replaceContent(success, text){
      const result = document.querySelector('#result');

      if(success)
        return result.innerHTML = "<div class=\"alert alert-success\" role=\"alert\">" + text + "</div>";
      return result.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">" + text + "</div>";
    }

    fetch('/admin/settings/save', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
      })
      .then(text => {
        console.log(text)
        let success = text.error || true;
        replaceContent(success, text.message);
      })
      .catch(async error => {
        replaceContent(false, error)
      });
  }
}

document.querySelector('#settingsSubmit').addEventListener('click', handleClick());