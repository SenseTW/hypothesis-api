import axios, { AxiosRequestConfig } from 'axios'
import { API } from './api'

export class Hypothesis {
  private apiUrl: string
  private defaultConfig: AxiosRequestConfig

  constructor(apiUrl, token = process.env.HYPOTHESIS_TOKEN) {
    if (!token) throw new Error('API token is missing!')

    this.apiUrl = apiUrl.replace(/\/+$/, '')
    this.defaultConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }

  resources(): Promise<API.Resources> {
    return axios.get(this.apiUrl, this.defaultConfig).then(r => r.data)
  }

  profile(): Promise<API.Profile> {
    return axios.get(`${this.apiUrl}/profile`).then(r => r.data)
  }

  annotation(id: string): Promise<API.Annotation> {
    return axios.get(`${this.apiUrl}/annotations/${id}`).then(r => r.data)
  }
}
