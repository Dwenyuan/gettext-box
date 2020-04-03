module.exports = {
  componentPropsMap: {
    TC: {
      one: 'msgid',
      many: 'msgid_plural',
      context: 'msgctxt',
      comment: 'comment'
    }
  },
  funcArgumentsMap: {
    translate: ['msgid'],
    withContext: ['msgctxt'],
    ifPlural: [null, 'msgid_plural']
  },
  trim: true
}
