export namespace API {
  export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';

  export interface Link {
    url: string;
    method: Method;
    desc: string;
  }

  export interface OtherLinks {
    'account.settings'?: string;
    'forget-password'?: string;
    'groups.new'?: string;
    help?: string;
    'oauth.revoke'?: string;
    'search.tag'?: string;
    signup?: string;
    user?: string;
  }

  export interface Resources {
    message: string;
    links: {
      profile: {
        read: Link;
        update: Link;
      };
      search: Link;
      group: {
        member: {
          delete: Link;
        };
      };
      annotation: {
        hide: Link;
        unhide: Link;
        read: Link;
        create: Link;
        update: Link;
        flag: Link;
        delete: Link;
      };
      links: Link;
    };
  }

  export interface Group {
    id: string;
    name: string;
    public: boolean;
  }

  export interface Profile {
    authority: string;
    features: {
      defer_realtime_updates: boolean;
      flag_action: boolean;
      orphans_tab: boolean;
      client_oauth: boolean;
      overlay_highlighter: boolean;
      total_shared_annotations: boolean;
      api_render_user_info: boolean;
      embed_cachebuster: boolean;
      filter_highlights: boolean;
      search_for_doi: boolean;
    };
    groups: Group[];
    preferences: {
      [key: string]: boolean
    };
    userid: string | null;
  }

  export interface BaseSelector {
    type: string;
    refinedBy?: Selector;
  }

  export interface FragmentSelector extends BaseSelector {
    type: 'FragmentSelector';
    value: string;
    conformsTo?: string;
  }

  export interface CSSSelector extends BaseSelector {
    type: 'CSSSelector';
    value: string;
  }

  export interface XPathSelector extends BaseSelector {
    type: 'XPathSelector';
    value: string;
  }

  export interface TextQuoteSelector extends BaseSelector {
    type: 'TextQuoteSelector';
    exact: string;
    prefix?: string;
    suffix?: string;
  }

  export interface TextPositionSelector extends BaseSelector {
    type: 'TextPositionSelector';
    start: number;
    end: number;
  }

  export interface DataPositionSelector extends BaseSelector {
    type: 'DataPositionSelector';
    start: number;
    end: number;
  }

  export interface SVGSelector extends BaseSelector {
    type: 'SVGSelector';
    id?: string;
    value?: string;
  }

  export interface RangeSelector extends BaseSelector {
    type: 'RangeSelector';
    // startSelector is described in https://www.w3.org/TR/annotation-model/#range-selector
    startSelector?: Selector;
    // endSelector is described in https://www.w3.org/TR/annotation-model/#range-selector
    endSelector?: Selector;
    startContainer: string;
    startOffset: number;
    endContainer: string;
    endOffset: number;
  }

  export type Selector
    = FragmentSelector
    | CSSSelector
    | XPathSelector
    | TextQuoteSelector
    | TextPositionSelector
    | DataPositionSelector
    | SVGSelector
    | RangeSelector

  export interface AnnotationOption {
    group: string;
    permissions: {
      read: string[];
      admin: string[];
      update: string[];
      delete: string[];
    };
    references?: string[];
    tags: string[];
    target: {
      source: string;
      selector: Selector[];
    }[];
    text: string;
    uri: string;
  }

  export interface Annotation extends AnnotationOption {
    id: string;
    created: string;
    updated: string;
    flagged: boolean;
    user: string;
    hidden: boolean;
    document: {
      title?: string[];
    };
    links: {
      json: string;
      html: string;
      incontext: string;
    };
  }

  export interface SearchOption {
    limit?: number, // 20
    offset?: number, // 0
    sort?: string, // 'updated'
    order?: 'desc' | 'asc', // 'desc'
    uri?: string;
    url?: string;
    user?: string;
    group?: string;
    tag?: string;
    any?: string;
  }

  export interface SearchResult<T> {
    rows: T[];
    total: number;
  }
}
