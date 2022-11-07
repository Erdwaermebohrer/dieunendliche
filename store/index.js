import Vue from "vue";

export const state=() => ({
  header: [],
  footer: {},
  pageLoading: true,
  multiForm: {
  }
});

export const actions = {
  async nuxtServerInit({ commit }, context) {
    const headerData = await this.$prismic.api.getSingle("menu");
    const footerData = await this.$prismic.api.getSingle("footer");

    commit("setHeader", headerData.data);
    commit("setFooter", footerData.data);
  },
  setPageLoading({ commit }, payload) {
    commit("setPageLoading", payload);
  },
};

export const mutations = {
  setHeader(state, payload) {
    state.header = payload;
  },
  setFooter(state, payload) {
    state.footer = payload;
  },
  setPageLoading(state, payload) {
    state.pageLoading = payload;
  },
  setFieldValue: (state, {field, value}) => {
    Vue.set(state.multiForm, field, value);
  }
};

export const getters = {
  header: state => state.header,
  footer: state => state.footer,
  pageLoading: state => state.pageLoading
};

export function mapFields(fields) {
  const computed={};
  for(let field of fields) {
    computed[field]=mapToAccessors(field);
  }
  return computed;
}

function mapToAccessors(field) {
  return {
    get() {
      return this.$store.state.multiForm;
    },
    set(value) {
      return this.$store.commit("setFieldValue", {field, value});
    }
  };
}
