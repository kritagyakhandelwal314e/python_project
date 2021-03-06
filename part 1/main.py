from os import EX_PROTOCOL
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum
from starlette.responses import JSONResponse
import asyncio

app = FastAPI()

# Generator for generating UUID for provider
class IdGenerator():
  def __init__(self):
    self.id = 0
  def __iter__(self):
    return self
  def __next__(self):
    self.id += 1
    return self.id

id_generator = IdGenerator()

# Custom Enum Types (Validation Utilities)
class Department(Enum):
  IT = 'IT'
  FINANCE = 'FINANCE'
  MANAGEMENT = 'MANAGEMENT'

class Qualification(Enum):
  BECHELOR = 'bachelors'
  MASTERS = 'masters'
  DOCTORATE = 'doctorate'

class Speciality(Enum):
  ORTHOLOGY = 'Orthology'
  CARDIOLOGY = 'Cardiology'
  DENTIST = 'Dentist'

class Country(Enum):
  INDIA = 'India'
  AUSTRALIA = 'Australia'

class City(Enum):
  NEW_DELHI = 'New Delhi'
  BENGALURU = 'Bengaluru'
  MUMBAI = 'Mumbai'
  CHENNAI = 'Chennai'
  KOLKATA = 'Kolkata'

class State(Enum):
  DELHI = 'Delhi'
  UTTAR_PRADESH = 'Uttar Pradesh'

# Schemas
class Phone(BaseModel):
  country_code: str = Field('+91', max_length=3, regex=r'^\+[0-9][0-9]')
  number: str = Field(regex=r'[0-9]{8,10}', min_length=8, max_length=10)

class Organisation(BaseModel):
  name: str
  location: Optional[str]

class Address(BaseModel):
  street_address: str
  city: City
  state: State
  country: Country
  zip_code: str = Field(regex=r'[0-9]{6}')

class Provider(BaseModel):
  id: Optional[int] = None
  active: Optional[bool] = None
  name: str
  qualification: List[Qualification]
  speciality: List[Speciality]
  phone: Phone
  department: Optional[Department]
  organisation: Organisation
  address: Address

class ProviderAllOptional(BaseModel):
  active: Optional[bool] = None
  name: Optional[str]
  qualification: Optional[List[Qualification]]
  speciality: Optional[List[Speciality]]
  phone: Optional[Phone]
  department: Optional[Department]
  organisation: Optional[Organisation]
  address: Optional[Address]

providers: List[Provider] = []

# Utility Functions

async def get_provider(id: int):
  '''
  Asynchronous Function for finding 
  provider in providers list
  by id
  params -> id: int
  return -> provider: Provider
  '''
  print('MOM: 92')
  for provider in providers:
    await asyncio.sleep(0)
    print("Came here")
    if provider.id == id:
      return provider

# REST API Endpoints

@app.get('/providers')
async def get_providers():
  return providers

@app.post('/providers/', status_code=201)
async def post_providers(provider: Provider):
  provider.id = next(id_generator)
  providers.append(provider)
  return

@app.put('/providers')
async def put_providers():
  return JSONResponse(status_code=501, content={"message": "Method not implemented"})

@app.patch('/providers')
async def patch_providers():
  return JSONResponse(status_code=501, content={"message": "Method not implemented"})

@app.delete('/providers')
async def delete_providers():
  global providers
  providers = []
  return


@app.get('/providers/{provider_id}', status_code=200)
async def get_provider(provider_id: int):
  for provider in providers:
    if provider.id == provider_id:
      return provider
  return JSONResponse(status_code=404, content={'message': 'No provider exist with this specification'})

@app.post('/providers/{provider_id}')
async def post_provider():
  return JSONResponse(status_code=501, content={"message": "Method not implemented"})


@app.put('/providers/{provider_id}')
async def put_provider(provider_id: int, provider: Provider):
  idx = -1
  for i, p in enumerate(providers):
    if p.id == provider_id:
      idx = i
      break
  if idx != -1:
    providers[idx] = provider
    return
  return JSONResponse(status_code=404, content={'message': 'No provider exist with this specification'})

@app.patch('/providers/{provider_id}')
async def patch_provider(provider_id: int, provider: ProviderAllOptional):
  idx = -1
  for i, p in enumerate(providers):
    if p.id == provider_id:
      idx = i
      break
  if idx != -1:
    stored_provider_data = providers[idx]
    stored_provider_model = Provider(**stored_provider_data.dict())
    update_data = provider.dict(exclude_unset=True)
    updated_provider = stored_provider_model.copy(update=update_data)
    updated_provider.id = provider_id
    providers[idx] = updated_provider
    return
  return JSONResponse(status_code=404, content={'message': 'No provider exist with this specification'})

@app.delete('/providers/{provider_id}')
async def delete_provider(provider_id: int):
  idx = -1
  for i, provider in enumerate(providers):
    if provider.id == provider_id:
      idx = i
      break
  if idx != -1:
    provider = providers.pop(idx)
    return provider
  return JSONResponse(status_code=404, content={'message': 'No provider exist with this specification'})


