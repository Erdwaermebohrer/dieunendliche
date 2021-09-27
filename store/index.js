export const state = () => ({
  header: [],
  footer: {},
  pageLoading: true
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
  }
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
  }
};

export const getters = {
  header: state => state.header,
  footer: state => state.footer,
  pageLoading: state => state.pageLoading
};
