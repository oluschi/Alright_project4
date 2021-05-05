export function createElementWithClassName(nodeType, className) {
  const el = document.createElement(nodeType);
  el.className = className;
  return el;
}

export function createElementWithOptions(nodeType, options) {
  const el = document.createElement(nodeType);

  for (let i = 0; i < Object.keys(options).length; i++) {
    switch (Object.keys(options)[i]) {
      case 'class':
        el.className = options.class;
        break;
      case 'attributes':
        setAttributes(el, options.attributes);
        break;
      case 'style':
        for (let k = 0; k < Object.keys(options.style).length; k++) {
          el.style[Object.keys(options.style)[k]] = Object.values(options.style)[k];
        }
        break;
      case 'content':
        el.appendChild(document.createTextNode(options.content));
        break;
      default:
        if (Object.values(options)[i] !== null && Object.values(options)[i] !== undefined) {
          el[Object.keys(options)[i]] = Object.values(options)[i];
        }
    }
  }

  return el;
}

export function createTextNodeWithContent(nodeType, content) {
  const el = document.createElement(nodeType);
  el.appendChild(document.createTextNode(content));
  return el;
}

export function setAttributes(el, attributes) {
  for (let i = 0; i < Object.keys(attributes).length; i++) {
    if (Object.values(attributes)[i] !== null && Object.values(attributes)[i] !== undefined) {
      el.setAttribute(Object.keys(attributes)[i], Object.values(attributes)[i]);
    } else if (Object.values(attributes)[i] === null) {
      el.removeAttribute(Object.keys(attributes)[i]);
    }
  }
}

export function hasAncestor(child, targetAncestor) {
  for (let parent = child; parent.parentNode; parent = parent.parentNode) {
    if (parent === targetAncestor) {
      return true;
    }
  }
}
