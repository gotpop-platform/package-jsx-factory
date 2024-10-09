export function jsxFactory(type: string | Function, props = {}, ...children: any) {
  if (type === "Fragment") {
    return (children || []).flat(Infinity).join("")
  }

  const selfClosingTags = [
    "meta",
    "img",
    "br",
    "input",
    "link",
    "area",
    "base",
    "col",
    "command",
    "embed",
    "hr",
    "keygen",
    "param",
    "source",
    "track",
    "wbr",
  ]

  if (typeof type === "function") {
    return type({
      ...props,
      children: children.flat(Infinity).join(""),
    })
  } else {
    const mapProps = Object.entries(props || {})
      .map(([key, value]) => {
        // Handle prop punning
        if (typeof value === "boolean") {
          return value ? key : ""
        }
        return `${key}="${value}"`
      })
      .filter(Boolean)
      .join(" ")

    const childArr = children.flat(Infinity).join("")
    let element = ""

    // Special case for <!DOCTYPE html>
    if (type === "!DOCTYPE html") {
      element = `<!DOCTYPE html>${childArr}`
    } else if (selfClosingTags.includes(type)) {
      element = `<${type} ${mapProps}>`
    } else {
      element = `<${type} ${mapProps}>${childArr}</${type}>`
    }

    return element
  }
}

export const Fragment = ({ children }: { children?: JSX.Element }): JSX.Element | null => {
  if (children !== undefined) {
    return children
  }
  return null
}