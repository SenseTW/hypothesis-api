export namespace API {
  export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'

  export type Link = {
    url: string,
    method: Method,
    desc: string
  }

  export type OtherLinks = {
    'account.settings'?: string,
    'forget-password'?: string,
    'groups.new'?: string,
    help?: string,
    'oauth.revoke'?: string,
    'search.tag'?: string,
    signup?: string,
    user?: string
  }

  export type Resources = {
    message: string,
    links: {
      profile: {
        read: Link,
        update: Link
      },
      search: Link,
      group: {
        member: {
          delete: Link
        }
      },
      annotation: {
        hide: Link,
        unhide: Link,
        read: Link,
        create: Link,
        update: Link,
        flag: Link,
        delete: Link
      },
      links: Link
    }
  }

  export type Group = {
    id: string,
    name: string,
    public: boolean
  }

  export type Profile = {
    authority: string,
    features: {
      defer_realtime_updates: boolean,
      flag_action: boolean,
      orphans_tab: boolean,
      client_oauth: boolean,
      overlay_highlighter: boolean,
      total_shared_annotations: boolean,
      api_render_user_info: boolean,
      embed_cachebuster: boolean,
      filter_highlights: boolean,
      search_for_doi: boolean
    },
    groups: Group[],
    preferences: {
      [key: string]: boolean
    },
    userid: string | null,
  }

  // TODO:
  //   type Selector
  //     = FragmentSelector
  //     | CSSSelector
  //     | XPathSelector
  //     | TextQuoteSelector
  //     | TextPositionSelector
  //     | DataPositionSelector
  //     | SVGSelector
  //     | RangeSelector
  export type Selector = {
    type: string
  }

  export type Annotation = {
    created: string,
    updated: string,
    group: string,
    flagged: boolean,
    user: string,
    hidden: boolean,
    document: {
      title?: string[]
    },
    permissions: {
      read: string[],
      admin: string[],
      update: string[],
      delete: string[]
    },
    references?: string[],
    tags: string[],
    target: {
      source: string,
      selector: Selector[]
    }[],
    links: {
      json: string,
      html: string,
      incontext: string
    },
    text: string,
    uri: string,
    id: string
  }

  export interface SearchOption {
    limit?: number, // 20
    offset?: number, // 0
    sort?: string, // 'updated'
    order?: 'desc' | 'asc', // 'desc'
    uri?: string,
    url?: string,
    user?: string,
    group?: string,
    tag?: string,
    any?: string
  }

  export type SearchResult<T> = {
    rows: T[],
    total: number
  }
}
