declare namespace IndexComponentScssNamespace {
  export interface IIndexComponentScss {
    m_com_style: string;
  }
}

declare const IndexComponentScssModule: IndexComponentScssNamespace.IIndexComponentScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexComponentScssNamespace.IIndexComponentScss;
};

export = IndexComponentScssModule;
