import TagManager from "../TagManager";

module.exports = test("Should render TagaManager", () => {
  const gtmArgs = {
    gtmId: 'GTM-000000',
    dataLayer: {
      userInfo: 'userInfo'
    }
  };
  TagManager.initialize(gtmArgs);
  expect(window.dataLayer).not.toHaveLength(0);
});