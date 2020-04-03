import { transformSync } from '@babel/core'
import traverse from '@babel/traverse'
import { isCallExpression, isMemberExpression } from '@babel/types'
import {
  CONTEXT,
  DOMAIN,
  Ioption,
  PLURAL_KEY,
  SINGULAR_KEY
} from 'bean/scanner.bean'

const initOption: Ioption = {
  chained: {
    translate: {
      onDomain: [DOMAIN],
      withContext: [CONTEXT],
      ifPlural: [null, PLURAL_KEY]
    }
  },
  funcArgumentsMap: {
    gettext: [SINGULAR_KEY],
    dgettext: [DOMAIN, SINGULAR_KEY],
    dcgettext: [DOMAIN, SINGULAR_KEY, 'category'],
    ngettext: [SINGULAR_KEY, PLURAL_KEY, 'value'],
    dngettext: [DOMAIN, SINGULAR_KEY, PLURAL_KEY, 'value'],
    dcngettext: [DOMAIN, SINGULAR_KEY, PLURAL_KEY, 'value', 'category'],
    pgettext: [CONTEXT, SINGULAR_KEY],
    dpgettext: [DOMAIN, CONTEXT, SINGULAR_KEY],
    npgettext: [CONTEXT, SINGULAR_KEY, PLURAL_KEY, 'value'],
    dnpgettext: [DOMAIN, CONTEXT, SINGULAR_KEY, PLURAL_KEY, 'value'],
    dcnpgettext: [
      DOMAIN,
      CONTEXT,
      SINGULAR_KEY,
      PLURAL_KEY,
      'value',
      'category'
    ]
  },
  trim: true
}
function findCallee (node: any, targetFnName = 'translate'): any {
  if (
    isCallExpression(node) &&
    node.callee &&
    isMemberExpression(node.callee)
  ) {
    if (node.callee.property.name === targetFnName) {
      return node
    } else {
      return findCallee(node.callee.object)
    }
  }
}

export function init (sourceCode: string, option: Ioption = {}): void {
  const nextOption = {
    ...initOption,
    ...option
  }
  const { ast } = transformSync(sourceCode, {
    ast: true,
    filename: 'file.ts',
    presets: [
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true
        }
      ]
    ]
  })
  //   console.log(ast)
  const translations = {}
  traverse(ast, {
    /**
     * 扫描函数调用节点,而后提取参数
     *
     * @param {*} path
     */
    CallExpression (path) {
      const { chained } = nextOption
      // 情况一: 扫描链式调用
      // 例如: translator('key').onDomain('domain').withContext('context')
      if (chained) {
        const { node } = path
        const translatorNames = Object.keys(chained)
        const { property: { name: callName = undefined } = {} } = path.node
          .callee as any
        translatorNames.forEach((translate) => {
          if (!translations[translate]) {
            translations[translate] = {}
          }
          const fnKeys = Object.keys(chained[translate])
          fnKeys.forEach((fnKey) => {
            // eg: 遍历到了withContext
            if (fnKey === callName) {
              const translateNode = findCallee(node, translate)
              const [msgid] = translateNode.arguments.map(({ value }) => value)
              const argTags = chained[translate][callName]

              const args = node.arguments.map((v: any) => v.value)
              const trans = args.reduce((prev, next, index) => {
                const tag = argTags[index]
                switch (tag) {
                  case CONTEXT:
                    return { ...prev, msgctxt: next }
                  case SINGULAR_KEY:
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    return { ...prev, singular_key: next }
                  case PLURAL_KEY:
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    return { ...prev, msgid_plural: next }
                  default:
                    return prev
                }
              }, {})
              if (msgid) {
                translations[translate][msgid] = {
                  ...translations[translate][msgid],
                  ...trans
                }
              }
            }
          })
        })
      }
      // const params = path.node.arguments.map(({ value }: any) => value)
      // console.log(params, findCallee(path.node))
      // console.log(path)
    }
  })
  console.log(translations)
}
