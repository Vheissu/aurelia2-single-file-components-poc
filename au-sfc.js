const htmlParser = require('node-html-parser');

module.exports = function (content) {
  const callback = this.async();

  const fileName = this.resourcePath.split('/').pop().split('.')[0];
  const componentName = fileName;

  const html = htmlParser.parse(content, { script: true });

  const scriptElements = html.querySelectorAll('script');
  const scriptSource = scriptElements[0].rawText;

  const styleElements = html.querySelectorAll('style');
  const templateElements = html.querySelectorAll('template');

  const componentCode = `
    import { bindable, customElement } from 'aurelia';

    @customElement({
      name: '${componentName}',
      template: \`<template><style>${styleElements[0].rawText}</style>${templateElements[0].rawText}</template>\`
    })${scriptSource}
  `;

  callback(null, componentCode);
};
