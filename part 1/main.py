from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI()

providers = []

class IdGenerator():
  def __init__(self):
    self.id = 0
  def __iter__(self):
    return self
  def __next__(self):
    self.id += 1
    return self.id

id_generator = IdGenerator()

class Phone(BaseModel):
  country_code: str = Field('+91', max_length=3, regex=r'^\+[0-9][0-9]')
  number: str

class Provider(BaseModel):
  id: int
  active: bool
  name: str
  qualification: str
  speciality: str
  phone: Phone
  department: str
  organisation: str
  location: str
  address: str


@app.get('/providers')
async def get_providers():
  return providers

@app.get('/providers/{provider_id}')
async def get_provider(provider_id: int, status_code=200):
  for provider in providers:
    if provider['id'] == provider_id:
      return provider
  return {
    "error": {
      "message": "No such Provider",
      "status": 404
    }
  }

@app.post('/providers/')
async def add_provider(provider: Provider):
  provider.id = next(id_generator)
  providers.append(provider.dict())
  return providers[-1]

@app.delete('/providers/{provider_id}')
async def delete_provider(provider_id: int):
  idx = -1
  for i, provider in enumerate(providers):
    if provider['id'] == provider_id:
      idx = i
      break
  if idx == -1:
    return {
      "error": {
        "message": "No such Provider",
        "status": 404
      }
    }
  provider = providers.pop(idx)
  return provider


