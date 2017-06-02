import VisSchemasProvider from './schemas';

export default function VisTypeFactory(Private) {
  const VisTypeSchemas = Private(VisSchemasProvider);

  class VisType {
    constructor(opts) {
      opts = opts || {};

      this.name = opts.name;
      this.title = opts.title;
      this.responseConverter = opts.responseConverter;
      this.hierarchicalData = opts.hierarchicalData || false;
      this.icon = opts.icon;
      this.image = opts.image;
      this.description = opts.description;
      this.category = opts.category || VisType.CATEGORY.OTHER;
      this.isExperimental = opts.isExperimental;
      this.schemas = opts.schemas || new VisTypeSchemas();
      this.params = opts.params || {};
      this.requiresSearch = opts.requiresSearch == null ? true : opts.requiresSearch; // Default to true unless otherwise specified
      this.requiresTimePicker = !!opts.requiresTimePicker;
      this.fullEditor = opts.fullEditor == null ? false : opts.fullEditor;
      this.implementsRenderComplete = opts.implementsRenderComplete || false;
      // kibi: Default to false unless otherwise specified
      // this is used for the spy panel of visualizations that query more than one index
      this.requiresMultiSearch = opts.requiresMultiSearch == null ? false : opts.requiresMultiSearch;
      // kibi: allow a visualization to retrieve results by itself
      this.delegateSearch = opts.delegateSearch == null ? false : opts.delegateSearch;
      // kibi: initialize a visualization based on the linked saved search
      this.init = opts.init;
      // kibi: visualization type versioning
      if (opts.version) {
        this.version = opts.version;
      }

      if (!this.params.optionTabs) {
        this.params.optionTabs = [
          { name: 'options', title: 'Options', editor: this.params.editor }
        ];
      }
    }

    createRenderbot() {
      throw new Error('not implemented');
    }
  }

  VisType.CATEGORY = {
    BASIC: 'basic',
    DATA: 'data',
    KIBI: 'kibi',
    MAP: 'map',
    OTHER: 'other',
    TIME: 'time',
  };

  return VisType;
}
