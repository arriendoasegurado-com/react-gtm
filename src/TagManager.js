import Snippets from './Snippets'

const TagManager = {
  dataScript: function (dataLayer) {
    const script = self.document.createElement('script')
    script.innerHTML = dataLayer
    return script
  },
  gtm: function (args) {
    const snippets = Snippets.tags(args)

    const noScript = () => {
      const noscript = self.document.createElement('noscript')
      noscript.innerHTML = snippets.iframe
      return noscript
    }

    const script = () => {
      const script = self.document.createElement('script')
      script.innerHTML = snippets.script
      return script
    }

    const dataScript = this.dataScript(snippets.dataLayerVar)

    return {
      noScript,
      script,
      dataScript
    }
  },
  initialize: function ({ gtmId, events = {}, dataLayer, dataLayerName = 'dataLayer', auth = '', preview = '' }) {
    const gtm = this.gtm({
      id: gtmId,
      events: events,
      dataLayer: dataLayer || undefined,
      dataLayerName: dataLayerName,
      auth,
      preview
    })
    if (dataLayer) self.document.head.appendChild(gtm.dataScript)
    self.document.head.insertBefore(gtm.script(), self.document.head.childNodes[0])
    self.document.body.insertBefore(gtm.noScript(), self.document.body.childNodes[0])
  },
  dataLayer: function ({dataLayer, dataLayerName = 'dataLayer'}) {
    if (window[dataLayerName]) return window[dataLayerName].push(dataLayer)
    const snippets = Snippets.dataLayer(dataLayer, dataLayerName)
    const dataScript = this.dataScript(snippets)
    self.document.head.insertBefore(dataScript, self.document.head.childNodes[0])
  }
}

module.exports = TagManager
