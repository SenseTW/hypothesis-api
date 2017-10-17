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
    return axios.get(`${this.apiUrl}/profile`, this.defaultConfig).then(r => r.data)
  }

  annotation(id: string): Promise<API.Annotation> {
    return axios.get(`${this.apiUrl}/annotations/${id}`, this.defaultConfig).then(r => r.data)
  }

  search(option: API.SearchOption): Promise<API.SearchResult<API.Annotation>> {
    return axios.get(`${this.apiUrl}/search`, { ...this.defaultConfig, params: option }).then(r => r.data)
  }

  links(): Promise<API.OtherLinks> {
    return axios.get(`${this.apiUrl}/links`, this.defaultConfig).then(r => r.data)
  }
}
