/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * Converted to ES6 by Nathan Marks <info@nathanmarks.io>
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// function stringOfLength (string, length) {
//   let newString = '';
//   for (let i = 0; i < length; i++) {
//     newString += string;
//   }
//   return newString;
// }

function generateTitle (name) {
  return `## ${name}`;
}

function generateDesciption (description) {
  return description + '\n';
}

function generatePropType (type) {
  let values;
  if (Array.isArray(type.value)) {
    values = '(' +
      type.value.map(function (typeValue) {
        return typeValue.name || typeValue.value;
      }).join('|') +
      ')';
  } else {
    values = type.value;
  }

  return '`' + type.name + (values ? values : '') + '`';
}

function generateProp (propName, prop) {
  return (
    `| \`${propName}\` ${prop.required ? '(required)' : ''}` +
    `| ${(prop.type ? generatePropType(prop.type) : '')} ` +
    `| ${(prop.defaultValue ? `\`${prop.defaultValue}\`` : '')} ` +
    `| ${(prop.description ? prop.description : '')} ` +
    '|'
  );
}

function generateProps (props) {
  const title = '##### Props';

  return (
    `${title}\n` +
    '| Name | Type | Default | Description |\n' +
    '|:-----|:-----|:-----|:-----|\n' +
    Object.keys(props).sort().map(propName => {
      return generateProp(propName, props[propName]);
    }).join('\n')
  );
}

function generateMarkdown (name, reactAPI) {
  const markdownString =
    generateTitle(name) + '\n' +
    (reactAPI.description ? generateDesciption(reactAPI.description) + '\n' : '\n') +
    generateProps(reactAPI.props);

  return markdownString;
}

module.exports = generateMarkdown;
