let PAGE_NUM = 0
let PAGE_SIZE = 10

const getPage = () => {
  axios.get(`http://127.0.0.1:8000/providers?skip=${PAGE_NUM*PAGE_SIZE}&limit=${PAGE_SIZE}`)
  .then((response) => {
    // Find a <table> element with id="myTable":
    var table = document.getElementById("data-table");
    // clearing the table rows
    while(true) {
      // console.log(i);
      try{
        table.deleteRow(2)
      } catch (e) {
        break
      }
    }
    response.data.map((dataRow, idx) => {
      // console.log(dataRow);
      var row = table.insertRow(idx + 2)
      var id = row.insertCell(0)
      id.innerHTML = dataRow.id
      var active = row.insertCell(1)
      active.innerHTML = dataRow.active
      var name = row.insertCell(2)
      name.innerHTML = dataRow.name
      var qualifications = row.insertCell(3)
      qualifications.innerHTML = dataRow.qualification.join(', ')
      var specialities = row.insertCell(4)
      specialities.innerHTML = dataRow.speciality.join(', ')
      var countryCode = row.insertCell(5)
      countryCode.innerHTML = dataRow.phone.country_code
      var number = row.insertCell(6)
      number.innerHTML = dataRow.phone.number
      var department = row.insertCell(7)
      department.innerHTML = dataRow.department
      var orgName = row.insertCell(8)
      orgName.innerHTML = dataRow.organisation.name
      var orgLocation = row.insertCell(9)
      orgLocation.innerHTML = dataRow.organisation.location
      var streetAddress = row.insertCell(10)
      streetAddress.innerHTML = dataRow.address.street_address
      var city = row.insertCell(11)
      city.innerHTML = dataRow.address.city
      var state = row.insertCell(12)
      state.innerHTML = dataRow.address.state
      var country = row.insertCell(13)
      country.innerHTML = dataRow.address.country
      var zipcode = row.insertCell(14)
      zipcode.innerHTML = dataRow.address.zip_code
      var editButton = row.insertCell(15)
      editButton.innerHTML = `<button class="btn btn-primary" onclick="toggleEditProvider(${dataRow.id})">EDIT</button>`
      var viewButton = row.insertCell(16)
      viewButton.innerHTML = `<button class="btn btn-danger" onclick="deleteIndividual(${dataRow.id})">DELETE</button>`
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

document.getElementById("post_form").addEventListener('submit', (event) => {
  event.preventDefault();
});

const postOrPutProvider = () => {
  providerBody = {};
  post = (document.getElementById("edit_method").value === "post")
  form = document.getElementById("post_form");
  if(form.elements["name"].value.length > 2) {
    providerBody["name"] = form.elements["name"].value;
  } else {
    return alert("Name length should be greater than equal to 3 and less than equal to 16")
  }
  console.log(form.elements["active"].value);
  providerBody["active"] = form.elements["active"].checked;
  if(form.elements["qualification"].value.length > 0) {
    providerBody["qualification"] = form.elements["qualification"].value.split(", ")
  } else {
    return alert("Please provide atleast one qualification")
  }
  if(form.elements["speciality"].value.length > 0) {
    providerBody["speciality"] = form.elements["speciality"].value.split(", ")
  } else {
    return alert("Please provide atleast one speciality")
  }
  providerBody["department"] = form.elements["department"].value
  providerBody["phone"] = {}
  if(/^(\+[0-9][0-9])$/.test(form.elements["phone_country_code"].value)) {
    providerBody["phone"]["country_code"] = form.elements["phone_country_code"].value
  } else  {
    return alert("country code is invalid")
  }
  if(/^([0-9]{8,10})$/.test(form.elements["phone_number"].value)) {
    providerBody["phone"]["number"] = form.elements["phone_number"].value
  } else  {
    return alert("phone number is invalid")
  }
  providerBody["organisation"] = {}
  if(form.elements["org_name"].value.length > 0) {
    providerBody["organisation"]["name"] = form.elements["org_name"].value
  } else {
    return alert("please provide organisation name")
  }
  providerBody["organisation"]["location"] = form.elements["org_location"].value
  providerBody["address"] = {}
  if(form.elements["street_address"].value.length > 0) {
    providerBody["address"]["street_address"] = form.elements["street_address"].value
  } else {
    return alert("please provide street address")
  }
  if(form.elements["city"].value.length > 0) {
    providerBody["address"]["city"] = form.elements["city"].value
  } else {
    return alert("please provide city")
  }
  if(form.elements["state"].value.length > 0) {
    providerBody["address"]["state"] = form.elements["state"].value
  } else {
    return alert("please provide state")
  }
  if(form.elements["country"].value.length > 0) {
    providerBody["address"]["country"] = form.elements["country"].value
  } else {
    return alert("please provide country")
  }
  if(/^([0-9]{6})$/.test(form.elements["zipcode"].value)) {
    providerBody["address"]["zip_code"] = form.elements["zipcode"].value
  } else  {
    return alert("zipcode is invalid")
  }
  if(post) {
    axios.post('http://127.0.0.1:8000/providers', providerBody)
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => {
      alert(error.message)
    })
  } else {
    providerBody.id = form.elements["id"].value;
    axios.put(`http://127.0.0.1:8000/providers/${providerBody.id}`, providerBody)
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => {
      alert(error.message)
    })
  }
  console.log(providerBody);
}

const viewIndividual = (providerId) => {
  axios.get(`http://127.0.0.1:8000/providers/${providerId}`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    alert(error?.message);
  })
}

const deleteIndividual = (providerId) => {
  axios.delete(`http://127.0.0.1:8000/providers/${providerId}`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    alert(error?.message);
  })
}

const editIndividual = (providerId) => {
  console.log("editIndividual");
  axios.get(`http://127.0.0.1:8000/providers/${providerId}`)
  .then((response) => {
    console.log(response.data);
    providerBody = response.data;
    // populating the form by the response data
    form = document.getElementById("post_form");
    form.reset();
    form.elements["id"].value = providerBody.id;
    form.elements["name"].value = providerBody.name;
    providerBody.active ? form.elements["active"].checked = true : form.elements["active"].checked = false;
    form.elements["qualification"].value = providerBody.qualification.join(", ");
    form.elements["speciality"].value = providerBody.speciality.join(", ");
    form.elements["department"].value = providerBody.department;
    form.elements["phone_country_code"].value = providerBody.phone.country_code;
    form.elements["phone_number"].value = providerBody.phone.number;
    form.elements["org_name"].value = providerBody.organisation.name;
    form.elements["org_location"].value = providerBody.organisation.location;
    form.elements["street_address"].value = providerBody.address.street_address;
    form.elements["city"].value = providerBody.address.city;
    form.elements["state"].value = providerBody.address.state;
    form.elements["country"].value = providerBody.address.country;
    form.elements["zipcode"].value = providerBody.address.zip_code;
    showElem(document.getElementById("post-providers-form"));
  })
  .catch((error) => {
    alert(error?.message);
  })
}

const pageNumChanges = (pageNum) => {
  PAGE_NUM = pageNum
  getPage()
  document.getElementById("page-number-span").innerHTML = PAGE_NUM + 1
}

const pageSizeChanges = (pageSize) => {
  PAGE_SIZE = pageSize
  getPage()
  document.getElementById("page-size-btn").innerHTML = PAGE_SIZE
}

const hideElem = (ele) => {
  ele.style.visibility = "hidden";
}

const showElem = (ele) => {
  ele.style.visibility = "visible";
}

const isVisible = (ele) => {
  return ele.style.visibility == "visible"
}

const toggleVisibility = (ele) => {
  if(isVisible(ele)) hideElem(ele)
  else showElem(ele)
}

const toggleEditProvider = (provider_id) => {
  document.getElementById("post_form").reset();
  document.getElementById("edit_method").value = "put";
  toggleVisibility(document.getElementById("post-providers-form"))
  if(isVisible(document.getElementById("post-providers-form"))) {
    editIndividual(provider_id)
  }
}

const toggleAddProvider = () => {
  document.getElementById("post_form").reset();
  document.getElementById("edit_method").value = "post";
  toggleVisibility(document.getElementById("post-providers-form"))
}

const toggleActiveSwitch = () => {
  activeSwitch = document.getElementById("provider-active");
  if(activeSwitch.value === "true") activeSwitch.value = "false"
  else activeSwitch.value = "true"
  console.log(activeSwitch.value);
}