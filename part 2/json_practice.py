import json
from pprint import pprint

data = json.loads('''
[
  {
    "id": 1,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 2,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 3,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 4,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 5,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 6,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 7,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 8,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 9,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  },
  {
    "id": 10,
    "active": true,
    "name": "string",
    "qualification": [
      "bachelors"
    ],
    "speciality": [
      "Orthology"
    ],
    "phone": {
      "country_code": "+91",
      "number": "1212121212"
    },
    "department": "IT",
    "organisation": {
      "name": "string",
      "location": "string"
    },
    "address": {
      "street_address": "string",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "zip_code": "110052"
    }
  }
]
''')

print(type(data[0]))

with open('db.json') as f:
  data = json.load(f)

# data = json.load('db.json')
print(data)