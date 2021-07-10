let PAGE_NUM = 0
let PAGE_SIZE = 10

const getPage = () => {
  axios.get(`http://127.0.0.1:8000/providers?skip=${PAGE_NUM*PAGE_SIZE}&limit=${PAGE_SIZE}`)
  .then((response) => {
    // Find a <table> element with id="myTable":
    var table = document.getElementById("data-table");
    // console.log(response.data);
    // table.deleteRow(2);
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

const toggleAddProvider = () => {
  toggleVisibility(document.getElementById("post-providers-form"))
}